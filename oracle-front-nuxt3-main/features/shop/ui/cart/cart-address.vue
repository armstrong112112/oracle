<template>
  <div class="cart-address__container">
    <div class="address-checkbox-info">
      <div class="address__checkbox">
        <input id="address-checkbox" type="checkbox" name="address-checkbox" />
      </div>
      <img src="/svg/shop/images/litecoin.svg" alt="litecoin" />
      <div class="coin-summary">
        <h2>Litecoin</h2>
        <h4>***2343</h4>
      </div>
    </div>
    <div class="address__summary">
      <h2>0,0244 TON</h2>
      <h4>≈ 100.234$</h4>
    </div>
  </div>
</template>
<script setup lang="ts">
// Component with no props or logic
</script>
<style lang="scss" scoped>
.cart-address__container {
  width: 100%;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .address-checkbox-info {
    display: flex;
    align-items: center;
    gap: 8px;
    .address__checkbox {
      width: 24px;
      height: 24px;
      margin-right: 4px;
      border: 1px solid #707070;
      position: relative;
      border-radius: 30px;

      input[type="checkbox"] {
        width: 100%;
        height: 100%;
        clip-path: circle(46% at 50% 50%);
        appearance: none;
        -webkit-appearance: none;
        border: transparent;
        background-color: transparent;
        cursor: pointer;
        &:checked {
          background-color: #f64e2a;
          &::after {
            content: url("data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1.76465%207.54243L5.06712%2010.7671C5.15862%2010.8564%205.30932%2010.8381%205.37677%2010.7294L10.9411%201.76465%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E");
            display: block;
            position: absolute;
            top: 5px;
            left: 5px;
            pointer-events: none;
          }
        }
      }
    }
    .coin-summary {
      text-align: start;
      h2 {
        color: white;
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 14px;
      }
      h4 {
        color: #8780cf;
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 12px;
      }
    }
  }
  .address__summary {
    text-align: end;
    h2 {
      color: white;
      font-family: Roboto, sans-serif;
      font-weight: 500;
      font-size: 14px;
    }
    h4 {
      color: #8780cf;
      font-family: Roboto, sans-serif;
      font-weight: 500;
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 750px) {
  .cart-address__container {
    padding: 10px 16px;
    border-bottom: 1px solid #28283a;
  }
}
</style>
