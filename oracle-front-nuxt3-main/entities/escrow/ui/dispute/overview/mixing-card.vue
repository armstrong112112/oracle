<template>
  <div class="mixing_card">
    <div class="mixing_card_header flex items-center justify-between">
      <div class="flex flex-col gap-4">
        <div class="remaining-balance">{{ props.header.title }}</div>
        <div class="flex items-center gap-8">
          <img
            v-if="props.header.icon"
            :src="props.header.icon"
            style="width: 24px"
            alt="" />
          <div class="mixing_price">{{ props.header.amount || "0.00" }}</div>
          <div v-if="props.header.netAmount" class="mixing_equality">
            ≈ ${{ props.header.netAmount }}
          </div>
        </div>
      </div>
      <div v-if="props.header.buttons" class="flex flex-col gap-4">
        <div
          v-for="(button, index) in props.header.buttons"
          :key="index"
          :class="['add_btn', button.type]">
          {{ button.text }}
        </div>
      </div>
    </div>
    <div class="mixing_card_body flex flex-col">
      <div
        v-for="(row, index) in props.bodyRows"
        :key="index"
        class="mixing_card_body_row">
        <div class="mixing_card_body_row_left">{{ row.label }}</div>
        <div class="mixing_card_body_row_right">
          <template v-if="row.type === 'avatar'">
            <div class="escrow_creating_header">
              <img
                :src="(row.value as { avatar: string; name: string }).avatar"
                alt="" />
              <div class="escrow_creating_header_title">
                {{ (row.value as { avatar: string; name: string }).name }}
              </div>
            </div>
          </template>
          <template v-else>
            {{ row.value }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface HeaderData {
  title: string;
  icon?: string;
  amount?: string;
  netAmount?: string;
  buttons?: Array<{
    text: string;
    type?: "created" | "lost" | "resolved";
  }>;
}

interface BodyRow {
  label: string;
  value: string | { avatar: string; name: string };
  type?: "text" | "avatar";
}

interface Props {
  header: HeaderData;
  bodyRows?: BodyRow[];
}

const props = withDefaults(defineProps<Props>(), {
  bodyRows: () => [],
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/entities/escrow/dispute-overview.scss" as *;
</style>
