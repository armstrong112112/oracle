export interface EmojiTier {
  count: number;
  size: number;
  gap: number;
  columns: number;
  emojis: string[];
}

const emojiSequence = (): RegExp =>
  /\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\p{Emoji_Modifier})?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\p{Emoji_Modifier})?)*/gu;

export const parseEmojiOnly = (value: string): EmojiTier | null => {
  const source = value.trim();
  if (!source) {
    return null;
  }

  const emojis = source.match(emojiSequence());
  if (!emojis?.length) {
    return null;
  }

  const leftover = source.replace(emojiSequence(), "").replace(/[\s\u200D\uFE0F\uFE0E]/g, "");
  if (leftover) {
    return null;
  }

  const count = emojis.length;
  if (count <= 4) {
    return { count, size: 54, gap: 8, columns: count, emojis };
  }
  if (count === 5) {
    return { count, size: 48, gap: 10, columns: 5, emojis };
  }
  if (count <= 7) {
    return { count, size: 32, gap: 8, columns: count, emojis };
  }

  return { count, size: 24, gap: 8, columns: 9, emojis };
};
