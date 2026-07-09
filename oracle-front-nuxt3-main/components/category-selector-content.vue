<template>
  <div class="category-selector-content">
    <div class="category-list">
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        class="category-item"
        @click="toggleCategorySelection(category)">
        <div class="category-item-name">
          {{
            $t(
              "verification.chooseCategoryDialog.titles." +
                slugify(category.title ?? "")
            )
          }}
        </div>

        <div class="category-item-select">
          <img
            v-if="!isCategorySelected(category)"
            src="/icons/verification/select.svg"
            alt="select" />
          <img v-else src="/icons/verification/selected.svg" alt="selected" />
        </div>
      </div>
    </div>
    <div class="category-footer">
      <CustomButton
        class="w-full"
        :value="$t('verification.chooseCategoryDialog.save')"
        @click="handleSave" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Category } from "~/entities/verification/data/categories";
import CustomButton from "~/components/ui/Button.vue";

// Props
interface Props {
  categories: Category[];
  selectedCategoryIds: (string | number)[];
  searchQuery?: string;
}

const props = withDefaults(defineProps<Props>(), {
  searchQuery: "",
});

// Emits
const emit = defineEmits<{
  "toggle-category": [category: Category];
  save: [];
}>();

// Computed
const filteredCategories = computed(() => {
  return props.categories.filter((category) =>
    category.title?.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});

// Methods
const toggleCategorySelection = (category: Category) => {
  emit("toggle-category", category);
};

const handleSave = () => {
  emit("save");
};

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[\s/]+/g, "_")
    .trim();
};

const isCategorySelected = (category: Category): boolean => {
  return props.selectedCategoryIds.includes(category.id);
};
</script>

<style lang="scss" scoped>
.category-selector-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.category-list {
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #2b2741;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1b1a24;
  }

  &:last-child {
    border-bottom: none;
  }
}

.category-item-name {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #ffffff;
}

.category-item-select {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  img {
    width: 20px;
    height: 20px;
  }
}

.category-footer {
  padding: 16px 0 0;
  border-top: 1px solid #2b2741;
  margin-top: 16px;
}
</style>
