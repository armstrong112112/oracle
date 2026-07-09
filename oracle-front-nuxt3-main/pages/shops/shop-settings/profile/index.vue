<template>
  <div class="profile-page__wrapper">
    <Header />
    <ShopSettingsLayout>
      <HeaderMobile page-title="Shop Info" with-page-title />
      <div class="profile-page">
        <div class="profile__container">
          <div class="profile-photo">
            <div class="image__container">
              <img src="/svg/shop/images/image.png" alt="image" />
            </div>
            <input type="file" name="profile" id="profile" />
            <button>Set New Photo</button>
          </div>
          <div class="profile-full-name">
            <Input
              label="Shop name"
              title="Shop name"
              type="text"
              placeholder="Enter"
              for-who="shop-name" />
          </div>
          <div class="profile-bio">
            <Input
              label="Bio"
              title="Bio"
              type="text"
              placeholder="Bio"
              for-who="bio" />
            <h6>0/100</h6>
          </div>
        </div>
      </div>
    </ShopSettingsLayout>
  </div>
</template>

<script setup lang="ts">
import Input from "~/components/ui/shops/utils/input.vue";
import Header from "~/widgets/shop/header/index.vue";
import HeaderMobile from "~/widgets/shop/header/mobile.vue";
import ShopSettingsLayout from "~/widgets/shop/layouts/settings/index.vue";

definePageMeta({
  layout: "sidebar",
});
</script>

<style lang="scss">
.profile-page__wrapper {
  .shop-header-mobile {
    display: none;
  }

  .profile-page {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .profile__container {
      width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .profile-photo {
        width: 100%;
        padding: 8px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .image__container {
          width: 80px;
          height: 80px;
          border-radius: 100px;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        input {
          display: none;
        }

        button {
          padding: 6.5px 0;
          color: #f64e2a;
          font: 400 16px Roboto, sans-serif;
        }
      }

      .profile-full-name {
        width: 100%;

        .input__label {
          padding: 0 16px;
        }
      }

      .profile-bio {
        width: 100%;

        h6 {
          margin-top: 8px;
          color: #fff;
          font: 400 12px Roboto, sans-serif;
        }

        .input__label {
          margin: 0 16px;
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .profile-page {
    .profile__container {
      width: 100%;
    }
  }
}

@media screen and (max-width: 750px) {
  .profile-page__wrapper {
    .shop-header-container {
      display: none;
    }

    .shop-header-mobile {
      display: block;
    }
  }
  .profile-page {
    .profile__container {
      padding: 16px;
    }
  }
}
</style>
