<template>
  <div class="p2p-orders-page">
    <div class="p2p-orders-page-header">
      <PageHeaderLeft title="Orders" :back-route="'/p2p'" :mobile-centered="true" />

      <div class="p2p-orders-page-header-center">
        <SearchInput />
      </div>

      <div></div>
    </div>

    <div class="p2p-orders-page-container">
      <!-- <P2PHome /> -->
      <div class="p2p-orders-page-container-header">
        <div class="p2p-orders-page-container-title"><span class="p2p-orders-page-container-title-customer">As
            Customer</span> As Exchanger</div>
        <P2PNavigation :activeNavigationItem="activeNavigationItem" @click="handleNavigationItemClick" />
        <P2PNavigationByStatus :activeNavigationItemByStatus="activeNavigationItemByStatus"
          @click="handleNavigationItemByStatusClick" />
      </div>

      <div>
        <P2PList :active-navigation-item="activeNavigationItem"
          :active-navigation-item-by-status="activeNavigationItemByStatus" />
      </div>
    </div>
  </div>
  <P2PFooterNavBar />
</template>

<script setup lang="ts">
// import P2PHome from "~/widgets/p2p/P2PHome/index.vue";
import SearchInput from '~/components/ui/SearchInput.vue';
import PageHeaderLeft from '~/components/ui/PageHeaderLeft.vue';
import P2PNavigation from "~/widgets/p2p/P2PNavigation/index.vue";
import P2PNavigationByStatus from "~/widgets/p2p/P2PNavigationByStatus/index.vue";
import P2PList from "~/widgets/p2p/P2PList/index.vue";
import P2PFooterNavBar from "~/widgets/p2p/P2PFooterNavBar/index.vue";
// Use localePath if needed
const localePath = useLocalePath();

// Define layout
definePageMeta({
  layout: "sidebar",
});

const activeNavigationItem = ref(1);
const activeNavigationItemByStatus = ref(1);

const handleNavigationItemClick = (item: number) => {
  activeNavigationItem.value = item;
}

const handleNavigationItemByStatusClick = (item: number) => {
  activeNavigationItemByStatus.value = item;
}
</script>

<style scoped>
.p2p-orders-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  /* width: 500px; */
  width: 100%;
  font-family: Roboto, sans-serif;

  .p2p-orders-page-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding: 0 8px;

    .p2p-orders-page-header-center {
      display: flex;
      justify-content: center;
    }
  }

  .p2p-orders-page-container {
    width: 500px;

    .p2p-orders-page-container-header {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .p2p-orders-page-container-title {
        font-size: 20px;
        font-weight: 400;

        .p2p-orders-page-container-title-customer {
          color: #8780CF;
        }
      }

    }
  }

  @media (max-width: 1023px) {
    .p2p-orders-page-header {
      padding: 0 16px;
      width: 100%;

      .p2p-orders-page-header-center {
        display: none;
      }
    }


    .p2p-orders-page-container {
      width: 100%;
      padding: 0 16px;
    }
  }
}
</style>
