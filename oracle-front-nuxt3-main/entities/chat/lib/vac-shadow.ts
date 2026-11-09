export const VAC_MESSAGE_WRAPPER = "vac-message-wrapper";

export const ensureShadowStyle = (root: ShadowRoot, id: string, css: string): HTMLStyleElement => {
  const style = (root.getElementById(id) as HTMLStyleElement | null) ?? document.createElement("style");
  style.id = id;
  if (style.textContent !== css) {
    style.textContent = css;
  }
  if (!style.parentNode) {
    root.append(style);
  }
  return style;
};

export const closestInPath = (event: Event, className: string): HTMLElement | null => {
  const node = event.composedPath().find(
    (entry) => entry instanceof HTMLElement && entry.classList.contains(className),
  );
  return node instanceof HTMLElement ? node : null;
};

export const isDisplayed = (el: Element | null | undefined): el is HTMLElement =>
  el instanceof HTMLElement && getComputedStyle(el).display !== "none";
