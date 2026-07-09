<template>
  <div class="active-checks">
    <block-nav-back
      :to="localePath('/checks')"
      :text="$t('checks.activeChecks')" />
    <div class="active-checks__filter">
      <select-oracle :data="data" />
      <button class="sortby-btn" @click="isOpen = true">
        <SortByIcon />
      </button>
    </div>
    <ul class="active-checks__list">
      <li v-for="item in 5" :key="item" class="list-item border-gradient">
        <div class="left-blur"></div>
        <nuxt-link
          :to="localePath('/checks/check-creation/check-details')"
          class="list-item__container">
          <h2 class="card-title">{{ $t("checks.checkNumberActive") }}</h2>
          <p class="card-sum">9 LTC ≈ <span>($ 9,200.15)</span></p>
          <div class="list-item__in">
            <h3 class="title-small">{{ $t("checks.activationsLeft") }}</h3>
            <p class="list-item-in-text">
              0.75 BTC (<span>$ 152,910</span>) out of 1.5 BTC (<span
                >$ 152,910</span
              >) left
            </p>
          </div>
          <div class="card-bottom">
            <p class="item">{{ $t("checks.createdDate") }}</p>
            <p class="item">{{ $t("checks.activeUntil") }}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <SortByModal :is-open="isOpen" @close="isOpen = false" />
  </div>
</template>

<script setup lang="ts">
import SortByIcon from "~/assets/svg/sort-by.svg?component";
import SortByModal from "~/components/checks/sort-by-modal.vue";

// Use localePath if needed
const localePath = useLocalePath();

// Define layout
definePageMeta({
  layout: "mobile",
});

// Use i18n for translations in computed
const { t } = useI18n();

// Reactive state
const isOpen = ref(false);

const data = computed(() => [
  {
    id: 1,
    img: "/svg/checks/litecoin-ltc.svg",
    name: t("checks.ltc"),
    selected: false,
  },
  {
    id: 2,
    img: "/svg/checks/bitcoin.svg",
    name: t("checks.btc"),
    selected: false,
  },
  {
    id: 3,
    img: "/svg/tether-usdt.svg",
    name: t("checks.usdt"),
    selected: false,
  },
]);
</script>

<style lang="scss">
.active-checks {
  .block-nav-back {
    span {
      width: calc(100% - 84px);
      text-align: center;
    }
    .back-button {
      border: 1px solid #f64e2a;
      border-radius: 100%;
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.15);
      background: #0a090f;
    }
  }
  &__filter {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    position: relative;
    z-index: 3;
    .sortby-btn {
      cursor: pointer;
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .list-item {
      &::after {
        content: url("/svg/checks/receipt-text.svg");
        position: absolute;
        top: -1px;
        right: 0;
      }
      &__container {
        display: block;
        padding: 19px 16px;
        position: relative;
        z-index: 2;
        .card-title {
          margin-bottom: 12px;
          font-family: var(--second-family);
          font-weight: 700;
          font-size: 14px;
          line-height: 10px;
          color: #fff;
        }
        .card-sum {
          margin-bottom: 8px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 12px;
          color: #4f4ec1;
          line-height: 9px;
          span {
            color: #1b961f;
          }
        }
        .list-item__in {
          display: inline-block;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          border-radius: 6px;
          padding: 5px;
          margin-bottom: 10px;
          .title-small {
            margin-bottom: 5px;
            font-family: var(--third-family);
            font-weight: 400;
            font-size: 12px;
            color: #fff;
            line-height: 14px;
          }
          .list-item-in-text {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 10px;
            color: #fff;
            line-height: 12px;
            span {
              color: #1b961f;
            }
          }
        }
        .card-bottom {
          .item {
            font-family: var(--font-family);
            font-weight: 400;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.4);
            line-height: 7px;
            &:first-child {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
