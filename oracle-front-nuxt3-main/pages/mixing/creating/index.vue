<template>
  <div class="whitelist h-dvh notification relative p-0 mt-0">
    <PageHeader :title="t('mixing.newMixing')" :is-plus="false" />
    <MixingCreationContent />
  </div>
</template>

<script setup lang="ts">
import MixingCreationContent from "~/components/mixing/MixingCreationContent.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";

// Layout
definePageMeta({
  layout: "sidebar",
});

// Composables
const { t } = useI18n();
</script>

<style lang="scss">
.new_creating_card {
  background: #13121b;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 16px 16px;
  border-radius: 8px;
}
.new_creating_card_header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid #2d2b3b;
}
.new_creating_card_header_title {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.new_creating_card_header_description {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: #67639a;
}
.new_creating_card_body_header_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 125%;
  letter-spacing: 0;
  color: white;
  border: 0;
  width: 100%;
  outline: none;
  background: none;
}
.new_creating_card_body_header_title::placeholder {
  color: #7a74ba;
}
.new_creating_card_body_header_description {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: #67639a;
  text-transform: uppercase;
  width: 49px;
  height: 18px;
}
.new_creating_card_body_body_title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  color: #8383afcc;
}
.new_creating_card_body_body_title .decimal {
  font-size: 12px;
}
.choose_mixing_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: white;
}
.choose_mixing_cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 8px;
}

.choose_mixing_card-a {
  grid-column: 1;
  grid-row: 1;
}

.choose_mixing_card-b {
  grid-column: 2;
  grid-row: 1;
}

.choose_mixing_card-c {
  grid-column: 1 / span 2; /* spans both columns */
  grid-row: 2;
}

.choose_mixing_card {
  gap: 10px;
  border-radius: 8px;
  padding: 16px 8px;
  background: #13121b;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s linear;
  flex-direction: column;
  cursor: pointer;
}
.choose_mixing_card.active {
  background: #f64e2a;
}
.choose_mixing_card_title {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: white;
}
.choose_mixing_card_description {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: white;
}
.creating_tips_msg {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: white;
}
</style>
