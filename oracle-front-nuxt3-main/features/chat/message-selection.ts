import { VAC_MESSAGE_WRAPPER, closestInPath, ensureShadowStyle } from "~/entities/chat/lib/vac-shadow";
import type { SelectionDragApi } from "./types";

const STYLE_ID = "oracle-message-selection";
const SELECTED_STYLE_ID = "oracle-message-selection-ids";
const HOST_CLASS = "oracle-selecting";
const MOTION = "220ms cubic-bezier(0.22, 1, 0.36, 1)";

const baseRules = `
.vac-message-wrapper:has(.vac-message-box) {
  position: relative;
}
.vac-message-wrapper:has(.vac-message-box) .vac-message-box {
  transition: margin-left ${MOTION};
}
:host(.${HOST_CLASS}) .vac-message-wrapper:has(.vac-message-box) {
  -webkit-user-select: none;
  user-select: none;
}
:host(.${HOST_CLASS}) .vac-message-wrapper:has(.vac-message-box) .vac-message-box {
  touch-action: none;
}
.vac-message-wrapper:has(.vac-message-box)::before,
.vac-message-wrapper:has(.vac-message-box)::after {
  content: "";
  position: absolute;
  pointer-events: none;
}
.vac-message-wrapper:has(.vac-message-box)::before {
  z-index: 3;
  left: 2px;
  bottom: 4px;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 1.5px solid rgba(255, 255, 255, 0.75);
  border-radius: 50%;
  background: transparent;
  opacity: 0;
  transform: scale(0.72);
  transition:
    opacity ${MOTION},
    transform ${MOTION},
    background-color 160ms ease,
    border-color 160ms ease;
}
.vac-message-wrapper:has(.vac-message-box)::after {
  z-index: 4;
  left: 7px;
  bottom: 11px;
  width: 9px;
  height: 5px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  opacity: 0;
  transform: rotate(-45deg) scale(0.6);
  transition: opacity 160ms ease, transform 160ms ease;
}
:host(.${HOST_CLASS}) .vac-message-wrapper:has(.vac-message-box)::before {
  opacity: 1;
  transform: scale(1);
}
.vac-message-wrapper:has(.vac-message-box):not(:has(.vac-message-current)) .vac-avatar {
  transition: opacity ${MOTION}, width ${MOTION}, min-width ${MOTION}, margin ${MOTION};
}
:host(.${HOST_CLASS}) .vac-message-wrapper:has(.vac-message-box):not(:has(.vac-message-current)) .vac-avatar {
  width: 0;
  min-width: 0;
  margin: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
}
:host(.${HOST_CLASS}) .vac-message-wrapper:has(.vac-message-box):not(:has(.vac-message-current)) .vac-message-box {
  margin-left: 30px;
}
.vac-message-wrapper:has(.vac-message-current) {
  transition: padding-left ${MOTION};
}
:host(.${HOST_CLASS}) .vac-message-wrapper:has(.vac-message-current) {
  padding-left: 32px;
}
:host(.${HOST_CLASS}) .vac-message-wrapper:has(.vac-message-deleted) {
  padding-left: 0;
}
:host(.${HOST_CLASS}) .vac-message-wrapper:has(.vac-message-deleted)::before,
:host(.${HOST_CLASS}) .vac-message-wrapper:has(.vac-message-deleted)::after {
  opacity: 0;
  transform: scale(0.72);
}
:host(.${HOST_CLASS}) .vac-message-wrapper:has(.vac-message-deleted) .vac-message-box {
  margin-left: 0;
}
`;

const CARD_LOCK = "oracleCardLock";
const unlockTimers = new WeakMap<HTMLElement, number>();

const lockMessageCards = (root: ShadowRoot): void => {
  root.querySelectorAll<HTMLElement>(".vac-message-card").forEach((card) => {
    if (card.dataset[CARD_LOCK] === "1") {
      return;
    }
    const rect = card.getBoundingClientRect();
    if (rect.width < 1) {
      return;
    }
    const computed = getComputedStyle(card);
    const extra =
      computed.boxSizing === "border-box"
        ? 0
        : Number.parseFloat(computed.paddingLeft) +
          Number.parseFloat(computed.paddingRight) +
          Number.parseFloat(computed.borderLeftWidth) +
          Number.parseFloat(computed.borderRightWidth);
    const width = Math.max(0, rect.width - extra);
    card.dataset[CARD_LOCK] = "1";
    card.style.boxSizing = computed.boxSizing;
    card.style.width = `${width}px`;
    card.style.maxWidth = `${width}px`;
    card.style.flexGrow = "0";
  });
};

const unlockMessageCards = (root: ShadowRoot): void => {
  root.querySelectorAll<HTMLElement>(".vac-message-card").forEach((card) => {
    if (card.dataset[CARD_LOCK] !== "1") {
      return;
    }
    delete card.dataset[CARD_LOCK];
    card.style.boxSizing = "";
    card.style.width = "";
    card.style.maxWidth = "";
    card.style.flexGrow = "";
  });
};

const selectedRule = (id: string): string => {
  const sel = `:host(.${HOST_CLASS}) #${CSS.escape(id)}:has(.vac-message-box)`;
  return `
${sel}::before {
  border-color: transparent;
  background: var(--primary-2);
}
${sel}::after {
  opacity: 1;
  transform: rotate(-45deg) scale(1);
}
`;
};

export const applySelectedMessageStyles = (
  host: HTMLElement,
  active: boolean,
  ids: readonly string[],
): void => {
  const root = host.shadowRoot;
  if (!root) {
    return;
  }

  ensureShadowStyle(root, STYLE_ID, baseRules);
  ensureShadowStyle(root, SELECTED_STYLE_ID, active ? ids.map(selectedRule).join("") : "");

  const wasActive = host.classList.contains(HOST_CLASS);
  if (!active) {
    host.classList.remove(HOST_CLASS);
    window.clearTimeout(unlockTimers.get(host));
    unlockTimers.set(
      host,
      window.setTimeout(() => {
        unlockTimers.delete(host);
        if (!host.classList.contains(HOST_CLASS)) {
          unlockMessageCards(root);
        }
      }, 240),
    );
    return;
  }

  window.clearTimeout(unlockTimers.get(host));
  unlockTimers.delete(host);
  if (wasActive) {
    return;
  }

  lockMessageCards(root);
  const probe = root.querySelector<HTMLElement>(".vac-message-wrapper");
  void probe?.offsetWidth;
  host.classList.add(HOST_CLASS);
};

const sameIds = (left: readonly string[], right: readonly string[]): boolean => {
  if (left.length !== right.length) {
    return false;
  }
  const known = new Set(left);
  return right.every((id) => known.has(id));
};

const wrapperId = (event: Event): string => closestInPath(event, VAC_MESSAGE_WRAPPER)?.id ?? "";

export const bindSelectionDrag = (host: HTMLElement, api: SelectionDragApi): (() => void) => {
  const root = host.shadowRoot;
  if (!root) {
    return () => undefined;
  }

  let drag: {
    pointerId: number;
    x: number;
    y: number;
    scrollTop: number;
    anchorId: string;
    selecting: boolean;
    snapshot: string[];
    wasActive: boolean;
    moved: boolean;
    lastHit: string;
  } | null = null;

  const orderedIds = (): string[] =>
    [...root.querySelectorAll<HTMLElement>(".vac-message-wrapper")]
      .map((node) => node.id)
      .filter((id) => api.canSelect(id));

  const idAt = (x: number, y: number): string => {
    const hit = (root.elementsFromPoint?.(x, y) ?? []).find(
      (node) => node instanceof HTMLElement && node.classList.contains("vac-message-wrapper"),
    );
    return hit instanceof HTMLElement && api.canSelect(hit.id) ? hit.id : "";
  };

  const paint = (x: number, y: number): void => {
    if (!drag) {
      return;
    }

    const scroller = root.querySelector<HTMLElement>(".vac-container-scroll");
    if (scroller) {
      const box = scroller.getBoundingClientRect();
      if (y < box.top + 56) {
        scroller.scrollTop -= 14;
      } else if (y > box.bottom - 56) {
        scroller.scrollTop += 14;
      }
    }

    const hit = idAt(x, y);
    if (hit) {
      drag.lastHit = hit;
    }
    const order = orderedIds();
    const from = order.indexOf(drag.anchorId);
    const to = order.indexOf(drag.lastHit);
    if (from < 0 || to < 0) {
      return;
    }

    const start = Math.min(from, to);
    const end = Math.max(from, to);
    const next = new Set(drag.snapshot);
    for (let index = start; index <= end; index += 1) {
      const id = order[index];
      if (!id) {
        continue;
      }
      if (drag.selecting) {
        next.add(id);
      } else {
        next.delete(id);
      }
    }

    const ids = [...next];
    if (!sameIds(ids, api.ids())) {
      api.setIds(ids);
    }
  };

  const photoAt = (x: number, y: number): { messageId: string; index: number } | null => {
    const file = (root.elementsFromPoint?.(x, y) ?? []).find(
      (node) => node instanceof HTMLElement && node.classList.contains("vac-message-file-container"),
    );
    if (!(file instanceof HTMLElement)) {
      return null;
    }

    const cell = file.parentElement;
    const container = cell?.parentElement;
    if (!cell || !container?.classList.contains("vac-message-files-container")) {
      return null;
    }

    const cells = [...container.children].filter(
      (node) => node instanceof HTMLElement && !node.classList.contains("vac-format-message-wrapper"),
    );
    const index = cells.indexOf(cell);
    const wrapper = container.closest<HTMLElement>(".vac-message-wrapper");
    if (!wrapper?.id || index < 0 || index > 3 || cells.length < 2) {
      return null;
    }

    return { messageId: wrapper.id, index };
  };

  const finish = (event: PointerEvent): void => {
    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }

    const photo = !drag.moved && drag.wasActive ? photoAt(event.clientX, event.clientY) : null;
    if (photo && photo.messageId === drag.anchorId) {
      api.togglePhoto(photo.messageId, photo.index);
    } else if (drag.moved) {
      paint(event.clientX, event.clientY);
    } else if (drag.wasActive) {
      const next = new Set(drag.snapshot);
      if (next.has(drag.anchorId)) {
        next.delete(drag.anchorId);
      } else {
        next.add(drag.anchorId);
      }
      api.setIds([...next]);
    }

    drag = null;
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", finish);
    window.removeEventListener("pointercancel", finish);
  };

  const move = (event: PointerEvent): void => {
    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }

    const distance = Math.hypot(event.clientX - drag.x, event.clientY - drag.y);
    if (!drag.moved) {
      if (distance < 8) {
        return;
      }

      drag.moved = true;
      if (!drag.wasActive) {
        const scroller = root.querySelector<HTMLElement>(".vac-container-scroll");
        if (scroller) {
          scroller.scrollTop = drag.scrollTop;
        }
      }
    }

    if (event.cancelable) {
      event.preventDefault();
    }
    paint(event.clientX, event.clientY);
  };

  const start = (event: PointerEvent): void => {
    if (drag || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    const id = wrapperId(event);
    if (!id || !api.canSelect(id)) {
      return;
    }

    const wasActive = api.active();
    if (wasActive) {
      event.preventDefault();
      event.stopPropagation();
    }
    drag = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      scrollTop: root.querySelector<HTMLElement>(".vac-container-scroll")?.scrollTop ?? 0,
      anchorId: id,
      selecting: wasActive ? !api.ids().includes(id) : true,
      snapshot: wasActive ? [...api.ids()] : [],
      wasActive,
      moved: false,
      lastHit: id,
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", finish);
    window.addEventListener("pointercancel", finish);
  };

  const blockTouchScroll = (event: TouchEvent): void => {
    if (drag?.moved && event.cancelable) {
      event.preventDefault();
    }
  };

  host.addEventListener("pointerdown", start, true);
  host.addEventListener("touchmove", blockTouchScroll, { capture: true, passive: false });

  return () => {
    drag = null;
    host.removeEventListener("pointerdown", start, true);
    host.removeEventListener("touchmove", blockTouchScroll, true);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", finish);
    window.removeEventListener("pointercancel", finish);
  };
};
