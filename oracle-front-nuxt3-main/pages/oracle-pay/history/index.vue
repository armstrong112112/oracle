<template>
  <div class="">
    <!-- Мобильная версия -->
    <div v-if="windowWidth < 1024" class="notification mt-0 pb-0">
      <div class="go-back" @click="router.push(localePath('/oracle-pay'))">
        <img :src="'/svg/arrow-back.svg'" alt="" />
        <p class="notification-title" style="margin: 0">
          {{ $t("pay.depositsHistory") }}
        </p>
      </div>
    </div>

    <!-- Десктопная версия -->
    <PayActionsWithApiKeys v-if="windowWidth >= 1024" />
  </div>
</template>

<script setup lang="ts">
import PayActionsWithApiKeys from "~/entities/oracle-pay/ui/PayActionsWithApiKeys/index.vue";

definePageMeta({
  layout: "sidebar",
});

const router = useRouter();
const localePath = useLocalePath();
const windowWidth = ref(1024);

const handleResize = (): void => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
  }
};

onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", handleResize);
  }
});
</script>

<style scoped></style>
