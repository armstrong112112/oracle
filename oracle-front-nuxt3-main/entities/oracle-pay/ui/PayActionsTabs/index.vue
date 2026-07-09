<template>
  <div class="pay_actions_tabs">
    <div class="tabs_container">
      <div
        class="tab_item"
        :class="{ active: props.activeTab === 'api-keys' }"
        @click="selectTab('api-keys')">
        <span>API Keys</span>
      </div>
      <div
        v-if="!props.showStats"
        class="tab_item"
        :class="{ active: props.activeTab === 'history' }"
        @click="selectTab('history')">
        <span>{{ $t("pay.depositsHistory") }}</span>
      </div>
      <div
        class="tab_item"
        :class="{ active: props.activeTab === 'stats' }"
        @click="selectTab('stats')">
        <span>{{ $t("pay.stats") }}</span>
      </div>
      <div
        v-if="!props.showStats"
        class="tab_item"
        :class="{ active: props.activeTab === 'fees' }"
        @click="selectTab('fees')">
        <span>{{ $t("pay.tosFees") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  showStats?: boolean;
  activeTab?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showStats: false,
  activeTab: "history",
});

const router = useRouter();
const localePath = useLocalePath();
const emit = defineEmits<{
  "tab-changed": [tabName: string];
}>();

const selectTab = (tabName: string): void => {
  emit("tab-changed", tabName);
  // Меняем URL без перехода
  router.push(
    localePath(`/oracle-pay/${tabName === "api-keys" ? "" : tabName}`)
  );
};
</script>

<style lang="scss" scoped>
.pay_actions_tabs {
  padding: 0 12px;
}

.tabs_container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.tab_item {
  padding: 8px 10px;
  margin: 2px 0;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s linear;
  border-radius: 6px;
  position: relative;
  user-select: none;

  &:hover {
    color: white;
    background: #14131bd5;
  }

  &.active {
    color: white;
    background: #14131b;
  }

  span {
    display: block;
  }
}
</style>
