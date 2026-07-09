<template>
  <div class="step-four__container">
    <div class="step-four-content__col">
      <h5>Category</h5>
      <div class="content__description">
        All Categories
        <img src="/svg/shop/icons/vector.svg" alt="vector" />
        {{ data?.step_one.category }}
        <img src="/svg/shop/icons/vector.svg" alt="vector" />
        {{ data?.step_one.subcategory }}
      </div>
    </div>
    <div class="step-four-content__col">
      <h5>Description</h5>
      <div class="content__description">
        {{ data?.step_two.desctiption }}
      </div>
    </div>
    <div
      v-for="item in selected_datas"
      :key="item.id"
      class="step-four-content__row">
      <h4>{{ item.title }}</h4>
      <h5>{{ item.selected }}</h5>
    </div>
    <div class="uploaded-photos">
      <div class="uploaded-photos__label">Photos and videos</div>
      <div class="uploaded-photos__container">
        <div v-for="(item, index) in 4" :key="index" class="container__item">
          <img src="/svg/shop/images/uploaded-image.png" alt="item" />
          <div class="cancel-button">
            <img src="/svg/shop/icons/cancel.svg" alt="cancel" />
          </div>
        </div>
      </div>
    </div>
    <!-- <NuxtLink :to="{ path: '/shops/new-listing', query: { step: 2 } }"> -->
    <div class="button-wrapper">
      <button class="step-four__action">Submit</button>
    </div>
    <!-- </NuxtLink> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { StepsObjectType } from "../types";
import { readLocalStorageJson } from "~/utils/clientStorage";

interface DataTypes {
  id: number;
  title: string;
  selected: string;
}

const selected_datas: DataTypes[] = [
  { id: 1, title: "Terms", selected: "4 month" },
  { id: 2, title: "Duration", selected: "32 days 23 hours" },
  { id: 3, title: "Plan", selected: "X ($500 USD)" },
  { id: 4, title: "Cost of the Product", selected: "$30 USD" },
  { id: 5, title: "Self-Registred", selected: "Yes" },
  { id: 6, title: "Controlled", selected: "Yes" },
  { id: 7, title: "Account Age", selected: "3 months" },
  { id: 8, title: "Controlled", selected: "Yes" },
  { id: 9, title: "Instant Delivery", selected: "Yes" },
  { id: 10, title: "Resend Allowed", selected: "Yes" },
];

const data = ref<StepsObjectType | null>(null);

const getDatAsFromLocalStorage = () => {
  const storedData = readLocalStorageJson<StepsObjectType | null>("StepsObject");
  if (storedData) {
    data.value = storedData;
  }
};

onMounted(() => {
  getDatAsFromLocalStorage();
});
</script>

<style lang="scss" scoped>
.step-four__container {
  width: 100%;
  margin-top: 32px;
  user-select: none;

  .step-four-content__col {
    width: 100%;
    padding: 12px 0 12px 16px;
    border-bottom: 1px solid #2b2741;
    h5 {
      color: white;
      font-family: Roboto, sans-serif;
      font-weight: 500;
      font-size: 14px;
    }

    .content__description {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      color: #bfb7ff;
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: 14px;
    }
  }

  .step-four-content__row {
    width: 100%;
    padding: 12px 16px;
    display: flex;
    align-self: center;
    justify-content: space-between;
    border-bottom: 1px solid #2b2741;

    h4 {
      color: white;
      font-family: Roboto, sans-serif;
      font-weight: 500;
      font-size: 14px;
    }

    h5 {
      color: #bfb7ff;
      font-family: Roboto, sans-serif;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .uploaded-photos {
    width: 100%;
    margin-top: 16px;
    padding: 0 16px;
    .uploaded-photos__label {
      color: white;
      font-size: 16px;
      font-family: Roboto, sans-serif;
      font-weight: 600;
    }
    .uploaded-photos__container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 8px;
      .container__item {
        position: relative;
        .cancel-button {
          width: 26px;
          height: 26px;
          border-radius: 100px;
          background-color: rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 8px;
          right: 8px;
          cursor: pointer;
        }
      }
    }
  }

  .step-four__action {
    margin-top: 32px;
    width: 100%;
    padding: 12px 0;
    border-radius: 14px;
    background-color: #f64e2a;
    color: white;
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 16px;

    &:disabled {
      opacity: 40%;
    }
  }
}
@media screen and (max-width: 750px) {
  .step-four__container {
    .step-four__action {
      display: none;
    }
  }
  .uploaded-photos {
    .uploaded-photos__container {
      overflow-x: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      .container__item {
        width: 170px;
        height: 170px;
        img {
          width: 100%;
        }
        .cancel-button {
          width: 26px;
          height: 26px;
          img {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .button-wrapper {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
