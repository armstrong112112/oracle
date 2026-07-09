<template>
  <div class="order-history-item__container">
    <div class="item-information">
      <div class="item-image">
        <img :src="image" alt="placeholder" />
      </div>
      <div class="item-description">
        <h5>{{ price }}</h5>
        <p>{{ title }}</p>
      </div>
    </div>
    <div class="item__action">
      <button>
        <img src="/svg/shop/icons/arrow-down.svg" alt="down" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  image: string;
  price: number;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.order-history-item__container {
  width: 100%;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #292929;
  gap: 12px;

  .item-information {
    flex: 2;
    display: flex;
    align-items: center;
    gap: 15px;

    .item-image {
      width: 50px;
      height: 53px;

      img {
        width: 100%;
      }
    }

    .item-description {
      padding: 9.5px 0;

      h5 {
        color: #fff;
        font: 500 14px Roboto, sans-serif;
        line-height: 1.3;
      }

      p {
        color: #bfb7ff;
        font: 400 12px Roboto, sans-serif;
        line-height: 1.35;
      }
    }
  }

  .item__action {
    button {
      padding: 4px;
    }
  }
}
</style>
