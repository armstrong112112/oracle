<template>
  <div class="whitelist notification p-0 mt-0">
    <PageHeader
      v-if="windowWidth < 1024"
      :plus-link="localePath('/whitelist/verification')"
      :title="$t('whitelist.pageTitle')"
      :is-plus="true"
      style="width: 100%" />
    <div class="desktop-whitelist-layout">
      <div class="flex flex-col gap-12">
        <WhiteListHeader />
        <WhiteListIsVerification />
      </div>
      <div class="flex flex-col gap-24">
        <div></div>
        <WhiteListUserList />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
// @ts-ignore
import WhiteListHeader from "~/entities/whitelist/ui/WhiteListHeader/index.vue";
import WhiteListIsVerification from "~/entities/whitelist/ui/WhiteListIsVerification/index.vue";
import WhiteListUserList from "~/entities/whitelist/ui/WhiteListUserList/index.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";

definePageMeta({
  layout: "sidebar",
});

const windowWidth = ref(0);
const localePath = useLocalePath();

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? "footer" : "sidebar";
  setPageLayout(newLayout);
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
  updateLayout();
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", updateWindowWidth);
  updateLayout();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>
<style lang="scss" scoped>
.whitelist {
  &.notification {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .desktop-whitelist-layout {
    width: 100%;
    max-width: 100%;
  }
  @media (min-width: 1024px) {
    .desktop-whitelist-layout {
      max-width: 65vw;
      width: 100%;
    }
  }
}
</style>
