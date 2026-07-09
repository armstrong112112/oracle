<template>
  <div class="your-transactions">
    <div class="your-transactions__head">
      <nuxt-link to="#" class="your-transactions__link">
        {{ $t('dashboard.yourTransactions') }}
        <div class="icon">
          <ArrowIcon />
        </div>
      </nuxt-link>
    </div>
    <div class="your-transactions__card">
      <div class="card-item card-expenses">
        <h4 class="transaction-title">{{ $t('dashboard.yourExpensesMTD') }}</h4>
        <h2 class="transaction-amount">$10,000</h2>
      </div>
      <div class="card-item card-deposit">
        <h4 class="transaction-title">{{ $t('dashboard.yourDepositsMTD') }}</h4>
        <h2 class="transaction-amount">$9,500</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from '@/assets/svg/arrow-left.svg?component'

const localePath = useLocalePath()
</script>

<style lang="scss">
.your-transactions {
  &__head {
    margin-bottom: 12px;
    padding: 4px 0;

    .your-transactions__link {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Hector', sans-serif;
      font-weight: 400;
      font-size: 20px;
      letter-spacing: 0.05em;
      color: #fff;
    }
  }

  &__card {
    display: flex;
    gap: 4px;

    .card-item {
      flex: 1 1 50%;
      border-radius: 10px;
      padding: 20px 0px 26px;
      position: relative;
      overflow: hidden;

      &.card-expenses {
        background: linear-gradient(180deg,
            rgba(29, 144, 25, 0) 0%,
            rgba(49, 246, 42, 0.25) 100%);

        &::after {
          content: '';
          width: 37px;
          height: 44px;
          background: url('/svg/transaction-up.svg') no-repeat center/contain;
          position: absolute;
          left: 8px;
          bottom: -4px;
          opacity: 0.3;
        }

        &::before {
          content: '';
          width: 37px;
          height: 44px;
          background: url('/svg/transaction-up.svg') no-repeat center/contain;
          position: absolute;
          right: 8px;
          bottom: -15px;
          opacity: 0.3;
        }
      }

      &.card-deposit {
        background: linear-gradient(180deg,
            rgba(144, 46, 25, 0) 0%,
            rgba(144, 46, 25, 0.6) 100%);

        &::after {
          content: '';
          width: 37px;
          height: 44px;
          transform: rotate(180deg);
          background: url('/svg/transaction-up.svg') no-repeat center/contain;
          position: absolute;
          left: 12px;
          bottom: -13px;
          opacity: 0.3;
        }

        &::before {
          content: '';
          width: 37px;
          height: 44px;
          transform: rotate(180deg);
          background: url('/svg/transaction-up.svg') no-repeat center/contain;
          position: absolute;
          right: 8px;
          bottom: -4px;
          opacity: 0.3;
        }
      }

      .transaction-title {
        margin-bottom: 10px;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 10px;
        line-height: 130%;
        text-align: center;
        color: #fff;
      }

      .transaction-amount {
        font-family: 'Hector', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 120%;
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>
