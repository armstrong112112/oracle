<template>
  <div class="modal-seed">
    <h3 class="modal-seed-title">your seed</h3>
    <div class="modal-seed-text">
      Come up with your own <span>seed phrase</span>, without it you will
      <span>not be able to log in</span> to your account.
    </div>
    <CheckboxOracle
      class="modal-seed-checkbox"
      text="I have read this message and agree to these terms."
    />
    <ButtonOracle
      class="modal-seed-button"
      text="Continue"
      color="orange"
      @click="handler"
    />
  </div>
</template>
<script setup lang="ts">
import ButtonOracle from '@/components/button-oracle.vue'
import CheckboxOracle from '@/components/checkbox-oracle.vue'

interface Props {
  handler: Function
}

defineProps<Props>()
</script>
<style lang="scss">
.modal-seed {
  position: relative;
  width: 327px;
  height: 267px;
  left: calc(50% - 327px / 2);
  top: -184px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #1e1d26;
  border-radius: 12px;

  &-title {
    height: 21px;
    font-family: 'Hanson';
    font-style: normal;
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }

  &-text {
    width: 257px;
    font-family: 'Reza Zulmi Alfaizi Sans';
    font-style: normal;
    font-size: 16px;
    line-height: 21px;
    text-align: center;

    color: #ffffff;

    span {
      color: #f64e2a;
    }
  }

  &-button {
    width: 287px;
    position: absolute;
    bottom: 20px;
  }

  &-checkbox {
    margin-top: 17px;
  }
}
</style>
