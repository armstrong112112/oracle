<template>
  <div class="flex flex-col gap-12 py-8 py-16">
    <div class="bills_created_header">
      <div class="bills_created_header_col">
        <div class="bills_created_header_col_title">{{ $t("bills.id") }}</div>
        <div class="bills_created_header_col_description">#9329103213</div>
      </div>
      <div class="bills_created_header_col">
        <div class="bills_created_header_col_title">
          {{ $t("bills.creationDate") }}
        </div>
        <div class="bills_created_header_col_description">May 20, 2025</div>
      </div>
      <div class="bills_created_header_col">
        <div class="bills_created_header_col_title">
          {{ $t("bills.dueDate") }}
        </div>
        <div class="bills_created_header_col_description">May 24, 2025</div>
      </div>
    </div>
    <div class="bills_created_body">
      <div class="bills_created_body_title">
        {{ $t("bills.loremDescription") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style scoped lang="scss">
.bills_created_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
.bills_created_header_col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.bills_created_header_col_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: #b2aaf9;
}
.bills_created_header_col_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}
.bills_created_body_title {
  font-family: Inter;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}
</style>
