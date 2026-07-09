<template>
  <div class="shop-header__wrapper">
    <div class="shop-profile">
      <div class="profile">
        <div class="shop-image">
          <img src="/svg/shop/icons/seller-profile.svg" alt="" />
        </div>
        <div class="shop-info">
          <div class="shop-name">Shop Name</div>
          <div class="shop-add-info">
            <div class="shop-date">
              <img src="/svg/shop/icons/profile-logo.svg" alt="profile" />
              <h6>Verified Since: March, 2025</h6>
            </div>
            <div class="shop-rating">
              <h6>4.5/5</h6>
              <img src="/svg/shop/icons/star.svg" alt="star" />
            </div>
          </div>
        </div>
      </div>
      <div class="shop-stats">
        <div class="stat">
          <img src="/svg/shop/icons/dollar-white.svg" alt="dollar" />
          <h6>100 sales</h6>
        </div>
        <div class="stat">
          <img src="/svg/shop/icons/cart.svg" alt="dollar" />
          <h6>100 sales</h6>
        </div>
      </div>
      <div class="shop-actions">
        <button v-if="$route.query.edit === 'true'">
          <img src="/svg/shop/icons/chat.svg" alt="chat" />
        </button>
        <button>
          <img src="/svg/shop/icons/forward-white.svg" alt="forward" />
        </button>
        <button v-if="$route.query.edit !== 'true'" class="edit">Edit</button>
      </div>
      <div class="shop-edit-button">
        <button>Edit</button>
      </div>
    </div>
    <div class="shop-category">
      <div class="shop-add-button">
        <button>Add Product +</button>
      </div>
      <div class="tab">
        <button class="active">Active</button>
        <button>Finished</button>
      </div>
      <div class="categories">
        <button v-for="(item, index) in 5" :key="index">Programming</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style lang="scss" scoped>
.shop-header__wrapper {
  width: 100%;

  .shop-profile {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding-bottom: 18px;
    border-bottom: 1px solid #2b2741;

    .profile {
      flex: 2;
      display: flex;
      align-items: flex-start;
      gap: 12px;

      .shop-image {
        width: 64px;
        height: 64px;

        img {
          width: 100%;
          object-fit: cover;
        }
      }

      .shop-info {
        .shop-name {
          color: white;
          font: 500 18px Roboto, sans-serif;
        }

        .shop-add-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 4px;

          .shop-date {
            margin-top: 8px;
            display: flex;
            align-items: center;
            gap: 8px;

            h6 {
              color: white;
              font: 400 14px Roboto, sans-serif;
            }
          }

          .shop-rating {
            margin-top: 4px;
            display: flex;
            align-items: center;
            gap: 4px;

            h6 {
              color: white;
              font: 500 14px Roboto, sans-serif;
            }
          }
        }
      }
    }

    .shop-stats {
      flex: 1;

      .stat {
        width: 100%;
        border-radius: 16px;
        background: #14131b;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        gap: 8px;

        img {
          width: 20px;
          height: 20px;
        }

        h6 {
          color: white;
          font: 400 14px Roboto, sans-serif;
        }

        &:nth-child(2) {
          margin-top: 8px;
        }
      }
    }

    .shop-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding-left: 12px;
      border-left: 1px solid #2b2741;

      button {
        padding: 4px;

        &.edit {
          padding: 10px 20px;
          background: #f64e2a;
          border-radius: 12px;
          color: white;
          font: 400 14px Roboto, sans-serif;
        }
      }
    }

    .shop-edit-button {
      width: 100%;
      display: none;

      button {
        width: 100%;
        border-radius: 12px;
        padding: 12px 0;
        background: #f64e2a;
        color: white;
        font: 400 14px Roboto, sans-serif;
      }
    }
  }

  .shop-category {
    margin-top: 16px;

    .shop-add-button {
      width: 100%;
      padding-bottom: 16px;
      display: none;

      button {
        width: 100%;
        border-radius: 12px;
        padding: 12px 0;
        background: #1e1d28;
        color: white;
        font: 400 14px Roboto, sans-serif;
      }
    }

    .tab {
      display: flex;
      align-items: center;
      gap: 10px;

      button {
        flex: 1;
        padding: 11px 0;
        background: #1b1a24;
        border-radius: 8px;
        color: white;
        font: 500 12px Roboto, sans-serif;

        &.active {
          background: #f64e2a;
        }
      }
    }

    .categories {
      margin-top: 16px;
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        padding: 8px 12px;
        background: #1b1a24;
        border-radius: 8px;
        color: white;
        font: 500 12px Roboto, sans-serif;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .shop-header__wrapper {
    padding: 0 16px;

    .shop-profile {
      flex-direction: column;
      gap: 16px;

      .profile {
        .shop-image {
          width: 48px;
          height: 48px;

          img {
            width: 100%;
          }
        }

        .shop-info {
          .shop-add-info {
            flex-direction: row;
            align-items: center;
            gap: 16px;
          }
        }
      }

      .shop-stats {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;

        .stat {
          flex: 2;
          padding: 12px 16px;
        }
      }

      .shop-actions {
        display: none;
      }

      .shop-edit-button {
        display: block;
      }
    }

    .shop-category {
      width: 100%;

      .shop-add-button {
        display: block;
      }

      .categories {
        width: 100%;
        overflow: auto;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
}
</style>
