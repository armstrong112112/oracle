<template>
  <div class="create-staff-modal__wrapper">
    <div
      class="modal-container"
      :class="{ active: this.$route.query.create_employee === 'step-2' }">
      <div class="modal-header">
        <h2>Contacts</h2>
        <button @click="CloseModal">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="modal-content">
        <div
          class="create-step-1"
          v-if="this.$route.query.create_employee === 'step-1'">
          <div class="no-contact">
            <h2>No Contacts Yet</h2>
            <p>Add someone to your contacts list</p>
          </div>
          <div class="no-contact__action">
            <button @click="CreateEmployeeModal">+ Add New Contact</button>
          </div>
        </div>
        <div
          class="create-step-2"
          v-if="this.$route.query.create_employee === 'step-2'">
          <ContactStaff
            v-for="item in staff"
            :key="item.id"
            :user-id="item.id"
            :name="item.name"
            :nickname="item.nickname"
            :action="false" />
        </div>
      </div>
      <div class="modal-action">
        <button v-if="this.$route.query.create_employee === 'step-1'">
          Continue
        </button>
        <button
          v-if="this.$route.query.create_employee === 'step-2'"
          @click="CloseModal">
          Add as Employee
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactStaff from "~/features/shop/shop-settings/staff/item/contact-staff.vue";
import { Staff } from "~/shared/constants/shops";
import type { StaffType } from "~/shared/types/shops";

const route = useRoute();
const router = useRouter();

const staff = ref<StaffType[]>(Staff);

const CreateEmployeeModal = (): void => {
  router.push("/shops/shop-settings/staff?add_contact=step-1");
};

const CloseModal = (): void => {
  router.push("/shops/shop-settings/staff");
};
</script>

<style lang="scss" scoped>
.create-staff-modal__wrapper {
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
    padding: 20px 8px 20px 24px;
    border-radius: 30px;
    background-color: #14131b;

    &.active {
      height: 80%;
    }

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

    .modal-content {
      height: 80%;
      overflow: auto;
      margin-top: 38px;
      padding: 0 5px 0 0;

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

      .create-step-1 {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 38px;
        padding: 64.5px 16px;
        border: 1px solid #2b2741;
        border-radius: 12px;

        .no-contact {
          text-align: center;

          h2 {
            color: #fff;
            font: 500 20px Roboto, sans-serif;
          }

          p {
            margin-top: 8px;
            color: #fff;
            font: 400 14px Roboto, sans-serif;
          }
        }

        .no-contact__action {
          width: 100%;
          margin-top: 28px;

          button {
            width: 100%;
            padding: 12px 0;
            background: #1e1d28;
            border-radius: 14px;
            color: #fff;
            font: 500 16px Roboto, sans-serif;
          }
        }
      }

      .create-step-2 {
        width: 100%;
        height: 100%;
      }
    }

    .modal-action {
      width: 100%;
      margin-top: 38px;

      button {
        width: 100%;
        padding: 12px 0;
        background: #f64e2a;
        border-radius: 14px;
        color: #fff;
        font: 500 16px Roboto, sans-serif;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .create-staff-modal__wrapper {
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
