<template>
  <div class="cards-carousel">
    <!-- Заголовок и навигация -->
    <div class="cards-carousel__header">
      <h3 class="cards-carousel__title">Cards</h3>

      <div class="cards-carousel__navigation">
        <button
          class="cards-carousel__nav-btn cards-carousel__nav-btn--prev"
          :disabled="currentIndex === 0"
          @click="previousCard">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 12L6 8L10 4"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <button
          class="cards-carousel__nav-btn cards-carousel__nav-btn--next"
          :disabled="currentIndex === cards.length - 1"
          @click="nextCard">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 4L10 8L6 12"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Контейнер для карт -->
    <div class="cards-carousel__container">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="cards-carousel__card-wrapper"
        :style="getCardStyle(index) as any">
        <PrepaidCard
          :card-number="card.cardNumber"
          :card-holder-name="card.cardHolderName"
          :expiry-date="card.expiryDate"
          :cvc="card.cvc"
          :card-type="card.cardType"
          :font-size-scale="0.8"
          :gap-scale="0.8"
          :padding-scale="1" />
      </div>
      <div class="cards-carousel__card-wrapper__hidden">
        <PrepaidCard
          card-number="test"
          card-holder-name="card.cardHolderName"
          expiry-date="test"
          cvc="test"
          card-type="default"
          :font-size-scale="0.8"
          :gap-scale="0.8"
          :padding-scale="1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrepaidCard from "~/components/ui/prepaid-card.vue";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";
import type { CardData, CardStyle } from "../model/card";
// Props
interface Props {
  cards: CardData[];
  initialIndex?: number;
  cardScale?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialIndex: 0,
  cardScale: 1,
});

// Emits
const emit = defineEmits<{
  cardChanged: [index: number];
}>();

// Composables
const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const currentIndex = ref(props.initialIndex);

// Methods
const getCardStyle = (index: number): CardStyle => {
  const diff = index - currentIndex.value;

  if (diff === 0) {
    return {
      transform: `scale(${props.cardScale}) translateY(0)`,
      zIndex: 3,
    };
  } else if (diff === 1) {
    return {
      transform: `scale(${props.cardScale * 0.95}) translateY(-20px)`,
      zIndex: 2,
      marginLeft: "40px",
    };
  } else if (diff === -1) {
    return {
      transform: `scale(${props.cardScale * 0.95}) translateY(-20px)`,
      zIndex: 2,
      marginRight: "40px",
    };
  } else if (diff === 2 || diff === -2) {
    return {
      transform: `scale(${props.cardScale * 0.9}) translateY(-40px)`,
      zIndex: 1,
      opacity: 0.5,
    };
  } else {
    return {
      transform: "",
      zIndex: 0,
      display: "none",
    };
  }
};

const nextCard = (): void => {
  if (currentIndex.value < props.cards.length - 1) {
    currentIndex.value++;
    emit("cardChanged", currentIndex.value);
  }
};

const previousCard = (): void => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    emit("cardChanged", currentIndex.value);
  }
};

const goToCard = (index: number): void => {
  currentIndex.value = index;
  emit("cardChanged", currentIndex.value);
};
</script>

<style lang="scss" scoped>
.cards-carousel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  // height: 40%;
}

.cards-carousel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}

.cards-carousel__title {
  font-family: Roboto;
  font-weight: 600;
  font-size: 18px;
  line-height: 130%;
  color: #fff;
  margin: 0;
}

.cards-carousel__navigation {
  display: flex;
  gap: 8px;
}

.cards-carousel__nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #ffffff;
  color: #666666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f8f9fa;
    color: #000000;
    border-color: #dee2e6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.cards-carousel__container {
  position: relative;
  flex: 1;
  display: block;
  overflow: hidden;
  padding-top: 30px;
}

.cards-carousel__card-wrapper {
  position: absolute;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 90%;
}
.cards-carousel__card-wrapper__hidden {
  width: 100%;
  opacity: 0;
}
</style>
