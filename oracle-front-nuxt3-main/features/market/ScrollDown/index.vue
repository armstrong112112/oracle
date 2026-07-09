<template>
  <div v-if="showScrollDown" class="scroll-down" @click="scrollToBottom">
    <img src="/icons/market/ScrollDown.svg" alt="Scroll Down" />
  </div>
</template>

<script setup lang="ts">
const showScrollDown = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const checkScroll = () => {
  if (!containerRef.value) return;
  showScrollDown.value =
    containerRef.value.scrollHeight - containerRef.value.scrollTop >
    containerRef.value.clientHeight + 50;
};

const scrollToBottom = () => {
  if (containerRef.value) {
    containerRef.value.scrollTo({
      top: containerRef.value.scrollHeight,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  nextTick(() => {
    containerRef.value = document.querySelector(
      ".market-feed__content"
    ) as HTMLElement;
    if (containerRef.value) {
      containerRef.value.addEventListener("scroll", checkScroll);
    }
  });
});

onBeforeUnmount(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener("scroll", checkScroll);
  }
});
</script>

<style lang="scss" scoped>
.scroll-down {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #17161f;
  position: absolute;
  right: 20px;
  bottom: 10vh;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s, transform 0.3s;
  z-index: 999;
}

.scroll-down:hover {
  opacity: 1;
}

@media (max-height: 700px) {
  .scroll-down {
    bottom: 15vh;
  }
}

@media (max-height: 500px) {
  .scroll-down {
    bottom: 21vh;
  }
}
</style>
