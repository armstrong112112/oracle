<template>
  <div>
    <div class="sidebar-layout">
      <ShopSidebar />
      <div class="content">
        <HeaderOracle style="position: sticky; top: 0" />
        <div class="main-content-container">
          <div class="main-content">
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShopSidebar from "~/widgets/shop/sidebar/ui/index.vue";
</script>
<style lang="scss">
.sidebar-layout {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: #000;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-left: 220px;

    .main-content-container {
      flex: 1;
      display: flex;
    }

    .main-content {
      min-width: 800px;
      width: 100%;
      margin: 0 auto;
      /* padding: 20px; */
      padding-bottom: 0 !important;
    }
  }
}

@media screen and (max-width: 1024px) {
  .sidebar-layout {
    flex-direction: column;

    .content {
      margin-left: 0;

      .main-content {
        /* padding: 16px !important; */
        padding-bottom: 0 !important;
        min-width: 100% !important;
      }
    }
  }
}
</style>
