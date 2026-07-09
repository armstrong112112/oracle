<template>
  <div class="staff-page__wrapper">
    <Header />
    <ShopSettingsLayout>
      <div class="staff-page">
        <div class="page-header">
          <HeaderMobile page-title="Employee" with-page-title />
        </div>
        <div class="staff__header">
          <h2>Staff</h2>
          <button @click="CreateEmployeeModal">Add +</button>
        </div>
        <div class="staff-profile__container">
          <ProfileCard
            v-for="item in staff"
            :key="item.id"
            :modal="modal"
            :name="item.name"
            :image="item.image"
            @modal="showModal(item.id)" />
        </div>
      </div>
      <SettingStaffModal
        v-if="modal"
        :modal="modal"
        :profile="chosen_staff"
        @delete-staff="showDelete"
        @close="modal = false" />
      <CreateStaffModal
        v-if="
          $route.query.create_employee === 'step-1' ||
          $route.query.create_employee === 'step-2'
        " />
      <AddContactStaffModal v-if="$route.query.add_contact === 'step-1'" />
      <DeleteItemModal
        v-if="delete_staff_modal"
        target="Staff"
        @close="delete_staff_modal = false" />
    </ShopSettingsLayout>
  </div>
</template>
<script setup lang="ts">
import ProfileCard from "~/features/shop/shop-settings/favorites/profile-card.vue";
import DeleteItemModal from "~/features/shop/shop-settings/products/delete-item.vue";
import AddContactStaffModal from "~/features/shop/shop-settings/staff/modal/add-contact-staff.vue";
import CreateStaffModal from "~/features/shop/shop-settings/staff/modal/create-staff.vue";
import SettingStaffModal from "~/features/shop/shop-settings/staff/modal/setting-staff.vue";
import { Staff } from "~/shared/constants/shops";
import type { StaffType } from "~/shared/types/shops";
import Header from "~/widgets/shop/header/index.vue";
import HeaderMobile from "~/widgets/shop/header/mobile.vue";
import ShopSettingsLayout from "~/widgets/shop/layouts/settings/index.vue";

definePageMeta({
  layout: "sidebar",
});

const router = useRouter();

const staff: StaffType[] = Staff;
const modal = ref<boolean>(false);
const chosen_staff = ref<StaffType | undefined>();
const delete_staff_modal = ref<boolean>(false);

const showModal = (id: number): void => {
  modal.value = true;
  chosen_staff.value = staff.find((item) => item.id === id);
};

const showDelete = (val: boolean): void => {
  delete_staff_modal.value = val;
};

const CreateEmployeeModal = (): void => {
  router.push("/shops/shop-settings/staff?create_employee=step-1");
};
</script>
<style lang="scss">
.staff-page {
  .page-header {
    display: none;
    width: 100%;
    padding: 10px 16px;

    .chat-button {
      visibility: hidden;
    }
  }

  .staff__header {
    padding: 4px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: white;
      font: 600 20px Roboto, sans-serif;
    }

    button {
      padding: 9px 14px;
      background: #1e1d28;
      border-radius: 13px;
      color: white;
      font: 500 14px Roboto, sans-serif;
    }
  }

  .staff-profile__container {
    margin-top: 20px;
    padding: 0 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
  }
}

@media screen and (max-width: 750px) {
  .staff-page__wrapper {
    .shop-header-container {
      display: none;
    }
  }

  .staff-page {
    .page-header {
      display: block;
    }

    .staff-profile__container {
      gap: 12px;
    }
  }
}
</style>
