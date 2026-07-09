<template>
  <div class="prepaid-cards-desktop">
    <div class="prepaid-cards-desktop__grid">
      <!-- Левый блок - 25% ширины, полная высота -->
      <div class="prepaid-cards-desktop__left-panel">
        <CardsInfo />
      </div>

      <!-- Правый блок -->
      <div class="prepaid-cards-desktop__right-panel">
        <!-- Верхний ряд - 50% высоты экрана -->
        <div class="prepaid-cards-desktop__top-row">
          <!-- Блок 2 - 55% ширины -->
          <div class="prepaid-cards-desktop__component prepaid-cards-desktop__component--wide">
            <PrePaicCardChart title="Money Flow" />
          </div>

          <!-- Блок 3 - 20% ширины (на больших экранах) -->
          <div class="prepaid-cards-desktop__component prepaid-cards-desktop__component--narrow">
            <PrePaidCardTutorial />
          </div>
        </div>

        <!-- Нижний блок - полная ширина -->
        <div class="prepaid-cards-desktop__component prepaid-cards-desktop__component--full">
          <PrePaidCardHistory />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePrepaidCardsStore } from "~/store/prepaid-cards";
import CardsInfo from "~/widgets/prepaid-cards/CardsInfo.vue";
import PrePaicCardChart from "~/widgets/prepaid-cards/PrePaicCardChart/index.vue";
import PrePaidCardHistory from "~/widgets/prepaid-cards/PrePaidCardHistory/index.vue";
import PrePaidCardTutorial from "~/widgets/prepaid-cards/PrePaidCardTutorial/index.vue";

// Composables
const prepaidCardsStore = usePrepaidCardsStore();
</script>

<style lang="scss" scoped>
.prepaid-cards-desktop {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.prepaid-cards-desktop__header {
  flex-shrink: 0;
  padding: 24px 24px 0 24px;
}

.prepaid-cards-desktop__grid {
  flex: 1;
  display: flex;
  gap: 24px;
  padding: 24px;
  min-height: 0;
}

// Левый блок - 25% ширины, полная высота
.prepaid-cards-desktop__left-panel {
  min-height: calc(95vh - 90px);
  width: 25%;
  flex-shrink: 0;
  padding-right: 15px;
  border-right: 1px solid #2b2741;
}

// Правый блок - 75% ширины
.prepaid-cards-desktop__right-panel {
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 0;
}

// Верхний ряд - 50% высоты экрана
.prepaid-cards-desktop__top-row {
  height: 50vh;
  display: flex;
  gap: 24px;
  flex-shrink: 0;
}

// Общие стили для компонентов
.prepaid-cards-desktop__component {
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #2b2741;
  height: 100%;

  h3 {
    font-family: Roboto;
    font-weight: 600;
    font-size: 18px;
    line-height: 130%;
    color: #000000;
    margin-bottom: 12px;
  }

  p {
    font-family: Roboto;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #666666;
  }
}

// Блок 2 - 55% ширины
.prepaid-cards-desktop__component--wide {
  width: 67%;
  flex-shrink: 0;
  padding: 0;
}

// Блок 3 - 20% ширины (на больших экранах)
.prepaid-cards-desktop__component--narrow {
  flex: 1;
}

// Блок 4 - полная ширина
.prepaid-cards-desktop__component--full {
  flex: 1;
  min-height: 0;
}

// Адаптивность для экранов меньше 1440px
@media (max-width: 1440px) {
  .prepaid-cards-desktop {
    height: auto;
    overflow: visible;
  }

  .prepaid-cards-desktop__left-panel {
    width: 35%;
    flex-shrink: 0;
  }

  .prepaid-cards-desktop__right-panel {
    width: 100%;
  }

  .prepaid-cards-desktop__top-row {
    flex-direction: column;
    height: auto;
  }

  .prepaid-cards-desktop__component--wide {
    flex: 100%;
    width: 100%;
  }

  .prepaid-cards-desktop__component--narrow {
    flex: 100%;
    width: 100%;
  }

  .prepaid-cards-desktop__component--full {
    height: 40vh;
  }
}
</style>
