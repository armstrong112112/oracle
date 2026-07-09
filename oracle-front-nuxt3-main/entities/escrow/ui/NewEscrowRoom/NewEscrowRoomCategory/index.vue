<template>
  <div class="flex flex-col gap-10">
    <div class="category_title">{{ $t("escrow.whatIsYourDealAbout") }}</div>
    <ChooseCategory
      :is-escrow="true"
      placeholder="Select escrow category"
      :values="values" />
  </div>
</template>

<script setup lang="ts">
import {
  categories,
  type Category,
} from "@/entities/verification/data/categories";
import ChooseCategory from "@/entities/verification/ui/VerificationForm/ChooseCategory.vue";

// Reactive state
const values: Category[] = categories;
</script>

<style scoped>
.category_title {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
</style>
