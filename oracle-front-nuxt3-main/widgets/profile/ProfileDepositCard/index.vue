<template>
  <div class="profile_deposit_card">
    <div class="profile_deposit_card_header">
      <div class="flex flex-col gap-8" @click.stop="$emit('clickDeposit')">
        <div class="profile_deposit_card_title">
          {{ $t("whitelist.profile.depositTitle") }}
        </div>
        <div class="profile_deposit_card_price">
          {{ mainPrice }} <span class="faded-decimal">{{ decimalPart }}</span>
        </div>
      </div>
      <div
        class="profile_deposit_card_plus"
        @click.stop="$emit('clickDepositMean')">
        <img src="/icons/profile/plus.svg" alt="" />
      </div>
    </div>
    <div class="profile_deposit_card_body">
      <nuxt-link
        :to="localePath('/whitelist/verdict')"
        class="text-decoration-none">
        <CustomButton
          :value="$t('whitelist.profile.checkVerificationVerdict')"
          type="secondary"
          class="w-full" />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CustomButton from "~/components/ui/Button.vue";

interface Props {
  price?: string;
}

const props = withDefaults(defineProps<Props>(), {
  price: "",
});

defineEmits<{
  (e: "clickDeposit"): void;
  (e: "clickDepositMean"): void;
}>();

const localePath = useLocalePath();

const mainPrice = computed((): string => {
  return props.price.split(".")[0]; // "$ 1092"
});

const decimalPart = computed((): string => {
  return props.price.includes(".") ? "." + props.price.split(".")[1] : "";
});
</script>

<style scoped>
.profile_deposit_card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 20px;
  background: #13121b;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: #2b2741;
}
.profile_deposit_card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profile_deposit_card_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: left;
  color: white;
}
.profile_deposit_card_price {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 125%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
.profile_deposit_card_plus {
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f64e2a;
  border-radius: 50%;
}
.profile_deposit_card_plus img {
  width: 18px;
  height: 18px;
}
.faded-decimal {
  opacity: 0.5;
}
</style>
