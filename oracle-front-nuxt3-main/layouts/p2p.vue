<template>
  <div>
    <div class="p2p-layout">
      <NuxtPage class="p2p-content" />
      <div class="p2p-footer">
        <P2PFooter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import P2PFooter from "~/widgets/p2p/P2PFooter.vue";
</script>

<style lang="scss" scoped>
.p2p-layout {
  height: 100vh;
}

.p2p-content {
  height: 100%;
  padding-bottom: 80px; // Отступ для фиксированного футера
  padding-left: 16px;
  padding-right: 16px;
}

.p2p-footer {
  position: fixed;
}
</style>
