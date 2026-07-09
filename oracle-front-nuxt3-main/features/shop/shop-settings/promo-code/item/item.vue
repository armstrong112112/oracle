<template>
  <div class="promo-code-item" :class="variant">
    <div class="code__info">
      <h5>{{ promo }}</h5>
      <h6>{{ date }}</h6>
    </div>
    <div class="promo__action">
      <button v-if="variant === 'action'">
        <img src="/svg/shop/icons/close-red.svg" alt="close" />
      </button>
      <h6 v-if="variant === 'left'" v-show="activationLeft !== null">
        Activations left: {{ activationLeft }}
      </h6>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant: string;
  promo: string;
  date: string;
  activationLeft: number | null;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.promo-code-item {
  width: 100%;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #2b2741;

  &.left {
    align-items: flex-end;
  }

  &.action {
    align-items: center;
  }

  .code__info {
    h5 {
      color: #fff;
      font: 400 14px Roboto, sans-serif;
    }

    h6 {
      margin-top: 4px;
      color: #8780cf;
      font: 400 12px Roboto, sans-serif;
    }
  }

  .promo__action {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;

    button {
      padding: 5px;
    }

    h6 {
      color: #8780cf;
      font: 400 12px Roboto, sans-serif;
    }
  }
}
</style>
