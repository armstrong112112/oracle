import type { ApexOptions } from "apexcharts";

export interface ChartData {
  labels?: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

export interface Text {
  title?: string;
  price?: string;
  date?: string;
  percent?: string;
}

export interface ApexChartConfig {
  chartData: ChartData;
  textData: Text;
  onAnimationComplete?: () => void;
}

interface ApexChartInstance {
  updateOptions: (options: Record<string, unknown>) => void;
  w?: {
    globals?: {
      series?: number[];
      labels?: string[];
    };
  };
}

export function getDoughnutConfig({
  chartData,
  onAnimationComplete,
}: ApexChartConfig): ApexOptions {
  return {
    chart: {
      type: "donut",
      height: 210,
      width: 210,
      animations: {
        enabled: true,
        speed: 2000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      events: {
        animationEnd: () => {
          onAnimationComplete?.();
        },
      },
    },
    series: chartData.datasets[0]?.data || [],
    labels: chartData.labels || [],
    colors: chartData.datasets[0]?.backgroundColor || [],
    plotOptions: {
      pie: {
        donut: {
          size: "90%",
          labels: {
            show: false,
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    responsive: [
      {
        breakpoint: 1440,
        options: {
          chart: {
            height: 250,
            width: 250,
          },
        },
      },
    ],
  };
}

export function updateChartBackground(
  chart: ApexChartInstance,
  chartData: ChartData,
  activeCreatedType: string | null,
  shadowColors: string[]
): { shadowColors: string[] } {
  if (!chartData?.datasets?.[0]?.backgroundColor || !chartData.labels) {
    return { shadowColors };
  }

  const labels = chartData.labels
    .map((label) => {
      if (label === null || label === undefined) return "";
      return label;
    })
    .filter((label) => label !== "");

  const bgColors = chartData.datasets[0].backgroundColor;
  if (!Array.isArray(bgColors)) {
    return { shadowColors };
  }

  const activeIndex = labels.findIndex(
    (label) => label.toLowerCase() === activeCreatedType?.toLowerCase()
  );

  if (activeIndex >= 0 && chart) {
    const activeColor = bgColors[activeIndex];
    if (typeof activeColor !== "string") {
      return { shadowColors };
    }

    const newShadowColors = [shadowColors[activeIndex]];

    chart.updateOptions({
      series: [100],
      labels: [labels[activeIndex]],
      colors: [activeColor],
    });

    return { shadowColors: newShadowColors };
  }

  return { shadowColors };
}

export function updateChartOpacity(
  chart: ApexChartInstance,
  activeExpensisType: string | null,
  originalColors: string[] = ["#f6c32a", "#f64e2a", "#902af6", "#2af653"],
  adjustColorOpacity: (color: string, opacity: number) => string
): void {
  if (!chart) return;

  const currentSeries = chart.w?.globals?.series;
  const currentLabels = chart.w?.globals?.labels;

  if (!currentSeries || !currentLabels) return;

  const labels = currentLabels.map((label) => {
    if (label === null || label === undefined) return "";
    return label;
  });

  const newColors = labels.map((label, index: number) => {
    const isActive = activeExpensisType
      ? label === activeExpensisType.toLowerCase()
      : false;

    const colorIndex = index % originalColors.length;
    const newOpacity = isActive ? 1 : 0.05;
    return adjustColorOpacity(originalColors[colorIndex], newOpacity);
  });

  chart.updateOptions({
    colors: newColors,
    chart: {
      animations: {
        enabled: true,
        speed: 500,
      },
    },
  });
}

export function adjustColorOpacity(color: string, opacity: number): string {
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color.replace(/,\s*\d*\.?\d+\)$/, `, ${opacity})`);
}
