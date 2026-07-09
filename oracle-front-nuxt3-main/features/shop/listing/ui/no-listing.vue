<template>
  <div class="no-listing__container">
    <div class="no-listing-image">
      <img src="/svg/shop/images/empty-order.png" alt="order" />
    </div>
    <h2>There are no listings yet</h2>
    <h3>But it's easy to fix — place your first listing</h3>
    <div class="no-listing-actions">
      <nuxt-link to="/shops/listing?new-listing=1">
        <button>Create a Listing</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.no-listing__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .no-listing-image {
    margin: 100px 0;
  }

  h2 {
    margin-top: 24px;
    color: white;
    font: 400 20px Hector, sans-serif;
  }

  h3 {
    margin-top: 8px;
    color: #8780cf;
    font: 400 14px Roboto, sans-serif;
  }

  .no-listing-actions {
    margin-top: 32px;
    width: 300px;

    button {
      width: 100%;
      padding: 10px 0;
      border-radius: 14px;
      background-color: #f64e2a;
      color: white;
      font: 400 14px Roboto, sans-serif;
    }
  }
}

@media screen and (max-width: 550px) {
  .no-listing__container {
    .no-listing-actions {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 10px 16px 24px 16px;
    }
  }
}
</style>
