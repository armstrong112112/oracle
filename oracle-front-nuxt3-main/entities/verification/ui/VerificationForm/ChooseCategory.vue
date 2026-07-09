<template>
  <div class="choose-category">
    <div
      v-if="!hideChooseButton"
      class="the-choose cursor-pointer"
      @click="toggleDialog">
      <div class="choose">
        {{ selectedItems.length ? selectedText : resolvedPlaceholder }}
      </div>
      <img src="/icons/verification/down.svg" alt="down" />
    </div>

    <div
      v-if="selectedItems.length && !hideChooseButton"
      class="selected_categories">
      <div
        v-for="(item, idx) in selectedItems"
        :key="idx"
        class="selected_category">
        {{ item.title }}
      </div>
    </div>

    <!-- Mobile modal (old style) -->
    <transition name="slide-left" appear>
      <div
        v-if="isDialogVisibleInternal && isMobile"
        ref="dialogOverlay"
        class="dialog-overlay"
        tabindex="0"
        @keydown.esc="closeDialog">
        <div
          class="dialog-overlay category_overlay"
          @click.stop="closeDialog"></div>
        <div class="dialog category_dialog">
          <div class="dialog_drag_icon" @click="closeDialog"></div>
          <div v-if="showTitle" class="dialog_header">
            <div class="category_header_title">{{ resolvedTitle }}</div>
          </div>
          <div class="dialog_body">
            <CategorySelectorContent
              :categories="resolvedValues"
              :selected-category-ids="selectedIds"
              :search-query="searchQuery"
              @toggle-category="toggleSelection"
              @save="closeDialog" />
          </div>
        </div>
      </div>
    </transition>

    <BillsModal
      :is-open="isDialogVisibleInternal && !isMobile"
      :title="showTitle ? resolvedTitle : resolvedPlaceholder"
      :max-width="'600px'"
      @close="closeDialog">
      <CategorySelectorContent
        :categories="resolvedValues"
        :selected-category-ids="selectedIds"
        :search-query="searchQuery"
        @toggle-category="toggleSelection"
        @save="closeDialog" />
    </BillsModal>
  </div>
</template>

<script setup lang="ts">
import BillsModal from "@/components/bills-modal.vue";
import CategorySelectorContent from "@/components/category-selector-content.vue";
import type { Category } from "@/entities/verification/data/categories";
import { useEscrowStore } from "@/store/escrow";
import { useVerificationStore } from "@/store/verification";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

interface Props {
  values?: Category[];
  placeholder?: string;
  multiSelect?: boolean;
  showTitle?: boolean;
  titleKey?: string;
  title?: string;
  hideChooseButton?: boolean;
  isEscrow?: boolean;
  isDialogVisible?: boolean;
}

type CategoryValueItem = Category & {
  [key: string]: string | number | undefined;
};

const props = withDefaults(defineProps<Props>(), {
  values: () => [],
  placeholder: "Select option",
  multiSelect: true,
  showTitle: true,
  titleKey: "title",
  title: "Choose category",
  hideChooseButton: false,
  isEscrow: false,
  isDialogVisible: false,
});

const emit = defineEmits<{
  (e: "update:isDialogVisible", value: boolean): void;
  (e: "update:categories", value: Category[]): void;
}>();

// Pinia stores
const escrowStore = useEscrowStore();
const verificationStore = useVerificationStore();

// State
const isDialogVisibleInternal = ref(false);
const selectedIds = ref<(string | number)[]>([]);
const searchQuery = ref("");
const windowWidth = ref(0);

// Computed
const isMobile = computed(() => windowWidth.value < 1024);
const resolvedValues = computed<Category[]>(() => props.values ?? []);
const resolvedPlaceholder = computed(() => props.placeholder ?? "Select option");
const resolvedTitle = computed(() => props.title ?? "Choose category");

const selectedItems = computed((): Category[] => {
  return resolvedValues.value
    .filter((v) => selectedIds.value.includes(v.id))
    .map((v) => ({
      id: Number(v.id),
      title: v.title ?? "",
      price: v.price,
    }));
});

const getDisplayValue = (item: CategoryValueItem, key: string) => {
  const value = item[key];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
};

const selectedText = computed(() => {
  if (!selectedItems.value.length) return resolvedPlaceholder.value;
  if (props.multiSelect) {
    return selectedItems.value.map((item) => getDisplayValue(item as CategoryValueItem, props.titleKey)).join(", ");
  }

  const selectedItem = selectedItems.value[0];
  if (!selectedItem) return resolvedPlaceholder.value;
  return getDisplayValue(selectedItem as CategoryValueItem, props.titleKey);
});

// Methods
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const toggleDialog = () => {
  isDialogVisibleInternal.value = !isDialogVisibleInternal.value;
  emit("update:isDialogVisible", isDialogVisibleInternal.value);
};

const closeDialog = () => {
  isDialogVisibleInternal.value = false;
  emit("update:isDialogVisible", false);

  if (props.isEscrow) {
    escrowStore.setEscrow({
      categories: selectedItems.value.map((c) => ({
        id: c.id,
        title: c.title ?? "",
      })),
    });
  } else {
    verificationStore.setVerificationData({
      category: selectedItems.value,
      isProcessed: false,
    });
  }

  emit("update:categories", selectedItems.value);
  searchQuery.value = "";
};

const toggleSelection = (option: Category) => {
  if (props.multiSelect) {
    const idx = selectedIds.value.indexOf(option.id);
    if (idx > -1) selectedIds.value.splice(idx, 1);
    else selectedIds.value.push(option.id);
  } else {
    selectedIds.value = [option.id];
  }
};

// Watchers
watch(
  () => props.isDialogVisible,
  (val) => {
    isDialogVisibleInternal.value = val;
  }
);

// Lifecycle
onMounted(() => {
  if (props.isEscrow) {
    const storedCategories = escrowStore.profile.categories || [];
    selectedIds.value = storedCategories.map((c: { id: number | string }) => Number(c.id));
  } else {
    // Load from verification store
    const storedCategories = verificationStore.verificationData.category || [];
    selectedIds.value = storedCategories
      .filter((c: { id: number | string }) => c.id !== 0 && c.id !== 141)
      .map((c: { id: number | string }) => Number(c.id));
  }

  isDialogVisibleInternal.value = props.isDialogVisible;

  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss">
@use "@/assets/styles/entities/verification/choose-category.scss" as *;
</style>
