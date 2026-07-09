<template>
  <div class="flex flex-col gap-24 pb-40">
    <div class="flex flex-col gap-4">
      <div class="overview_description_card flex flex-col gap-12">
        <div class="escrow_overview_title">History of a Deal</div>
      </div>
      <div class="flex items-center flex-col w-full">
        <div
          v-for="item in 8"
          :key="item"
          class="flex items-center justify-between deal_list_item w-full"
        >
          <div class="deal_title">Deal Title</div>
          <div class="deal_date">March 10, 2025 at 12:23</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script logic required; presentational component
</script>

<style lang="scss" scoped>
.escrow_overview_title {
  font-family: Roboto;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.deal_list_item {
  border-bottom: 1px solid #2b2741;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.deal_title {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.deal_date {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #7a74ba;
}
</style>
