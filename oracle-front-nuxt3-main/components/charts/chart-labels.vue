<template>
  <div class="chart-labels__wrapper">
    <!-- <h2 class="chart-labels__title">{{ title }}</h2> -->
    <ul class="chart-label__list">
      <li
        v-for="item in data"
        :key="item.id"
        class="chart-label"
        @click="item.to ? $router.push(localePath(item.to)) : null"
      >
        <span class="chart-label__type" :class="item.color"></span>
        <div class="chart-label__body">
          <div class="left-block">
            <p class="chart-label__title">{{ item.name }}</p>
            <p class="chart-label__percent">24.5%</p>
          </div>
          <p class="chart-label__price">
            {{ item.price }}
          </p>
        </div>
        <!-- <div ref="coinAmount" class="coin-amount">
          <div class="amount-item amount-btc">
            <span></span>
            1,814 BTC
          </div>
          <div class="amount-item amount-usdt">
            <span></span>
            100 USDT
          </div>
          <div class="amount-item amount-eth">
            <span></span>
            5 ETH
          </div>
          <div class="amount-item amount-ltc">
            <span></span>
            2 LTC
          </div>
        </div> -->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

interface Labels {
  id: number
  to: string
  name: string
  price: string
  color: string
}

interface Props {
  title?: string
  step?: number | null
  data?: Labels[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  step: null,
  data: () => [],
})

const emit = defineEmits<{
  'item-selected': [name: string]
}>()

const getStep = props.step

const selectItem = (name: string) => {
  emit('item-selected', name)
}
</script>

<style lang="scss">
.chart-labels__wrapper {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 24px;
  // .chart-labels__title {
  //   margin-bottom: 14px;
  //   font-family: 'Roboto', sans-serif;
  //   font-weight: 700;
  //   font-size: 16px;
  //   text-align: center;
  //   text-transform: uppercase;
  //   color: rgba(255, 255, 255, 0.3);
  // }
  .chart-label__list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow-x: auto;
    overflow-y: hidden;
    .chart-label {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1px solid #2b2741;
      border-radius: 12px;
      padding: 12px;
      position: relative;
      cursor: pointer;
      z-index: 0;
      &:hover {
        z-index: 3;
        .coin-amount {
          opacity: 1;
          visibility: visible;
          right: -6px;
        }
      }

      &__type {
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        &.color-escrow {
          background: #f6c32a;
        }

        &.color-p2p {
          background: #f64e2a;
        }
        &.color-swap {
          background: #902af6;
        }
        &.color-transfers {
          background: #2af653;
        }
        &.color-prepaid {
          background: #2a67f6;
        }
        &.color-bills {
          background: #2af6f6;
        }
        &.color-fees {
          background: #f69e2a;
        }
        &.color-fees {
          background: #f69e2a;
        }
        &.color-mixing {
          background: #f62a2a;
        }
        &.color-shops {
          background: #aff62a;
        }
        &.color-oracle-pay {
          background: #f62ad4;
        }
        &.color-checks {
          background: #10f;
        }
      }
      &__body {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        .chart-label__title {
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 135%;
          color: #fff;
        }
        .chart-label__percent {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 135%;
          color: #7a74ba;
        }
        .chart-label__price {
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 135%;
          color: #fff;
        }
      }
      .coin-amount {
        width: 136px;
        padding: 12px 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22136%22%20height%3D%22116%22%20viewBox%3D%220%200%20136%20116%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M10%208C10%203.58172%2013.5817%200%2018%200H128C132.418%200%20136%203.58172%20136%208V108C136%20112.418%20132.418%20116%20128%20116H18C13.5817%20116%2010%20112.418%2010%20108V70.5629C10%2068.295%209.03743%2066.1337%207.35172%2064.6165L0%2058L7.35172%2051.3835C9.03743%2049.8663%2010%2047.705%2010%2045.4371V8Z%22%20fill%3D%22%23262431%22%20/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        visibility: hidden;
        opacity: 0;
        transition:
          right 0.4s,
          opacity 0.1s;
        z-index: 5;
        .amount-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #fff;
          &.amount-btc {
            span {
              background: #f6c32a;
            }
          }
          &.amount-usdt {
            span {
              background: #f64e2a;
            }
          }
          &.amount-eth {
            span {
              background: #2af653;
            }
          }
          &.amount-ltc {
            span {
              background: #902af6;
            }
          }
          span {
            display: block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
