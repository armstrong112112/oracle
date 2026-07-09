<template>
  <div class="emoji-clicker">
    <div
      v-for="reaction in reactions"
      :key="reaction.emoji"
      class="emoji-wrapper"
      :class="{ selected: selectedEmoji === reaction.emoji }"
      @click="toggleReaction(reaction)">
      <img :src="emojiMap[reaction.emoji]" alt="emoji" class="emoji" />
      <span class="count">{{ reaction.count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Reaction {
  emoji: string;
  count: number;
}

interface Props {
  reactions: Reaction[];
  postId: string;
}

interface UpdateReactionsPayload {
  postId: string;
  reactions: Reaction[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update-reactions": [payload: UpdateReactionsPayload];
}>();

const selectedEmoji = ref<string | null>(null);

const emojiMap: Record<string, string> = {
  smile: "/icons/market/emojis/smile.svg",
  heart: "/icons/market/emojis/heart.svg",
  angry: "/icons/market/emojis/angry.svg",
  "heart-eyes": "/icons/market/emojis/heart-eyes.svg",
};

const toggleReaction = (reaction: Reaction): void => {
  const emoji = reaction.emoji;

  if (selectedEmoji.value === emoji) {
    reaction.count -= 1;
    selectedEmoji.value = null;
  } else {
    if (selectedEmoji.value) {
      const previousReaction = props.reactions.find(
        (r) => r.emoji === selectedEmoji.value
      );
      if (previousReaction) {
        previousReaction.count -= 1;
      }
    }

    selectedEmoji.value = emoji;
    reaction.count += 1;
  }

  emit("update-reactions", {
    postId: props.postId,
    reactions: props.reactions,
  });
};
</script>

<style scoped>
.emoji-clicker {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.emoji-wrapper {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 8px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);

  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Reza Zulmi Alfaizi Sans", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: right;
}

.emoji-wrapper:hover {
  background-color: #3a3a3a;
}

.emoji-wrapper.selected {
  background: rgba(255, 255, 255, 0.2);
}

.emoji {
  width: 20px;
  height: 20px;
}

.count {
  color: #ffffff;
  font-size: 14px;
}
</style>
