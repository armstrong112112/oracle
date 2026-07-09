<template>
  <div ref="selectRef" class="coin-select">
    <button class="select-btn" :class="{ active: show }" @click="show = !show">
      <div class="left-block">
        <div class="coin-img">
          <img :src="'/svg/usdt.svg'" alt="" />
        </div>
        <div class="coin-info">
          <div class="coin-info-head">
            <h3 class="coin-name">{{ name }}</h3>
            <p class="coin-price">{{ price }} <span> ≈ $2499</span></p>
          </div>
        </div>
      </div>
      <div class="arrown-icon">
        <img :src="'/svg/arrow-back.svg'" alt="" />
      </div>
    </button>
    <div class="select-menu" :class="{ show: show }">
      <div
        v-for="(item, index) of 3"
        :key="index"
        class="menu-item"
        @click="show = !show"
      >
        <div class="coin-img">
          <img :src="'/svg/usdt.svg'" alt="" />
        </div>
        <div class="coin-info">
          <div class="coin-info-head">
            <h3 class="coin-name">{{ name }}</h3>
            <p class="coin-price">{{ price }} <span> ≈ $2499</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  img?: string
  name?: string
  price?: string
  amount?: string
}

withDefaults(defineProps<Props>(), {
  img: '',
  name: '',
  price: '',
  amount: '',
})

// Reactive state
const show = ref(false)
const selectRef = ref<HTMLElement | null>(null)

// Methods
const ClickOutside = (event: Event) => {
  const select = selectRef.value
  if (select && !select.contains(event.target as Node)) {
    show.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', ClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', ClickOutside)
})
</script>

<style lang="scss">
.coin-select {
  position: relative;
  z-index: 5;
  .select-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-bottom: 1px solid #2d2b3b;
    padding: 5px 0;
    cursor: pointer;
    transition: 0.2s;
    &.active {
      border-color: #f64e2a;
      .arrown-icon {
        img {
          transform: rotate(-270deg);
        }
      }
    }
    .left-block {
      display: flex;
      align-items: center;
      gap: 8px;
      .coin-img {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .coin-info {
        &-head {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 5px;
          .coin-name {
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 130%;
            text-align: left;
            color: #fff;
          }
          .coin-price {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            text-transform: uppercase;
            color: #67639a;
          }
        }
      }
    }
    .arrown-icon {
      width: 16px;
      img {
        filter: brightness(0) saturate(100%) invert(98%) sepia(1%)
          saturate(572%) hue-rotate(194deg) brightness(117%) contrast(100%);
        transform: rotate(-90deg);
        transition: 0.3s;
      }
    }
  }
  .select-menu {
    width: calc(100% + 32px);
    padding: 0 16px 3px;
    background: #13121b;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    border-radius: 0 0 8px 8px;
    position: absolute;
    top: calc(100% + 30px);
    left: -16px;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s;
    z-index: -1;
    &.show {
      top: calc(100%);
      visibility: visible;
      opacity: 1;
    }
    .menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 0;
      border-bottom: 1px solid #f64e2a;
      cursor: pointer;
      &:last-child {
        border: 0;
      }
      .coin-img {
        width: 28px;
        height: 28px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .coin-info {
        &-head {
          display: flex;
          flex-direction: column;
          gap: 5px;
          .coin-name {
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 13px;
            line-height: 130%;
            text-align: left;
            color: #fff;
          }
          .coin-price {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 13px;
            text-transform: uppercase;
            color: #67639a;
          }
        }
      }
    }
  }
}
</style>
