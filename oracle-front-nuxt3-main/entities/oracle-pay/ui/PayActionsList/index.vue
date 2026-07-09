<template>
  <div class="pay_actions_list">
    <nuxt-link
      v-if="!showStats"
      :to="localePath('/oracle-pay/history')"
      class="pay_action">
      <span> {{ $t("pay.depositsHistory") }} </span>
      <img src="/assets/svg/arrow-right.svg" alt="" />
    </nuxt-link>
    <nuxt-link :to="localePath('/oracle-pay/stats')" class="pay_action">
      <span> {{ $t("pay.stats") }}</span>
      <img src="/assets/svg/arrow-right.svg" alt="" />
    </nuxt-link>
    <nuxt-link
      v-if="!showStats"
      :to="localePath('/oracle-pay/fees')"
      class="pay_action">
      <span> {{ $t("pay.tosFees") }}</span>
      <img src="/assets/svg/arrow-right.svg" alt="" />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

withDefaults(
  defineProps<{
    showStats?: boolean;
  }>(),
  {
    showStats: false,
  }
);
</script>

<style lang="scss">
.pay_actions_list {
  gap: 8px;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
}
.pay_action {
  gap: 8px;
  border-radius: 12px;
  padding: 10px 6px 10px 12px;
  background: #13121b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s linear;
  text-transform: initial !important;
}
.pay_action:hover {
  background: #3f3f46;
}
</style>
