<template>
  <div class="flex items-start justify-between h-full relative">
    <div class="h-full flex flex-col items-center justify-center">
      <PrepaidCard card-number="3778489339021234" card-holder-name="JOHN DOE" expiry-date="12/25" cvc="123"
        card-type="oracle" />
    </div>

    <div class="flex flex-col prepaid-card-dashboard">
      <div class="your-transactions__head prepaid-card-dashboard-head">
        <nuxt-link to="#" class="your-transactions__link">
          Prepaid Cards
          <div class="icon">
            <ArrowIcon />
          </div>
        </nuxt-link>
      </div>
      <div class="score_body flex flex-col gap-12">
        <div class="card-menu">
          <div class="menu-item">
            <img src="/icons/prepaid-cards/withdraw.svg" alt="" />
            <span>Withdraw</span>
          </div>
          <div class="menu-item">
            <img src="/icons/prepaid-cards/history.svg" alt="" />
            <span>View History</span>
          </div>
          <div class="menu-item">
            <img src="/icons/prepaid-cards/up.svg" alt="" />
            <span>Transfer</span>
          </div>
          <div class="menu-item">
            <img src="/icons/prepaid-cards/down.svg" alt="" />
            <span>Top Up</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from "@/assets/svg/arrow-left.svg?component";
import PrepaidCard from "~/components/ui/prepaid-card.vue";

const localePath = useLocalePath();
</script>

<style scoped>
.prepaid-card-dashboard {
  background: #14131b;
  gap: 28px;
  padding-right: 0;
  padding-top: 14px;
  padding-bottom: 14px;
  height: 100%;

  position: absolute;
  max-width: 45%;
  right: 0;
  top: 0;
  z-index: 1;
}

.prepaid-card-dashboard-head {
  padding-right: 32px;
  padding-left: 16px;
}

.card-menu {
  padding-left: 8px;
}

.menu-item {
  padding: 8px 14px;
  border-bottom: 1px solid #2b2741;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: white;
}
</style>
