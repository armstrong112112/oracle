export const useAdaptiveLayout = (
  breakpoint: number = 1024,
  mobileLayout: string = "",
  desktopLayout: string = "sidebar"
) => {
  const windowWidth = ref(0);
  const currentLayout = ref("");

  const handleResize = () => {
    if (import.meta.client) {
      windowWidth.value = window.innerWidth;
      updateLayout();
    }
  };

  const updateLayout = () => {
    const newLayout =
      windowWidth.value < breakpoint ? mobileLayout : desktopLayout;
    if (currentLayout.value !== newLayout) {
      currentLayout.value = newLayout;
      setPageLayout(newLayout);
    }
  };

  const initAdaptiveLayout = () => {
    if (import.meta.client) {
      windowWidth.value = window.innerWidth;
      window.addEventListener("resize", handleResize);
      handleResize();
    }
  };

  const destroyAdaptiveLayout = () => {
    if (import.meta.client) {
      window.removeEventListener("resize", handleResize);
    }
  };

  return {
    windowWidth,
    currentLayout,
    initAdaptiveLayout,
    destroyAdaptiveLayout,
  };
};
