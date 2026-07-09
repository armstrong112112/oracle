<template>
  <div class="tracking">
    <div class="tracking_header">
      <div class="tracking_timeline">
        <div class="tracking_timeline_line tracking_timeline_inactive"></div>

        <div
          class="tracking_timeline_line tracking_timeline_active"
          :style="{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
            backgroundColor: activeColor,
          }"></div>

        <div
          v-for="(step, index) in steps"
          :key="index"
          class="tracking_timeline_step">
          <div
            class="tracking_timeline_node"
            :style="getNodeStyle(index)"></div>
        </div>
      </div>

      <div class="tracking_info">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="tracking_info_col"
          :class="getColumnClass(index)">
          <div class="tracking_info_title" :style="getTitleStyle(index)">
            {{ step.title }}
          </div>
          <div class="tracking_info_date" :style="getDateStyle(index)">
            {{ step.date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface Step {
  title: string;
  date: string;
  status: string;
}

interface Props {
  steps: Step[];
  currentStep?: number;
  activeColor?: string;
  inactiveColor?: string;
  completedColor?: string;
  textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  currentStep: 0,
  activeColor: "#FF5733",
  inactiveColor: "#121119",
  completedColor: "#FF5733",
  textColor: "#FFFFFF",
});

// Methods
const isActive = (index: number): boolean => {
  return index === props.currentStep;
};

const isCompleted = (index: number): boolean => {
  return index < props.currentStep;
};

const getNodeStyle = (index: number): Record<string, string> => {
  if (isActive(index)) {
    return { backgroundColor: props.activeColor };
  } else if (isCompleted(index)) {
    return { backgroundColor: props.completedColor };
  }
  return { backgroundColor: props.inactiveColor };
};

const getTitleStyle = (index: number): Record<string, string> => {
  return {
    color: isActive(index) ? props.activeColor : props.textColor,
  };
};

const getDateStyle = (index: number): Record<string, string | number> => {
  return {
    color: isActive(index) ? props.activeColor : props.textColor,
    opacity: isActive(index) ? 1 : 0.3,
  };
};

const getColumnClass = (index: number): string => {
  if (index === 0) return "text-left";
  if (index === props.steps.length - 1) return "text-right";
  return "text-center";
};
</script>

<style scoped>
.tracking {
  width: 100%;
  margin-top: 0 !important;
  padding: 0 !important;
}

.tracking_header {
  position: relative;
  width: 100%;
}

.tracking_timeline {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  justify-content: space-between;
}

.tracking_timeline_line {
  position: absolute;
  top: 50%;
  left: 0;
  height: 6px;
  width: 100%;
  transform: translateY(-50%);
  z-index: 1;
}

.tracking_timeline_inactive {
  background-color: #121119;
}

.tracking_timeline_active {
  position: absolute;
  top: 50%;
  left: 0;
  height: 6px;
  transform: translateY(-50%);
  z-index: 2;
  transition: width 0.3s ease-in-out;
}

.tracking_timeline_node {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  z-index: 2;
  position: relative;
}

.tracking_info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.tracking_info_col {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tracking_info_title {
  font-weight: bold;
  margin-bottom: 4px;
}

.tracking_info_date {
  font-size: 0.9em;
}
</style>
