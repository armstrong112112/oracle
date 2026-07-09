<template>
  <div class="setting-promo__modal">
    <div class="modal__container">
      <div class="modal-header__container">
        <h2>New Promo Code</h2>
        <button @click="closeModal">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="modal-promo__content">
        <Input
          label="Promo Code"
          title="Promo Code"
          type="text"
          placeholder="Enter"
          for-who="promo" />
        <div class="size-discount__container">
          <Input
            label="Size of Discount"
            title="Size of Discount"
            type="number"
            placeholder="Enter price"
            for-who="size-discount"
            with-icon>
            <template #icon>
              <div class="icon">%</div>
            </template>
          </Input>
          <DropDown
            label=""
            :options="category"
            :default="'%'"
            class="select" />
        </div>
        <DropDown
          label="Max Discount"
          :options="category"
          :default="'20$'"
          class="select" />
        <DropDown
          label="Number of Activations"
          :options="category"
          :default="'1'"
          class="select" />
        <DropDown
          label="Valid Until"
          :options="category"
          :default="'2025/02/02'"
          class="select" />
        <div class="promo-description">
          <h4>Description</h4>
          <textarea placeholder="Enter Description" />
        </div>
        <div class="promo__action">
          <button @click="closeModal">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DropDown from "~/components/ui/shops/utils/dropdowns.vue";
import Input from "~/components/ui/shops/utils/input.vue";

const category = ref<string[]>(["1", "2", "3", "4", "5"]);

const emit = defineEmits<{
  close: [];
}>();

const closeModal = (): void => {
  emit("close");
};
</script>

<style lang="scss">
.setting-promo__modal {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
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
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background-color: #14131b;

    .modal-header__container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: #fff;
        font: 500 20px Roboto, sans-serif;
      }
    }

    .modal-promo__content {
      margin-top: 32px;

      .size-discount__container {
        margin-top: 24px;
        position: relative;

        .dropdown {
          margin-top: 4px;

          .dropdown__trigger {
            height: 44px;
            background-color: #1b1a24;
            padding: 12px;
            margin: 0;
          }
        }

        .input__icon {
          bottom: 4px;
          right: 4px;
          display: flex;
          align-items: center;
          justify-content: center;

          .icon {
            height: 36px;
            border-radius: 8px;
            padding: 9px 14px;
            background-color: #14131b;
            color: #f64e2a;
            font: 400 14px Roboto, sans-serif;
          }
        }
      }

      .input__container {
        .input__label {
          label {
            font: 700 14px Inter, sans-serif;
          }
        }

        input {
          background-color: #1b1a24;
        }
      }

      .dropdown {
        margin-top: 24px;

        .dropdown__label {
          font: 700 14px Inter, sans-serif;
        }

        .dropdown__trigger {
          height: 44px;
          background-color: #1b1a24;
          padding: 12px;
        }
      }

      .promo-description {
        margin-top: 24px;

        h4 {
          color: white;
          font: 700 14px Inter, sans-serif;
        }

        textarea {
          width: 100%;
          height: 85px;
          margin-top: 8px;
          background: #1b1a24;
          padding: 4px 12px;
          border: 1px solid #1b1a24;
          border-radius: 12px;
          resize: none;

          &::placeholder {
            font: 700 14px Roboto, sans-serif;
          }
        }
      }

      .promo__action {
        margin-top: 32px;

        button {
          width: 100%;
          padding: 16.5px 0;
          background-color: #f64e2a;
          border-radius: 14px;
          color: #fff;
          font: 500 16px Roboto, sans-serif;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .setting-promo__modal {
    .modal__container {
      width: 100%;
      height: 100%;
      border-radius: 0;
      background-color: #000;
      position: relative;

      .promo__action {
        width: 100%;
        background-color: #111016;
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 8px 16px 24px 16px;
      }
    }
  }
}
</style>
