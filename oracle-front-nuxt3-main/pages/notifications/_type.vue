<template>
  <div>
    <div class="notification" style="margin-top: 0">
      <div
        :class="['go-back type-go-back', { scrolled: isScrolled }]"
        @click="goBack">
        <img :src="'/svg/arrow-back.svg'" alt="" />

        <p class="notification-title" style="margin: 0">
          {{ $route.params.type }}
        </p>
      </div>
      <NotificationDetails :type="$route.params.type" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import HeaderOracle from "~/components/header-oracle.vue";
import NotificationDetails from "~/widgets/notifications/NotificationDetails/index.vue";

const isScrolled = ref(false);
const handleScroll = () => (isScrolled.value = window.scrollY > 100);

const goBack = () => {
  const router = useRouter();
  router.go(-1);
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>
<style lang="scss">
.type-go-back {
  position: sticky;
  top: 75px;
  background: linear-gradient(180deg, #0a090f 25.81%, rgba(10, 9, 15, 0) 100%);
  height: 30px;
  align-items: flex-start;
  padding-top: 24px;
  z-index: 99;
}
.go-back.scrolled {
  height: 124px;
}
</style>
