export interface ComposerGif {
  id: string;
  url: string;
  preview: string;
  name: string;
}

export interface ComposerSticker {
  id: string;
  url: string;
  name: string;
}

export interface ComposerPack {
  id: string;
  icon: string;
}

const GIF_SOURCES: Array<Pick<ComposerGif, "url" | "preview" | "name">> = [
  { name: "home-1.gif", url: "/png/home-1.png", preview: "/png/home-1.png" },
  { name: "home-2.gif", url: "/png/home-2.png", preview: "/png/home-2.png" },
  { name: "home-3.gif", url: "/png/home-3.png", preview: "/png/home-3.png" },
  { name: "zaglushka.gif", url: "/png/zaglushka.png", preview: "/png/zaglushka.png" },
  { name: "bitcoin.gif", url: "/png/bitcoin.png", preview: "/png/bitcoin.png" },
  { name: "new-features.gif", url: "/png/new-features.png", preview: "/png/new-features.png" },
];

export const COMPOSER_GIFS: ComposerGif[] = Array.from({ length: 12 }, (_, index) => {
  const source = GIF_SOURCES[index % GIF_SOURCES.length];
  return {
    id: `gif-${index + 1}`,
    ...source,
  };
});

const STICKER_SOURCES: Array<Pick<ComposerSticker, "url" | "name">> = [
  { name: "sticker-1.webp", url: "/png/user.png" },
  { name: "sticker-2.webp", url: "/png/zaglushka.png" },
  { name: "sticker-3.webp", url: "/avatars/barbara.png" },
  { name: "sticker-4.webp", url: "/png/home-1.png" },
  { name: "sticker-5.webp", url: "/png/home-2.png" },
  { name: "sticker-6.webp", url: "/png/bitcoin.png" },
  { name: "sticker-7.webp", url: "/png/recent-oracle.png" },
  { name: "sticker-8.webp", url: "/png/file-img.png" },
];

export const COMPOSER_STICKERS: ComposerSticker[] = Array.from({ length: 15 }, (_, index) => {
  const source = STICKER_SOURCES[index % STICKER_SOURCES.length];
  return {
    id: `sticker-${index + 1}`,
    ...source,
  };
});

export const COMPOSER_EMOJI_SHORTCODES: Array<{ emoji: string; names: string[] }> = [
  { emoji: "😀", names: ["grinning", "grin", "happy", "улыбка"] },
  { emoji: "😁", names: ["beaming", "grin", "happy"] },
  { emoji: "😂", names: ["joy", "lol", "laugh", "смех"] },
  { emoji: "🤣", names: ["rofl", "lol", "laugh"] },
  { emoji: "😊", names: ["smile", "blush", "happy"] },
  { emoji: "😍", names: ["heart_eyes", "love", "любовь"] },
  { emoji: "😘", names: ["kiss", "love", "поцелуй"] },
  { emoji: "😎", names: ["cool", "sunglasses"] },
  { emoji: "🤔", names: ["thinking", "hmm", "думаю"] },
  { emoji: "😴", names: ["sleep", "zzz", "сон"] },
  { emoji: "😭", names: ["sob", "cry", "плач"] },
  { emoji: "😡", names: ["angry", "rage", "злой"] },
  { emoji: "🤯", names: ["exploding", "mindblown", "шок"] },
  { emoji: "🥳", names: ["party", "tada", "праздник"] },
  { emoji: "👍", names: ["thumbsup", "like", "+1", "ок"] },
  { emoji: "👎", names: ["thumbsdown", "dislike", "-1"] },
  { emoji: "👏", names: ["clap", "bravo"] },
  { emoji: "🙏", names: ["pray", "thanks", "please"] },
  { emoji: "🔥", names: ["fire", "hot", "огонь"] },
  { emoji: "❤️", names: ["heart", "love", "сердце"] },
  { emoji: "🧡", names: ["orange_heart"] },
  { emoji: "💛", names: ["yellow_heart"] },
  { emoji: "💚", names: ["green_heart"] },
  { emoji: "💙", names: ["blue_heart"] },
  { emoji: "✅", names: ["check", "done", "yes"] },
  { emoji: "❌", names: ["x", "no", "cross"] },
  { emoji: "⭐", names: ["star", "звезда"] },
  { emoji: "🎉", names: ["tada", "party", "confetti"] },
  { emoji: "💯", names: ["100", "hundred"] },
  { emoji: "👀", names: ["eyes", "look"] },
  { emoji: "🤝", names: ["handshake", "deal"] },
  { emoji: "💪", names: ["muscle", "strong"] },
  { emoji: "🎂", names: ["cake", "birthday", "торт"] },
  { emoji: "🐻", names: ["bear", "медведь"] },
  { emoji: "✨", names: ["sparkles", "stars"] },
  { emoji: "😅", names: ["sweat_smile", "oops"] },
  { emoji: "🥰", names: ["smiling_hearts", "love"] },
  { emoji: "😇", names: ["innocent", "angel"] },
];

export const COMPOSER_EMOJIS = COMPOSER_EMOJI_SHORTCODES.map((item) => item.emoji);

export const COMPOSER_RECENT_EMOJIS = ["😍", "😊", "😘", "🥳", "🎂", "🐻", "😂", "😅"];

export const GIF_QUICK_TAGS = ["❤️", "👍", "✨", "😊", "😂", "🎉", "🔥", "😍"];

export const PICKER_PACKS: ComposerPack[] = [
  { id: "recent", icon: "🕐" },
  { id: "saved", icon: "🔖" },
  { id: "animals", icon: "🐱" },
  { id: "food", icon: "🍉" },
  { id: "sweets", icon: "🍓" },
  { id: "hearts", icon: "❤️" },
  { id: "party", icon: "🎉" },
  { id: "energy", icon: "⚡" },
  { id: "smileys", icon: "😊" },
];
