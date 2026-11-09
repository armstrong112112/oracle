import { ensureShadowStyle } from "~/entities/chat/lib/vac-shadow";
import type { VacMessage } from "~/entities/chat/model";

const STYLE_ID = "oracle-message-reactions";
const FACES = "oracle-reaction-faces";

const CSS = `
.vac-message-container:has(> span .vac-button-reaction) {
  width: max-content;
  max-width: 100%;
}
.vac-message-container:has(> span .vac-button-reaction) > .vac-message-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: max-content;
  max-width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
}
.vac-message-container:has(> span .vac-button-reaction) .vac-message-actions-wrapper {
  display: contents;
}
.vac-message-container:has(> span .vac-button-reaction) .vac-text-timestamp {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-self: stretch;
  gap: 4px;
  min-height: 28px;
  margin: 0;
  box-sizing: border-box;
  font-family: Roboto, Inter, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.65);
  text-align: right;
  white-space: nowrap;
}
.vac-message-container:has(> span .vac-button-reaction) .vac-icon-check {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  background: url("/svg/figma-icons/viewed.svg") center / 16px 16px no-repeat;
}
.vac-message-container:has(> span .vac-button-reaction) .vac-icon-check path {
  opacity: 0;
}
.vac-message-container:has(> span .vac-button-reaction) > span {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
}
.vac-button-reaction,
.vac-button-reaction:hover,
.vac-button-reaction.vac-reaction-me,
.vac-button-reaction.vac-reaction-me:hover {
  display: inline-flex !important;
  align-items: center;
  gap: 3px;
  height: 28px;
  margin: 0 !important;
  padding: 4px 6px 4px 5px !important;
  border: 0 !important;
  border-radius: 100px !important;
  background: var(--primary-2) !important;
  box-shadow: none !important;
  float: none !important;
  font-size: 20px;
  line-height: 20px;
  cursor: pointer;
}
.vac-button-reaction > span:not(.${FACES}) {
  display: none !important;
}
.vac-button-reaction.is-count > span:not(.${FACES}) {
  display: inline !important;
  min-width: 0;
  color: #fff;
  font-family: Roboto, Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
}
.${FACES} {
  display: inline-flex;
  align-items: center;
}
.${FACES} img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-right: -4px;
  border-radius: 50%;
  object-fit: cover;
}
.${FACES} img:last-child {
  margin-right: 0;
}
.oracle-reaction-more {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 20px;
  height: 20px;
  padding: 0 2px;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font: 600 9px/1 Roboto, Inter, sans-serif;
  flex-shrink: 0;
}
`;

type ReactionMessage = Pick<VacMessage, "_id" | "reactions">;

interface ReactionState {
  messages: readonly ReactionMessage[];
  avatars: ReadonlyMap<string, string>;
}

const latest = new WeakMap<HTMLElement, ReactionState>();
const observers = new WeakMap<HTMLElement, MutationObserver>();

const emojiOf = (button: HTMLElement): string => {
  for (const node of button.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE) {
      continue;
    }
    const text = node.textContent?.trim();
    if (text) {
      return text;
    }
  }
  return "";
};

const paintFaces = (
  button: HTMLElement,
  ids: readonly (string | number)[],
  avatars: ReadonlyMap<string, string>,
  compact: boolean,
): void => {
  const shown = ids.slice(0, 2);
  const extra = Math.max(0, ids.length - shown.length);
  const countOnly = compact || extra > 9;
  const signature = countOnly
    ? `count:${ids.length}`
    : `faces:${shown.map((id) => `${id}:${avatars.get(String(id)) ?? ""}`).join("|")}+${extra}`;
  if (button.dataset.reactionSig === signature) {
    return;
  }

  button.dataset.reactionSig = signature;
  button.classList.toggle("is-count", countOnly);
  button.querySelector(`.${FACES}`)?.remove();
  if (countOnly) {
    return;
  }

  const faces = document.createElement("span");
  faces.className = FACES;
  for (const id of shown) {
    const src = avatars.get(String(id));
    if (!src) {
      continue;
    }
    const image = document.createElement("img");
    image.src = src;
    image.alt = "";
    faces.appendChild(image);
  }
  if (extra > 0) {
    const more = document.createElement("span");
    more.className = "oracle-reaction-more";
    more.textContent = `+${extra}`;
    faces.appendChild(more);
  }
  button.appendChild(faces);
};

const emojiOnlyCard = (card: HTMLElement): boolean => {
  const style = getComputedStyle(card);
  return style.paddingTop === "0px" && style.backgroundColor === "rgba(0, 0, 0, 0)";
};

const placeRow = (container: HTMLElement, span: HTMLElement, time: HTMLElement): void => {
  const card = container.querySelector<HTMLElement>(":scope > .vac-message-card");
  if (!card) {
    return;
  }

  const bare = emojiOnlyCard(card);
  const reserve = span.offsetWidth + 8;
  if (time.style.paddingLeft !== `${reserve}px`) {
    time.style.paddingLeft = `${reserve}px`;
  }

  const cardRect = card.getBoundingClientRect();
  const boxRect = container.getBoundingClientRect();
  const timeRect = time.getBoundingClientRect();
  let left = Math.round(cardRect.left - boxRect.left + 12);
  let bottom = Math.round(boxRect.bottom - cardRect.bottom + 8);
  if (bare) {
    const spanHeight = span.getBoundingClientRect().height;
    const center = timeRect.top + timeRect.height / 2;
    left = Math.round(timeRect.left - boxRect.left);
    bottom = Math.round(boxRect.bottom - center - spanHeight / 2);
  }

  const place = `${left}:${bottom}:${reserve}`;
  if (span.dataset.place === place) {
    return;
  }

  span.dataset.place = place;
  span.style.left = `${left}px`;
  span.style.bottom = `${bottom}px`;
};

const paint = (root: ShadowRoot, state: ReactionState): void => {
  const byId = new Map(state.messages.map((message) => [message._id, message]));

  root.querySelectorAll<HTMLElement>(".vac-message-wrapper").forEach((wrapper) => {
    const message = byId.get(wrapper.id);
    const container = wrapper.querySelector<HTMLElement>(":scope .vac-message-container");
    const span = container?.querySelector<HTMLElement>(":scope > span");
    const time = container?.querySelector<HTMLElement>(".vac-text-timestamp");
    if (!container || !span || !time || !message?.reactions) {
      return;
    }

    const buttons = [...span.querySelectorAll<HTMLElement>(".vac-button-reaction")];
    if (!buttons.length) {
      return;
    }

    const compact = buttons.length > 3;
    for (const button of buttons) {
      const emoji = emojiOf(button);
      paintFaces(button, message.reactions[emoji] ?? [], state.avatars, compact);
    }
    placeRow(container, span, time);
  });
};

export const applyMessageReactions = (
  host: HTMLElement,
  messages: readonly ReactionMessage[],
  avatars: ReadonlyMap<string, string>,
): void => {
  const root = host.shadowRoot;
  if (!root) {
    return;
  }

  latest.set(host, { messages, avatars });
  ensureShadowStyle(root, STYLE_ID, CSS);

  paint(root, { messages, avatars });
  if (observers.has(host)) {
    return;
  }

  const observer = new MutationObserver(() => {
    const state = latest.get(host);
    const shadow = host.shadowRoot;
    if (!state || !shadow) {
      return;
    }
    paint(shadow, state);
  });
  observer.observe(root, { childList: true, subtree: true });
  observers.set(host, observer);
};

export const detachMessageReactions = (host: HTMLElement): void => {
  observers.get(host)?.disconnect();
  observers.delete(host);
  latest.delete(host);
};
