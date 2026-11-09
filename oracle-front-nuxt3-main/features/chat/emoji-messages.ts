import { ensureShadowStyle } from "~/entities/chat/lib/vac-shadow";
import { parseEmojiOnly } from "~/entities/chat/lib/emoji-message";

const STYLE_ID = "oracle-emoji-messages";

interface EmojiSource {
  _id: string;
  content: string;
  deleted?: boolean;
  system?: boolean;
  files?: unknown[] | null;
  replyMessage?: unknown;
}

const ruleFor = (id: string, size: number, gap: number, columns: number): string => {
  const sel = `#${CSS.escape(id)}`;
  const width = columns * size + columns * gap;

  return `
${sel} .vac-message-card,
${sel} .vac-message-card.vac-message-current,
${sel} .vac-message-card.vac-message-highlight {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  margin: 0;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  white-space: normal;
}
${sel} .vac-avatar,
${sel} .vac-text-username { display: none; }
${sel} .markdown,
${sel} .vac-format-container,
${sel} .markdown p {
  margin: 0;
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
  font-size: ${size}px;
  line-height: ${size + gap}px;
  letter-spacing: ${gap}px;
  max-width: ${width}px;
}
${sel} .markdown,
${sel} .vac-format-container { margin-bottom: -${gap}px; }
${sel} .vac-text-timestamp {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin: 0;
  font-size: 12px !important;
  font-weight: 500;
  line-height: 16px;
  color: #8780cf !important;
}
${sel} .vac-icon-check {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  background: url("/svg/figma-icons/viewed.svg") center / 16px 16px no-repeat;
}
${sel} .vac-icon-check path { opacity: 0; }
`;
};

const signatureFor = (messages: readonly EmojiSource[]): string => {
  let signature = "";

  for (const message of messages) {
    if (
      message.deleted ||
      message.system ||
      message.replyMessage ||
      message.files?.length ||
      !message.content
    ) {
      continue;
    }

    const tier = parseEmojiOnly(message.content);
    if (!tier) {
      continue;
    }

    signature += `${message._id}:${tier.size}:${tier.gap}:${tier.columns};`;
  }

  return signature;
};

const cssFor = (messages: readonly EmojiSource[]): string => {
  let css = "";

  for (const message of messages) {
    if (
      message.deleted ||
      message.system ||
      message.replyMessage ||
      message.files?.length ||
      !message.content
    ) {
      continue;
    }

    const tier = parseEmojiOnly(message.content);
    if (!tier) {
      continue;
    }

    css += ruleFor(message._id, tier.size, tier.gap, tier.columns);
  }

  return css;
};

export const applyEmojiMessageStyles = (
  host: HTMLElement,
  messages: readonly EmojiSource[],
): void => {
  const root = host.shadowRoot;
  if (!root) {
    return;
  }

  const signature = signatureFor(messages);
  if (root.getElementById(STYLE_ID)?.dataset.sig === signature) {
    return;
  }
  ensureShadowStyle(root, STYLE_ID, cssFor(messages)).dataset.sig = signature;
};
