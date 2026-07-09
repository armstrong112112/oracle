<template>
  <div class="setting-discount__modal">
    <div class="discount__container">
      <div class="discount-header__container">
        <h2>Set Discount</h2>
        <button @click="close">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="discount-modal-content">
        <DropDown
          label="Discount applies"
          :options="category"
          :default="'Choose'"
          class="select" />
        <p>The discount will automatically expire after the end date.</p>
        <Input
          label="Date"
          title="Date"
          type="number"
          placeholder="Select Date"
          for-who="date"
          with-icon>
          <template #icon>
            <div class="icon">
              <img src="/svg/shop/icons/calendar.svg" alt="calendar" />
            </div>
          </template>
        </Input>
        <div class="discount-type">
          <DropDown
            label="Discount type"
            :options="category"
            :default="'1'"
            class="select" />
          <Input
            label=""
            title=""
            type="number"
            placeholder="Enter price"
            for-who="size-discount"
            with-icon>
            <template #icon>
              <div class="icon">%</div>
            </template>
          </Input>
        </div>
        <p>Was $ 332 → Now $ 232.4 (-30% / −$ 99.6)</p>
      </div>
      <div class="discount-modal__action">
        <button @click="close">Set Discount</button>
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

const close = (): void => {
  emit("close");
};
</script>

<style lang="scss">
.setting-discount__modal {
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

  .discount__container {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #14131b;

    .discount-header__container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: #fff;
        font: 500 20px Roboto, sans-serif;
      }
    }

    .discount-modal-content {
      margin-top: 32px;

      .dropdown {
        margin-top: 4px;

        .dropdown__label {
          margin-left: 8px;
        }

        .dropdown__trigger {
          height: 44px;
          background-color: #1b1a24;
          padding: 12px;
          margin-top: 8px;
        }
      }

      p {
        margin: 8px 0 20px 0;
        padding: 0 8px;
        color: #8780cf;
        font: 400 14px Roboto, sans-serif;
      }

      .input__container {
        .input__label {
          margin-left: 8px;
        }

        input {
          height: 44px;
          background-color: #1b1a24;
        }
      }

      .discount-type {
        margin-top: 20px;

        .input__container {
          margin-top: 8px;

          input {
            margin-top: 0;
          }

          .icon {
            color: white;
          }
        }
      }
    }

    .discount-modal__action {
      width: 100%;
      margin-top: 32px;

      button {
        width: 100%;
        padding: 12px 0;
        border-radius: 14px;
        background-color: #f64e2a;
        color: #fff;
        font: 500 16px Roboto, sans-serif;
      }
    }
  }
}
</style>
