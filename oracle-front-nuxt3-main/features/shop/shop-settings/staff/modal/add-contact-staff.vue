<template>
  <div class="add-contact-modal__wrapper">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Add Contacts</h2>
        <button @click="CloseModal">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="modal-search__container">
        <div class="modal-search-bar" @click="search_func">
          <button>
            <img src="/svg/shop/icons/search.svg" alt="search" />
          </button>
          <input type="text" placeholder="Search" />
          <button v-if="search_bar">
            <img src="/svg/shop/icons/close.svg" alt="search" />
          </button>
        </div>
        <button v-if="search_bar">Cancel</button>
      </div>
      <div class="modal-content">
        <div class="contact-staff-items" v-if="search_bar">
          <ContactStaff
            v-for="item in staff"
            :key="item.id"
            :user-id="item.id"
            :name="item.name"
            :nickname="item.nickname"
            @onClick="AddContactAction"
            action />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactStaff from "~/features/shop/shop-settings/staff/item/contact-staff.vue";
import { Staff } from "~/shared/constants/shops";
import type { StaffType } from "~/shared/types/shops";

const router = useRouter();

const staff = ref<StaffType[]>(Staff);
const search_bar = ref<boolean>(false);

const search_func = (): void => {
  search_bar.value = !search_bar.value;
};

const AddContactAction = (): void => {
  router.push("/shops/shop-settings/staff?create_employee=step-2");
};

const CloseModal = (): void => {
  router.push("/shops/shop-settings/staff");
};
</script>

<style lang="scss">
.add-contact-modal__wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
  background-color: rgba($color: #000000, $alpha: 0.8);
  user-select: none;

  .modal-container {
    width: 500px;
    height: 535px;
    padding: 20px 8px 20px 24px;
    border-radius: 30px;
    background-color: #14131b;

    .modal-header {
      width: 100%;
      padding-right: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: #fff;
        font: 500 20px Roboto, sans-serif;
      }
    }

    .modal-search__container {
      width: 100%;
      margin-top: 12px;
      padding-right: 16px;
      display: flex;
      align-items: center;
      gap: 12px;

      .modal-search-bar {
        height: 44px;
        flex: 2;
        display: flex;
        align-items: center;
        padding: 13px 14px;
        border-radius: 12px;
        background: #1b1a24;
        gap: 8px;

        input {
          width: 100%;
          background-color: transparent;
          border: none;
          color: white;
          font: 400 14px Roboto, sans-serif;

          &:focus {
            outline: transparent;
          }

          &::placeholder {
            font-family: Roboto, sans-serif;
            font-size: 14px;
            color: #67639a;
          }
        }
      }

      button {
        color: white;
        font: 400 14px Roboto, sans-serif;
      }
    }

    .modal-content {
      width: 100%;
      height: calc(100% - 88px);
      margin-top: 12px;
      padding: 0 5px 0 0;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #343243;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #343243;
      }

      .contact-staff-items {
        margin-top: 24px;

        .contact__wrapper {
          border-bottom: 1px solid #2b2741;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .add-contact-modal__wrapper {
    .modal-container {
      width: 100%;
      height: 100%;
      border-radius: 0;
      background: #000;
      padding: 12px 5px 24px 12px;

      .modal-header {
        flex-direction: row-reverse;

        h2 {
          flex: 1;
        }

        button {
          flex: 0.75;
          display: flex;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
