<template>
  <div class="add-contact__page">
    <div class="main-container">
      <block-nav-back
        :to="localePath('/transfer/internal-transfer')"
        :text="$t('transfers.addContacts')"
      />
      <input-oracle :search="true" :placeholder="$t('transfers.search')" />
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>

<style lang="scss">
.add-contact__page {
  .block-nav-back {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    text-align: center;
    color: #fff;
    text-transform: capitalize;
    .back-button {
      svg {
        path {
          stroke: #fff;
        }
      }
    }
    span {
      display: block;
      width: calc(100% - 26px);
      font-family: 'Inter', sans-serif;
    }
  }
  .input {
    .input-search {
      path {
        stroke: #7a74ba;
      }
    }
    input {
      height: 44px;
      border-radius: 12px;
      padding: 13px 14px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
      &::placeholder {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #67639a;
      }
    }
  }
}
</style>
