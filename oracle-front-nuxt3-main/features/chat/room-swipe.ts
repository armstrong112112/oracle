import { closestInPath, ensureShadowStyle } from "~/entities/chat/lib/vac-shadow";
import { RoomAction } from "~/entities/chat/model";
import type { RoomSwipeApi } from "./types";


const STYLE_ID = "oracle-room-swipe";
const PIN_WIDTH = 74;

interface Drag {
  item: HTMLElement;
  pointerId: number;
  startX: number;
  startY: number;
  origin: number;
  active: boolean;
}

const roomItem = (event: Event): HTMLElement | null => closestInPath(event, "vac-room-item");

const isSystemRoom = (item: HTMLElement): boolean => item.id.startsWith("sys-");

const offsetOf = (item: HTMLElement): number => Number(item.dataset.swipe || 0);

const unwrap = (item: HTMLElement): void => {
  const shell = item.parentElement;
  if (!shell?.classList.contains("oracle-swipe-host")) {
    return;
  }

  shell.before(item);
  shell.remove();
};

const cardOf = (item: HTMLElement): HTMLElement =>
  item.querySelector<HTMLElement>(".vac-room-container") ?? item;

const rightWidth = (item: HTMLElement): number =>
  item.querySelector<HTMLElement>(".oracle-swipe--right")?.offsetWidth || PIN_WIDTH * 3;

const pinReveal = (item: HTMLElement): number => {
  const pin = item.querySelector<HTMLElement>(".oracle-swipe--pin")?.offsetWidth || PIN_WIDTH;
  const right = item.querySelector<HTMLElement>(".oracle-swipe--right");
  if (!right) {
    return pin;
  }
  return Math.max(0, Math.min(pin, item.clientWidth - right.offsetWidth));
};

const bleedList = (list: HTMLElement): { left: number; right: number } => {
  if (!list.dataset.swipePadLeft) {
    const listStyle = getComputedStyle(list);
    list.dataset.swipePadLeft = String(parseFloat(listStyle.paddingLeft) || 0);
    list.dataset.swipePadRight = String(parseFloat(listStyle.paddingRight) || 0);
    list.style.paddingLeft = "0";
    list.style.paddingRight = "0";
  }

  return {
    left: Number(list.dataset.swipePadLeft) || 0,
    right: Number(list.dataset.swipePadRight) || 0,
  };
};

const setOffset = (item: HTMLElement, value: number): void => {
  item.dataset.swipe = String(value);
  const card = cardOf(item);
  card.style.transform = value ? `translateX(${value}px)` : "";
};

const CSS = `
    .vac-rooms-container,
    .vac-room-list,
    .vac-room-item,
    .oracle-swipe__btn {
      -webkit-user-select: none;
      user-select: none;
    }
    .vac-room-item.is-swipeable {
      display: block;
      position: relative;
      overflow: hidden;
      border-radius: 0;
      min-height: 71px;
    }
    .vac-room-item.is-swipeable .vac-room-container {
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      width: 100%;
      min-height: inherit;
      background: var(--chat-sidemenu-bg-color, var(--primary-1));
      touch-action: pan-y;
      transition: background-color .3s cubic-bezier(.25,.8,.5,1), transform .22s ease;
    }
    .vac-room-item.is-swipeable:hover .vac-room-container {
      background: var(--chat-sidemenu-bg-color-hover, var(--secondary-7));
    }
    .vac-room-item.is-swipeable.vac-room-selected .vac-room-container,
    .vac-room-item.is-swipeable.vac-room-selected:hover .vac-room-container {
      background: var(--chat-sidemenu-bg-color-active, var(--secondary-1));
    }
    .vac-room-item.is-swipeable.is-dragging .vac-room-container { transition: none; }
    @media (max-width: 768px) {
      .vac-room-item.is-swipeable { min-height: 60px; }
    }
    .oracle-swipe--pin,
    .oracle-swipe--right {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 0;
      display: flex;
      align-items: stretch;
      visibility: hidden;
    }
    .vac-room-item[data-swipe]:not([data-swipe="0"]) > .oracle-swipe--pin,
    .vac-room-item[data-swipe]:not([data-swipe="0"]) > .oracle-swipe--right {
      visibility: visible;
    }
    .oracle-swipe--pin { left: 0; z-index: 1; }
    .oracle-swipe--right { right: 0; }
    .oracle-swipe__btn {
      display: flex;
      flex: 0 0 auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      width: max-content;
      min-width: 74px;
      align-self: stretch;
      box-sizing: border-box;
      padding: 2px 8px;
      border: 0;
      border-radius: 0;
      color: var(--primary-3);
      font: 400 14px/1 Roboto, Inter, sans-serif;
      cursor: pointer;
    }
    .oracle-swipe__btn img { display: block; flex: 0 0 auto; width: 32px; height: 32px; }
    .oracle-swipe__btn span {
      overflow: visible;
      white-space: nowrap;
      line-height: 1;
    }
    .oracle-swipe__btn.is-pin { background: #08a723; }
    .oracle-swipe__btn.is-mute { background: #cf7a02; }
    .oracle-swipe__btn.is-delete { background: #d40206; }
    .oracle-swipe__btn.is-archive { background: #2c2a3d; }
`;

const button = (action: RoomAction, icon: string, label: string): HTMLButtonElement => {
  const el = document.createElement("button");
  el.type = "button";
  el.className = `oracle-swipe__btn is-${action}`;
  el.dataset.action = action;
  el.innerHTML = `<img src="${icon}" width="32" height="32" alt="" /><span></span>`;
  const caption = el.querySelector("span");
  if (caption) {
    caption.textContent = label;
  }
  return el;
};

export const bindRoomSwipe = (host: HTMLElement, api: RoomSwipeApi): (() => void) => {
  const root = host.shadowRoot;
  if (!root) {
    return () => undefined;
  }

  ensureShadowStyle(root, STYLE_ID, CSS);

  let drag: Drag | null = null;
  let openItem: HTMLElement | null = null;

  const close = (item: HTMLElement, immediate = false): void => {
    if (immediate) {
      item.classList.add("is-dragging");
    } else {
      item.classList.remove("is-dragging");
    }
    setOffset(item, 0);
    if (immediate) {
      requestAnimationFrame(() => item.classList.remove("is-dragging"));
    }
    if (openItem === item) {
      openItem = null;
    }
  };

  const closeOpenRows = (): void => {
    if (drag?.active) {
      return;
    }
    root.querySelectorAll(".vac-room-item").forEach((node) => {
      if (node instanceof HTMLElement && offsetOf(node) !== 0) {
        close(node, true);
      }
    });
  };

  const ensure = (item: HTMLElement): void => {
    unwrap(item);
    if (isSystemRoom(item)) {
      item.classList.remove("is-swipeable", "is-dragging");
      item.querySelectorAll(".oracle-swipe--pin, .oracle-swipe--right").forEach((node) => node.remove());
      if (offsetOf(item) !== 0) {
        setOffset(item, 0);
      }
      return;
    }
    const list = item.closest(".vac-room-list");
    if (!(list instanceof HTMLElement)) {
      return;
    }

    const { left, right } = bleedList(list);
    if (!item.dataset.swipePadLeft) {
      const itemStyle = getComputedStyle(item);
      item.dataset.swipePadLeft = String(parseFloat(itemStyle.paddingLeft) || 0);
      item.dataset.swipePadRight = String(parseFloat(itemStyle.paddingRight) || 0);
    }

    item.classList.add("is-swipeable");
    item.style.paddingLeft = "0";
    item.style.paddingRight = "0";
    const card = item.querySelector<HTMLElement>(".vac-room-container");
    if (card) {
      card.style.boxSizing = "border-box";
      card.style.paddingLeft = `${Number(item.dataset.swipePadLeft) + left}px`;
      card.style.paddingRight = `${Number(item.dataset.swipePadRight) + right}px`;
    }

    const mute = item.querySelector<HTMLElement>(".oracle-swipe__btn.is-mute span");
    const pinLabel = item.querySelector<HTMLElement>(".oracle-swipe__btn.is-pin span");
    if (mute && pinLabel) {
      mute.textContent = api.label(RoomAction.Mute, item.id);
      pinLabel.textContent = api.label(RoomAction.Pin, item.id);
      return;
    }

    item.querySelectorAll(".oracle-swipe--pin, .oracle-swipe--right").forEach((node) => node.remove());
    const pin = button(RoomAction.Pin, "/svg/figma-icons/pin-32.svg", api.label(RoomAction.Pin, item.id));
    pin.classList.add("oracle-swipe--pin");
    const actions = document.createElement("div");
    actions.className = "oracle-swipe--right";
    actions.append(
      button(RoomAction.Mute, "/svg/figma-icons/notification-silent.svg", api.label(RoomAction.Mute, item.id)),
      button(RoomAction.Delete, "/svg/figma-icons/delete.svg", api.label(RoomAction.Delete, item.id)),
      button(RoomAction.Archive, "/svg/figma-icons/archive.svg", api.label(RoomAction.Archive, item.id)),
    );
    item.prepend(pin, actions);
  };

  const onPointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) {
      return;
    }

    const item = roomItem(event);
    if (!item || isSystemRoom(item)) {
      if (openItem) {
        close(openItem);
      }
      return;
    }

    if (event.composedPath().some((entry) => entry instanceof HTMLElement && entry.classList.contains("oracle-swipe__btn"))) {
      return;
    }

    ensure(item);
    if (openItem && openItem !== item) {
      close(openItem);
    }

    drag = {
      item,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: offsetOf(item),
      active: false,
    };
  };

  const onPointerMove = (event: PointerEvent): void => {
    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.active) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
        return;
      }
      if (Math.abs(dy) > Math.abs(dx)) {
        drag = null;
        return;
      }
      drag.active = true;
      drag.item.classList.add("is-dragging");
      window.getSelection()?.removeAllRanges();
      try {
        host.setPointerCapture(event.pointerId);
      } catch {
        // The pointer can already be gone if the gesture ended on this frame.
      }
    }

    event.preventDefault();
    const next = Math.max(-rightWidth(drag.item), Math.min(pinReveal(drag.item), drag.origin + dx));
    setOffset(drag.item, next);
  };

  const onPointerUp = (event: PointerEvent): void => {
    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }

    const current = drag;
    drag = null;
    current.item.classList.remove("is-dragging");

    if (!current.active) {
      if (current.origin !== 0) {
        current.item.dataset.blockClick = "1";
        close(current.item);
      }
      return;
    }

    current.item.dataset.blockClick = "1";
    const width = rightWidth(current.item);
    const pin = pinReveal(current.item);
    const value = offsetOf(current.item);
    let snap = 0;
    if (value > pin / 2) {
      snap = pin;
    } else if (value < -width / 2) {
      snap = -width;
    }
    setOffset(current.item, snap);
    openItem = snap === 0 ? null : current.item;
  };

  const syncOrder = (): void => {
    const list = root.querySelector(".vac-room-list");
    if (!list) {
      return;
    }

    for (const id of api.order()) {
      const node = root.getElementById(id);
      if (node) {
        unwrap(node);
        list.append(node);
      }
    }
  };

  const onClick = (event: MouseEvent): void => {
    const action = closestInPath(event, "oracle-swipe__btn");
    if (action) {
      const item = action.closest(".vac-room-item");
      const name = action.dataset.action as RoomAction | undefined;
      event.preventDefault();
      event.stopPropagation();
      if (item instanceof HTMLElement) {
        close(item);
      }
      if (name && item instanceof HTMLElement) {
        api.run(name, item.id);
        if (name === RoomAction.Pin || name === RoomAction.Archive || name === RoomAction.Delete) {
          requestAnimationFrame(syncOrder);
        }
      }
      return;
    }

    const item = roomItem(event);
    if (item?.dataset.blockClick === "1") {
      event.preventDefault();
      event.stopPropagation();
      item.dataset.blockClick = "";
    }
  };

  const wrapAll = (): void => {
    root.querySelectorAll(".vac-room-item").forEach((node) => {
      if (node instanceof HTMLElement) {
        ensure(node);
      }
    });
  };

  wrapAll();
  const list = root.querySelector(".vac-room-list");
  const observer = new MutationObserver(() => {
    closeOpenRows();
    wrapAll();
  });
  if (list) {
    observer.observe(list, { childList: true });
  }

  const onSelectStart = (event: Event): void => {
    if (event.composedPath().some((entry) => entry instanceof HTMLElement && entry.classList.contains("vac-room-item"))) {
      event.preventDefault();
    }
  };

  host.addEventListener("pointerdown", onPointerDown, true);
  host.addEventListener("selectstart", onSelectStart, true);
  host.addEventListener("click", onClick, true);
  window.addEventListener("pointermove", onPointerMove, { passive: false });
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);

  return () => {
    observer.disconnect();
    host.removeEventListener("pointerdown", onPointerDown, true);
    host.removeEventListener("selectstart", onSelectStart, true);
    host.removeEventListener("click", onClick, true);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    drag = null;
    openItem = null;
  };
};
