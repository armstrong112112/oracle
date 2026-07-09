<template>
  <div class="pay_actions_with_api_keys">
    <div class="desktop_layout">
      <!-- Левая часть с табами -->
      <div class="tabs_section">
        <PayActionsTabs
          :show-stats="showStats"
          :active-tab="activeTab"
          @tab-changed="handleTabChange" />
      </div>

      <!-- Вертикальная черта -->
      <div class="divider"></div>

      <!-- Правая часть с контентом -->
      <div class="content_section">
        <OraclePayApiKeys v-if="activeTab === 'api-keys'" />
        <PayHistoryContent v-else-if="activeTab === 'history'" />
        <PayStatsContent v-else-if="activeTab === 'stats'" />
        <PayFeesContent v-else-if="activeTab === 'fees'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PayActionsTabs from "~/entities/oracle-pay/ui/PayActionsTabs/index.vue";
import OraclePayApiKeys from "~/entities/oracle-pay/ui/PayApiKeys/OraclePayApiKeys.vue";
import PayFeesContent from "~/entities/oracle-pay/ui/PayFeesContent/index.vue";
import PayHistoryContent from "~/entities/oracle-pay/ui/PayHistoryContent/index.vue";
import PayStatsContent from "~/entities/oracle-pay/ui/PayStatsContent/index.vue";

const route = useRoute();
const showStats = ref(false);
const activeTab = ref("api-keys");

const handleTabChange = (tabName: string): void => {
  activeTab.value = tabName;
};

onMounted(() => {
  // Определяем активный таб на основе текущего URL
  const path = route.path;
  if (path.includes("/history")) {
    activeTab.value = "history";
  } else if (path.includes("/stats")) {
    activeTab.value = "stats";
  } else if (path.includes("/fees")) {
    activeTab.value = "fees";
  } else {
    activeTab.value = "api-keys";
  }
});
</script>

<style lang="scss" scoped>
.pay_actions_with_api_keys {
  width: 100%;
}

.desktop_layout {
  display: flex;
  min-height: 400px;
}

.tabs_section {
  max-width: 250px;
  flex-shrink: 0;
}

.divider {
  width: 1px;
  background: #2a2a2a;
  margin: 0 20px;
  flex-shrink: 0;
}

.content_section {
  padding-right: 20px;
  width: 100%;
}
</style>

<style>
.main-content {
  margin: 0 !important;
}
</style>
