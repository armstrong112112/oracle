import { closestInPath, ensureShadowStyle } from "~/entities/chat/lib/vac-shadow";
import { IMPORTANT_ROOM_IDS, IMPORTANT_VIDEO_ID } from "~/entities/chat/lib/important-rooms";
import type { ImportantChatsApi } from "./types";

const STYLE_ID = "oracle-important-chats";
const MOTION_MS = 240;
const ROOM_IDS = new Set<string>(IMPORTANT_ROOM_IDS);
const COLLAPSIBLE_IDS = new Set(IMPORTANT_ROOM_IDS.filter((id) => id !== "saved"));

const rowHeight = (): number => (window.matchMedia("(max-width: 768px)").matches ? 60 : 71);

const prefersMotion = (): boolean => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clearMotion = (item: HTMLElement): void => {
  delete item.dataset.importantMotion;
  item.style.height = "";
  item.style.minHeight = "";
  item.style.opacity = "";
  item.style.overflow = "";
  item.style.pointerEvents = "";
  item.style.transition = "";
};

const slide = (item: HTMLElement, from: number, to: number): Promise<void> =>
  new Promise((resolve) => {
    let settled = false;
    const finish = (): void => {
      if (settled) {
        return;
      }
      settled = true;
      item.removeEventListener("transitionend", onEnd);
      resolve();
    };
    const onEnd = (event: TransitionEvent): void => {
      if (event.target === item && event.propertyName === "height") {
        finish();
      }
    };

    item.style.overflow = "hidden";
    item.style.pointerEvents = to === 0 ? "none" : "";
    item.style.transition = "none";
    item.style.minHeight = "0px";
    item.style.height = `${from}px`;
    item.style.opacity = from === 0 ? "0" : "1";
    item.getBoundingClientRect();
    item.style.transition = `height ${MOTION_MS}ms ease, opacity ${MOTION_MS}ms ease`;
    item.style.height = `${to}px`;
    item.style.opacity = to === 0 ? "0" : "1";
    item.addEventListener("transitionend", onEnd);
    window.setTimeout(finish, MOTION_MS + 50);
  });

const selectRooms = (ids: readonly string[], suffix = ""): string =>
  ids.map((id) => `#${CSS.escape(id)}.vac-room-item${suffix}`).join(",\n    ");

const ROOM_CSS = `
    .oracle-important-toggle {
      position: sticky;
      top: 0;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 36px;
      margin: 0;
      padding: 12px 14px;
      border: 0;
      border-radius: 12px;
      background: var(--chat-sidemenu-bg-color, var(--primary-1));
      color: var(--primary-3);
      font: 400 14px/1.3 Roboto, Inter, sans-serif;
      cursor: pointer;
    }
    .oracle-important-toggle span { padding: 0 5px; }
    .oracle-important-toggle img {
      width: 16px;
      height: 16px;
      flex: 0 0 auto;
      transition: transform .24s ease;
    }
    .oracle-important-toggle.is-open img { transform: rotate(180deg); }
    ${selectRooms(IMPORTANT_ROOM_IDS)} {
      box-sizing: border-box;
      min-height: 71px;
      margin-bottom: 5px;
      padding: 0 14px;
      border-radius: 8px;
    }
    @media (max-width: 768px) {
      ${selectRooms(IMPORTANT_ROOM_IDS)} {
        min-height: 60px;
      }
    }
    ${selectRooms(IMPORTANT_ROOM_IDS, " .vac-name-container")} {
      min-width: 0;
      border-bottom: 0;
      padding: 0;
    }
    ${selectRooms(IMPORTANT_ROOM_IDS, " .vac-room-name")} {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.3;
    }
    ${selectRooms(IMPORTANT_ROOM_IDS, " .vac-text-date")} {
      margin-left: 0;
      color: #8780cf;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.35;
    }
    ${selectRooms(IMPORTANT_ROOM_IDS, " .vac-text-last")} {
      margin-top: 4px;
      color: #bfb7ff;
      font-size: 12px;
      font-weight: 400;
      line-height: 1.35;
    }
    ${selectRooms(IMPORTANT_ROOM_IDS, " .vac-format-message-wrapper")} { color: #bfb7ff; }
    .oracle-viewed-wrap { display: flex; margin-right: 4px; }
    .oracle-viewed { display: block; width: 16px; height: 16px; }
    .oracle-video {
      position: relative;
      flex: 0 0 auto;
      width: 16px;
      height: 16px;
      margin-right: 4px;
      border-radius: 4px;
      overflow: hidden;
    }
    .oracle-video__shot { display: block; width: 16px; height: 16px; object-fit: cover; }
    .oracle-video__play {
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 50%;
      width: 8px;
      height: 8px;
      transform: translate(-50%, -50%);
    }
    .oracle-video::after {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.1);
    }
`;

const markViewed = (item: HTMLElement): void => {
  const icon = item.querySelector(".vac-icon-check, .oracle-viewed");
  if (!icon) {
    return;
  }

  let viewed = icon;
  if (icon.classList.contains("vac-icon-check")) {
    const image = document.createElement("img");
    image.className = "oracle-viewed";
    image.src = "/svg/figma-icons/viewed.svg";
    image.width = 16;
    image.height = 16;
    image.alt = "";
    icon.replaceWith(image);
    viewed = image;
  }

  const holder = viewed.parentElement;
  const date = item.querySelector(".vac-text-date");
  if (!holder || !date) {
    return;
  }

  holder.classList.add("oracle-viewed-wrap");
  if (holder.nextElementSibling !== date) {
    date.before(holder);
  }
};

const markVideo = (item: HTMLElement): void => {
  const row = item.querySelector(".vac-text-last");
  if (!row || row.querySelector(".oracle-video")) {
    return;
  }

  const mark = document.createElement("span");
  mark.className = "oracle-video";
  mark.innerHTML =
    '<img class="oracle-video__shot" src="/png/user.png" alt="" /><img class="oracle-video__play" src="/svg/figma-icons/play.svg" width="24" height="24" alt="" />';
  row.prepend(mark);
};

const decorate = (item: HTMLElement): void => {
  if (!ROOM_IDS.has(item.id)) {
    return;
  }

  markViewed(item);
  if (item.id === IMPORTANT_VIDEO_ID) {
    markVideo(item);
  }
};

export const bindImportantChats = (host: HTMLElement, api: ImportantChatsApi): (() => void) => {
  const root = host.shadowRoot;
  if (!root) {
    return () => undefined;
  }

  ensureShadowStyle(root, STYLE_ID, ROOM_CSS);

  let toggle = root.querySelector<HTMLButtonElement>(".oracle-important-toggle");

  const ensureToggle = (): HTMLButtonElement => {
    if (toggle?.isConnected) {
      return toggle;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "oracle-important-toggle";
    const label = document.createElement("span");
    const icon = document.createElement("img");
    icon.src = "/svg/figma-icons/arrow-down.svg";
    icon.width = 24;
    icon.height = 24;
    icon.alt = "";
    button.append(label, icon);
    toggle = button;
    return button;
  };

  let phase: "idle" | "expand" | "collapse" = "idle";
  let generation = 0;
  let openFrame = 0;

  const rowsOf = (list: ParentNode): HTMLElement[] =>
    [...list.querySelectorAll<HTMLElement>(".vac-room-item")].filter((item) => COLLAPSIBLE_IDS.has(item.id));

  const place = (): void => {
    const list = root.querySelector(".vac-room-list");
    if (!list) {
      return;
    }

    list.querySelectorAll<HTMLElement>(".vac-room-item").forEach(decorate);

    const important = [...list.querySelectorAll<HTMLElement>(".vac-room-item")].filter((item) =>
      ROOM_IDS.has(item.id),
    );
    const button = ensureToggle();
    const label = button.querySelector("span");
    const nextLabel = api.label();
    if (label && label.textContent !== nextLabel) {
      label.textContent = nextLabel;
    }
    button.classList.toggle("is-open", api.open());

    if (phase === "expand") {
      for (const item of rowsOf(list)) {
        if (item.dataset.importantMotion === "play") {
          continue;
        }
        item.dataset.importantMotion = "arm";
        item.style.overflow = "hidden";
        item.style.transition = "none";
        item.style.minHeight = "0px";
        item.style.height = "0px";
        item.style.opacity = "0";
      }
    }

    if (!important.length) {
      button.remove();
      return;
    }

    if (list.firstElementChild !== button) {
      list.prepend(button);
    }
  };

  const onClick = (event: MouseEvent): void => {
    if (!closestInPath(event, "oracle-important-toggle")) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    if (phase !== "idle") {
      return;
    }

    const opening = !api.open();
    api.toggle();
    const list = root.querySelector(".vac-room-list");
    if (!prefersMotion() || !list) {
      api.mount(opening);
      place();
      return;
    }

    const gen = ++generation;
    if (opening) {
      phase = "expand";
      api.mount(true);
      place();
      openFrame = requestAnimationFrame(() => {
        openFrame = requestAnimationFrame(() => {
          if (gen !== generation) {
            return;
          }
          const current = root.querySelector(".vac-room-list");
          const rows = current ? rowsOf(current) : [];
          for (const item of rows) {
            item.dataset.importantMotion = "play";
          }
          void Promise.all(rows.map((item) => slide(item, 0, rowHeight()))).then(() => {
            if (gen !== generation) {
              return;
            }
            for (const item of rows) {
              clearMotion(item);
            }
            phase = "idle";
          });
        });
      });
      return;
    }

    phase = "collapse";
    const rows = rowsOf(list);
    void Promise.all(rows.map((item) => slide(item, item.getBoundingClientRect().height || rowHeight(), 0))).then(
      () => {
        if (gen !== generation) {
          return;
        }
        api.mount(false);
        phase = "idle";
      },
    );
    place();
  };

  place();
  const observer = new MutationObserver(() => place());
  const list = root.querySelector(".vac-room-list");
  if (list) {
    observer.observe(list, { childList: true, subtree: true });
  }

  host.addEventListener("click", onClick, true);

  return () => {
    generation += 1;
    cancelAnimationFrame(openFrame);
    observer.disconnect();
    host.removeEventListener("click", onClick, true);
    toggle?.remove();
    toggle = null;
  };
};
