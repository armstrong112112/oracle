<template>
  <div class="flex flex-col gap-24">
    <div class="form-row-parent">
      <TheInput
        placeholder="Header"
        :value="blackListStore.detailData.header"
        :is-remove="false"
        @update:value="onHeaderChange" />
    </div>

    <div class="form-row-parent">
      <div class="form-description">
        Context → What happened → Impact → What you expect
      </div>
      <TheInput
        placeholder="Write Here"
        :value="blackListStore.detailData.description"
        :is-remove="false"
        @update:value="onDescriptionChange" />
      <div class="max-length pl-8">
        {{ blackListStore.detailData.description.length || "" }} / 500
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheInput from "~/components/ui/TheInput.vue";
import { useBlackListStore } from "@/store/blackList";

const emit = defineEmits<{
  "validation-change": [isValid: boolean];
}>();

const blackListStore = useBlackListStore();

const onHeaderChange = (val: string) => {
  blackListStore.setDetailData({ header: val });
  emit("validation-change", blackListStore.isDetailValid);
};

const onDescriptionChange = (val: string) => {
  blackListStore.setDetailData({ description: val });
  emit("validation-change", blackListStore.isDetailValid);
};
</script>

<style scoped>
.form-row-parent {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
}
.info {
  cursor: pointer;
}
.form-description {
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0;
  color: #b2aaf9;
}
</style>
