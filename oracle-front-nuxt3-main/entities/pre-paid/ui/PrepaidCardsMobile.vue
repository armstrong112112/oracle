<template>
  <div
    class="whitelist notification h-dvh flex flex-col justify-between p-0 mt-0 gap-24">
    <div class="gap-24 flex flex-col">
      <div class="flex flex-col gap-12">
        <PageHeader
          :plus-link="localePath('/mixing/creating')"
          :title="$t('cards.title')" />
        <Stories class="prepaid_cards_swiper" />
      </div>
      <PrepaidCardSpendMoney />
      <PrePaidCardsList />
    </div>
    <div class="card-detail-footer py-16 flex flex-col gap-20">
      <CustomButton
        class="card-detail-footer-btn"
        :value="$t('cards.newCardCreation')" />
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Stories from "~/entities/oracle-pay/ui/stories/stories.vue";
import CustomButton from "~/components/ui/Button.vue";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import PrePaidCardsList from "~/widgets/prepaid-cards/PrePaidCardsList/index.vue";
import PrepaidCardSpendMoney from "~/widgets/prepaid-cards/PrepaidCardSpendMoney/index.vue";

// Composables
const localePath = useLocalePath();
const prepaidCardsStore = usePrepaidCardsStore();
</script>

<style lang="scss" scoped>
.prepaid_cards_swiper {
  margin-top: 0;
}
.card-detail-footer-btn {
  position: sticky;
  bottom: 20px;
  width: 100%;
  left: 0;
  right: 0;
}
</style>
