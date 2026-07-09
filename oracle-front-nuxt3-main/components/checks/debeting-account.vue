<template>
  <div class="debeting-account">
    <block-nav-back :to="localePath('/checks')" text="Check Creation" />
    <ul class="coins-list">
      <li
        v-for="coin in coins"
        :key="coin.id"
        class="coin-item"
        @click="$emit('nextStep')"
      >
        <div class="coin-img">
          <img class="image" :src="coin.img" alt="" />
        </div>
        <div class="coin-body">
          <h3 class="account-coin-value">
            3,5 {{ coin.coinname }}
            <span> (≈ $ {{ coin.coinprice }}) </span>
          </h3>
          <div class="coin-account">
            {{ coin.coinname }} Account: ***{{ coin.account }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath()

const emit = defineEmits<{
  nextStep: []
}>()

const coins = [
  {
    id: 1,
    img: '/svg/checks/btc.svg',
    coinname: 'BTC',
    coinvalue: 3.5,
    coinprice: '357,091.15',
    account: 2235,
  },
  {
    id: 2,
    img: '/svg/checks/udt.svg',
    coinname: 'UDT',
    coinvalue: 3.5,
    coinprice: '357,091.15',
    account: 2235,
  },
  {
    id: 3,
    img: '/svg/checks/ltc.svg',
    coinname: 'LTC',
    coinvalue: 3.5,
    coinprice: '357,091.15',
    account: 2235,
  },
  {
    id: 4,
    img: '/svg/checks/eth.svg',
    coinname: 'ETH',
    coinvalue: 3.5,
    coinprice: '357,091.15',
    account: 2235,
  },
]
</script>
<style lang="scss">
@use '@/assets/styles/components/checks/debeting-account.scss' as *;
</style>
