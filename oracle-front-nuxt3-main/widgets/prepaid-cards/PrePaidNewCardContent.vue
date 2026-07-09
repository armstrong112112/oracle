<template>
  <div class="prepaid-new-card-content">
    <div class="flex flex-col gap-24">
      <div class="flex flex-col gap-8 py-16">
        <TheInput :placeholder="$t('cards.name')" :is-remove="false" />
        <TheInput :placeholder="$t('cards.surname')" :is-remove="false" />
      </div>
      <!-- Cards Design для ПК версии -->
      <div class="cards_design_pc py-16">
        <div class="cards_design_title">{{ $t("cards.cardsDesign") }}</div>
        <div class="cards_design_scroll" ref="cardsScroll">
          <div
            v-for="(cardType, index) in cardDesignTypes"
            :key="cardType.name"
            class="card_design_option"
            :class="{ chosen: cardType.selected }"
            :ref="`card-${cardType.name}`"
            @click="selectCardDesign(cardType.name)">
            <PrepaidCard
              :card-number="'4083 **** **** 8921'"
              :card-holder-name="'JOHN DOE'"
              :expiry-date="'12/25'"
              :cvc="'123'"
              :card-type="cardType.cardType"
              :font-size-scale="0.6"
              :gap-scale="0.6"
              :padding-scale="0.6" />
          </div>
        </div>
      </div>
      <div class="choose_cards py-16">
        <div
          v-for="card in cardTypes"
          :key="card.name"
          class="choose_card"
          :class="{ chosen: card.selected }"
          @click="selectCardType(card.name)">
          {{ card.name }}
        </div>
      </div>

      <div class="card_limits flex flex-col gap-8 py-16">
        <div class="card_limits_title">{{ $t("cards.cardLimit") }}</div>
        <div class="card_limits_grid">
          <div
            v-for="limit in cardLimits"
            :key="limit.value"
            class="card_limit_option"
            :class="{ chosen: limit.selected }"
            @click="selectLimit(limit.value)">
            {{ limit.label }}
          </div>
        </div>
      </div>
    </div>

    <div class="card-detail-footer">
      <div class="w-full">
        <CustomButton
          :value="$t('cards.create')"
          type="primary"
          :class="showFooter ? 'card-detail-footer-btn' : 'modal-footer-btn'"
          @click="handleCreate" />
      </div>
    </div>

    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :type="modal.type"
      :button-type="modal.buttonType as ButtonType"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :button-text="`modals.${key}.buttonText`"
      :cancel-text="`modals.${key}.cancelText`"
      :success-text="modal.successText"
      :is-open="modal.isOpen"
      :close="() => closeModal(key)"
      :confirm="() => closeModal(key)"
      :is-cancel="modal.isCancel" />
  </div>
</template>

<script setup lang="ts">
import {
  cardLimits as cardLimitsData,
  cardTypes as cardTypesData,
  type CardLimit,
  type CardType,
} from "~/entities/pre-paid/data/cardLimit";
import { modals, type Modals } from "~/entities/verification/data/modal";
import CustomButton from "~/components/ui/Button.vue";
import TheInput from "~/components/ui/TheInput.vue";
import PrepaidCard from "~/components/ui/prepaid-card.vue";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";
import VerificationDialog, {
  type ButtonType,
} from "~/widgets/verification/VerificationDialog/index.vue";

interface CardDesignType {
  name: string;
  cardType: "default" | "premium" | "vip";
  selected: boolean;
}

// Props
const props = withDefaults(
  defineProps<{
    showFooter?: boolean;
  }>(),
  {
    showFooter: true,
  }
);

// Composables

const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const localModals = ref<Modals>(modals);
const cardLimits = ref<CardLimit[]>(cardLimitsData);
const cardTypes = ref<CardType[]>(
  cardTypesData.map((card) => ({
    ...card,
    selected: card.name === "VISA",
  }))
);

const cardDesignTypes = ref<CardDesignType[]>([
  { name: "VISA", cardType: "default", selected: true },
  { name: "MasterCard", cardType: "premium", selected: false },
  { name: "AMEX", cardType: "vip", selected: false },
]);

// Template refs
const cardsScroll = ref<HTMLElement>();

// Methods
const selectCardType = (name: string) => {
  // Обновляем выбор типа карты
  cardTypes.value = cardTypes.value.map((card) => ({
    ...card,
    selected: card.name === name,
  }));

  // Синхронизируем выбор дизайна карты
  cardDesignTypes.value = cardDesignTypes.value.map((cardType) => ({
    ...cardType,
    selected: cardType.name === name,
  }));

  // Автоскролл к выбранной карте с учетом модального окна
  nextTick(() => {
    // Для модального окна нужна дополнительная задержка
    const delay = props.showFooter ? 0 : 150;
    setTimeout(() => {
      scrollToSelectedCard(name);
    }, delay);
  });
};

const selectLimit = (value: number) => {
  cardLimits.value = cardLimits.value.map((limit) => ({
    ...limit,
    selected: limit.value === value,
  }));
};

const selectCardDesign = (name: string) => {
  // Обновляем выбор дизайна карты
  cardDesignTypes.value = cardDesignTypes.value.map((cardType) => ({
    ...cardType,
    selected: cardType.name === name,
  }));

  // Синхронизируем выбор типа карты
  cardTypes.value = cardTypes.value.map((card) => ({
    ...card,
    selected: card.name === name,
  }));

  // Автоскролл к выбранной карте при клике на дизайн
  nextTick(() => {
    const delay = props.showFooter ? 0 : 150;
    setTimeout(() => {
      scrollToSelectedCard(name);
    }, delay);
  });
};

const handleCreate = (): void => {
  openModal("successNewCard");
};

const openModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = true;
};

const closeModal = (modalName: keyof typeof modals) => {
  localModals.value[modalName].isOpen = false;
};

const scrollToSelectedCard = (cardName: string) => {
  // Функция для выполнения скролла с проверками
  const performScroll = () => {
    const scrollContainer = cardsScroll.value;
    const cardElement = document.querySelector(
      `[data-card="${cardName}"]`
    ) as HTMLElement;

    if (!scrollContainer || !cardElement) {
      return false;
    }

    // Проверяем, что контейнер и карта действительно отрендерены и видимы
    const containerRect = scrollContainer.getBoundingClientRect();
    const cardRect = cardElement.getBoundingClientRect();

    // Проверяем, что элементы имеют размеры и находятся в DOM
    if (
      containerRect.width > 0 &&
      cardRect.width > 0 &&
      containerRect.height > 0 &&
      cardRect.height > 0
    ) {
      // Вычисляем позицию для центрирования карты
      const scrollLeft =
        cardElement.offsetLeft - containerRect.width / 2 + cardRect.width / 2;

      // Плавный скролл к выбранной карте
      scrollContainer.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });

      return true;
    }

    return false;
  };

  performScroll();
};

// Lifecycle
onMounted(() => {
  // Инициализация скролла к выбранной карте при монтировании компонента
  nextTick(() => {
    const selectedCard = cardDesignTypes.value.find((card) => card.selected);
    if (selectedCard) {
      // Для модального окна нужна дополнительная задержка
      const delay = props.showFooter ? 0 : 200;
      setTimeout(() => {
        scrollToSelectedCard(selectedCard.name);
      }, delay);
    }
  });
});

// Отслеживаем изменения в DOM для корректной работы в модальном окне
onUpdated(() => {
  // Если компонент используется в модальном окне, проверяем скролл после обновления
  if (!props.showFooter) {
    nextTick(() => {
      const selectedCard = cardDesignTypes.value.find((card) => card.selected);
      if (selectedCard) {
        // Проверяем, что скролл действительно произошел
        setTimeout(() => {
          const scrollContainer = cardsScroll.value;
          if (scrollContainer && scrollContainer.scrollLeft === 0) {
            // Если скролл не произошел, пробуем еще раз
            scrollToSelectedCard(selectedCard.name);
          }
        }, 300);
      }
    });
  }
});
</script>

<style lang="scss">
@media (min-width: 1024px) {
  .the-input,
  .choose_card,
  .card_limit_option {
    background-color: #1b1a24 !important;
  }
}

.prepaid-new-card-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card-detail-footer-btn {
  position: absolute;
  bottom: 20px;
  width: 100%;
  left: 0;
  right: 0;
  @media (min-width: 1024px) {
    position: static;
    bottom: 0;
    gap: 0;
  }
}

.modal-footer-btn {
  width: 100%;
}

.choose_cards {
  display: flex;
  gap: 10px;
}

.choose_card {
  gap: 10px;
  padding: 10px 16px;
  border-radius: 8px;
  background: #13121b;
  width: 100%;
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s linear;
}

.card_limits_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
}

.card_limit_option {
  gap: 10px;
  padding: 10px 16px;
  border-radius: 8px;
  background: #13121b;
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
  transition: all 0.3s linear;
}

.card_limits_grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  cursor: pointer;
}

.card_limit_option.chosen {
  background: #f64e2a !important;
}

.choose_card.chosen {
  background: #f64e2a !important;
}

/* Стили для выбора дизайна карт (только для ПК) */
.cards_design_pc {
  display: none;
}

@media (min-width: 1024px) {
  .cards_design_pc {
    display: block;
  }
}

.cards_design_title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
  margin-bottom: 16px;
}

.cards_design_scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 8px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  /* Обеспечиваем правильный скролл в модальном окне */
  position: relative;
  z-index: 1;
}

.cards_design_scroll::-webkit-scrollbar {
  display: none;
}

.card_design_option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s linear;
  min-width: 250px;
  border-radius: 20px;
  border: 2px solid transparent;
}

.card_design_option:hover {
  border-color: #f64e2a;
}

.card_design_option.chosen {
  border-radius: 20px;
  border: 2px solid #ffffff;
}

.card_design_name {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
</style>
