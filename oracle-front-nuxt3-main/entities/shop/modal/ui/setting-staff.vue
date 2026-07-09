<template>
  <div class="setting-staff__modal">
    <div class="modal__container">
      <div class="modal-header__container">
        <h2>Employee</h2>
        <button @click="showModal">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
        <button @click="showModal">
          <img src="/svg/arrow-back.svg" alt="back" />
        </button>
      </div>
      <div class="modal-profile__container">
        <div class="profile-image">
          <img src="/svg/shop/images/settings-profile.png" alt="profile" />
        </div>
        <h5>Michael Anderson</h5>
      </div>
      <div class="modal-action__container">
        <h4>What Can This Employee Do?</h4>
        <div class="modal-actions">
          <div
            v-for="(item, index) in permission_list"
            :key="index"
            class="action-item">
            <div class="action-label">
              {{ item.title }}
            </div>
            <div class="input-toggle__toggle">
              <div
                :class="{
                  'np-outer-switch': true,
                  'np-outer-switch-on': item.permission,
                  'np-outer-switch-off': !item.permission,
                }"
                @click="action_value_function(index)">
                <div
                  :class="{
                    'np-inner-switch': true,
                    'np-inner-switch-left': !item.permission,
                    'np-inner-switch-right': item.permission,
                  }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__action-button">
        <button>
          <img src="/svg/shop/icons/edit-trash.svg" alt="" />
          Remove from Staff
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface ActionsType {
  id: number;
  title: string;
  permission: boolean;
}

const emit = defineEmits<{
  close: [];
}>();

const action_value = ref(false);

const permission_list = ref<ActionsType[]>([
  { id: 1, title: "Change Shop's Name", permission: false },
  { id: 2, title: "Change Shop's Bio", permission: false },
  { id: 3, title: "Change Shop's Avatar", permission: false },
  { id: 4, title: "Change Staff Settings", permission: false },
  { id: 5, title: "Add New Employees", permission: false },
  { id: 6, title: "Send Messages", permission: false },
  { id: 7, title: "Delete Employees", permission: false },
]);

const action_value_function = (index: number): void => {
  permission_list.value[index].permission =
    !permission_list.value[index].permission;
};

const showModal = (): void => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.setting-staff__modal {
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

  .modal__container {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #14131b;

    .modal-header__container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: #fff;
        font: 500 20px Roboto, sans-serif;
      }

      button {
        &:nth-child(3) {
          display: none;
        }
      }
    }

    .modal-profile__container {
      margin-top: 32px;
      padding: 8px 10px;
      display: flex;
      align-items: center;
      gap: 16px;

      h5 {
        color: #fff;
        font: 500 16px Roboto, sans-serif;
      }
    }

    .modal-action__container {
      margin-top: 24px;

      h4 {
        padding: 0 8px;
        color: #fff;
        font: 500 16px Roboto, sans-serif;
        margin-bottom: 8px;
      }

      .action-item {
        padding: 6px 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #2b2741;

        .action-label {
          color: #fff;
          font: 400 16px Roboto, sans-serif;
        }

        .input-toggle__toggle {
          width: 51px;
          height: 31px;
          position: relative;

          .np-outer-switch {
            width: 100%;
            height: 100%;
            border-radius: 30px;
            background: #2c2a3d;
            cursor: pointer;
          }

          .np-outer-switch-off {
            background: #2c2a3d;
            transition: background 0.4s;
          }

          .np-outer-switch-on {
            background: #2c2a3d;
            transition: background 0.4s;
          }

          .np-inner-switch {
            height: 27px;
            width: 27px;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 2px;
          }

          .np-inner-switch-left {
            top: 2px;
            left: 2px;
            transition: left 0.4s;
          }

          .np-inner-switch-right {
            top: 2px;
            left: 45%;
            transition: left 0.4s;
          }
        }
      }
    }

    .modal__action-button {
      margin-top: 24px;

      button {
        width: 100%;
        padding: 12.5px 20px;
        background: #2c2a3d;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #f64e2a;
        font: 400 14px Roboto, sans-serif;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .setting-staff__modal {
    .modal__container {
      width: 100%;
      height: 100%;
      border-radius: 0;
      background-color: #000;

      .modal-header__container {
        flex-direction: row-reverse;
        justify-content: flex-end;

        h2 {
          flex: 1;
        }

        button {
          flex: 0.8;
          display: flex;
          align-items: center;
          justify-content: start;

          &:nth-child(3) {
            display: flex;
          }

          &:nth-child(2) {
            display: none;
          }
        }
      }

      .modal-profile__container {
        background: #14131b;
        border-radius: 8px;
      }

      .modal-action__container {
        .modal-actions {
          background: #14131b;
          border-radius: 8px;
          padding: 8px 0 8px 12px;

          .action-item {
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }

      .modal__action-button {
        button {
          background: #14131b;
        }
      }
    }
  }
}
</style>
