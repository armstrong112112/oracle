<template>
  <div
    class="whitelist w-500 mt-0 flex flex-col gap-24 justify-between h-dvh relative">
    <div class="flex flex-col gap-24">
      <div class="flex flex-col gap-12">
        <PageHeader
          :plus-link="localePath('/mixing/creating')"
          :title="$t('cards.cardDetails')" />
      </div>
      <div class="py-16 flex items-center justify-center overflow-hidden">
        <PrepaidCard
          card-number="3778489339021234"
          card-holder-name="JOHN DOE"
          expiry-date="12/25"
          cvc="123"
          card-type="default" />
      </div>

      <div class="pre_paid_spend items-center justify-between flex py-16">
        <div class="flex flex-col gap-4">
          <div class="pre_paid_spend_title">
            {{ $t("cards.availableBalance") }}
          </div>
          <div
            class="pre_paid_spend_price_row flex items-end justify-start gap-8">
            <span>$</span>
            <span>621. 00</span>
            <div class="currency">USD</div>
          </div>
        </div>
      </div>
      <PrePaidCardActionsMenu class="py-16" />
      <div class="py-16">
        <PrePaidHistoryCard />
      </div>
    </div>
    <div class="card-detail-footer py-16 flex flex-col gap-24">
      <nuxt-link :to="localePath('/prepaid-cards/deposit')" class="w-full">
        <CustomButton
          :value="$t('cards.topUp')"
          type="primary"
          class="card-detail-footer-btn" />
      </nuxt-link>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import PrepaidCard from "~/components/ui/prepaid-card.vue";
import PageHeader from "~/widgets/notifications/pageHeader.vue";
import PrePaidCardActionsMenu from "~/widgets/prepaid-cards/PrePaidCardActionsMenu/index.vue";
import PrePaidHistoryCard from "~/widgets/prepaid-cards/PrePaidHistoryCard/index.vue";

// Layout
definePageMeta({
  layout: "sidebar",
});

// Composables

const localePath = useLocalePath();
</script>

<style lang="scss" scoped>
.pre_paid_spend_title {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}
.pre_paid_spend_price_row span {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 32px;
  line-height: 125%;
  letter-spacing: 0;
  color: white;
}
.pre_paid_spend_price_row .currency {
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
  padding-bottom: 8px;
}
.card-detail-footer-btn {
  position: sticky;
  bottom: 20px;
  width: 100%;
  left: 0;
  right: 0;
}
</style>
