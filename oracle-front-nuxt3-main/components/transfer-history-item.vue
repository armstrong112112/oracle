<template>
  <div class="transfer-history__wrapper">
    <div
      v-for="transfer in localData"
      :key="transfer.id"
      class="transfer-history-item">
      <p class="transfer-date">{{ transfer.date }}</p>
      <div class="transfer-history__list">
        <li
          v-for="item in transfer.expenses"
          :key="item._id"
          class="transfer-item"
          @click="openModal(item)">
          <div class="coin-img">
            <img :src="item.img" alt="" />
          </div>
          <div class="transfer-item__body">
            <div class="item">
              <h4 class="item-title">{{ item.description }}</h4>
              <h4
                class="coin-amound"
                :class="item.price || item.card ? color : 'y-center ' + color">
                <span v-if="color == 'color-brown'"> - </span>
                <span v-else> + </span>
                {{ item.amount }}
              </h4>
            </div>
            <div class="item">
              <p class="item-description">{{ item.title }}</p>
              <h4 v-if="item.price" class="coin-price" :class="color">
                <template v-if="isTilda">≈</template> {{ item.price }}
              </h4>
              <h4 v-if="item.card" class="card-info" :class="color">
                {{ item.card }}
              </h4>
            </div>
            <div v-if="item.activations" class="activations">
              <h4 class="activations-title">{{ item.activations._title }}</h4>
              <transition name="accordion">
                <ul v-show="item.activations.selected" class="activations-list">
                  <li
                    v-for="(activation, i) in item.activations.list"
                    :key="i"
                    class="list-item">
                    {{ activation }}
                  </li>
                </ul>
              </transition>
              <div class="activations-arrow">
                <button
                  class="arrow-down"
                  :class="{ active: item.activations.selected }"
                  @click="activationsArrow(transfer.id, item._id, $event)">
                  <img :src="arrowCircleDownIcon" alt="" />
                </button>
              </div>
            </div>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import arrowCircleDownIcon from "@/assets/svg/arrow-circle-down.svg";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Interfaces
export interface Transfer {
  id: number;
  date: string;
  expenses: {
    _id: number;
    img: string;
    title: string;
    amount: string;
    description: string;
    price: string;
    card: string;
    activations?: {
      _title?: string;
      selected?: boolean;
      list?: [];
    };
  }[];
}

// Props
interface Props {
  data?: Transfer[];
  color?: string;
  isTilda?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  color: "",
  isTilda: true,
});

// Emits
const emit = defineEmits<{
  openModal: [item: any];
  close: [];
}>();

// Composables
const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const localData = ref<Transfer[]>([]);

// Methods
const openModal = (item: any) => {
  emit("openModal", item);
};

const activationsArrow = (id: number, _id: number, event: Event) => {
  event.stopPropagation();
  emit("close");
  localData.value.forEach((transfer) => {
    if (transfer.id === id) {
      transfer.expenses.forEach((expense) => {
        if (expense.activations) {
          if (expense._id === _id && expense.activations) {
            expense.activations.selected = !expense.activations.selected;
          }
        }
      });
    }
  });
};

// Lifecycle
onMounted(() => {
  localData.value = [...props.data];
});

// Watchers
watch(
  () => props.data,
  (newVal) => {
    localData.value = [...newVal];
  },
  { deep: true }
);
</script>

<style lang="scss">
@use "@/assets/styles/components/transfer/history-item.scss" as *;
</style>
