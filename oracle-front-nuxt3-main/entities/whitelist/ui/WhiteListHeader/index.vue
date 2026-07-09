<template>
  <div class="white-list-header flex items-center gap-8 py-16">
    <TheInput
      image="search"
      :value="search"
      :placeholder="$t('whitelist.search.placeholder')"
      :is-read-only="false"
      :is-remove="false"
      class="w-full"
      @update:value="updateLink($event)" />
    <div
      class="choose_category_burger cursor-pointer"
      @click="toggleCategoryDialog">
      <img src="/icons/whitelist/burger.svg" alt="" />
    </div>
    <ChooseCategory
      :hide-choose-button="true"
      v-model:isDialogVisible="isCategoryDialogOpen"
      :values="values" />
  </div>
</template>
<script setup lang="ts">
import type { Category } from "@/entities/verification/data/categories";
import { categories } from "@/entities/verification/data/categories";
import ChooseCategory from "@/entities/verification/ui/VerificationForm/ChooseCategory.vue";
import TheInput from "~/components/ui/TheInput.vue";
import { ref } from "vue";

// Reactive state
const values: Category[] = [...categories];
const search = ref("");
const isCategoryDialogOpen = ref(false);

// Methods
const updateLink = (value: string) => {
  search.value = value;
};

const toggleCategoryDialog = () => {
  isCategoryDialogOpen.value = !isCategoryDialogOpen.value;
};
</script>
<style lang="scss">
.choose_category_burger {
  min-width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #2b2741;
  background: #181720;
  cursor: pointer;
}
.white-list-header .form-parent {
  width: 100%;
  height: 44px;
}
.white-list-header .form-parent .the-input {
  height: 100%;
}
</style>
