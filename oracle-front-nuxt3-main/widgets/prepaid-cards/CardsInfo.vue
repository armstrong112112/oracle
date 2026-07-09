<template>
  <div class="cards-and-users-transfer">
    <CardsCarousel
      :cards="mockCards"
      :initial-index="currentCardIndex"
      :card-scale="1.0"
      @card-changed="onCardChanged" />

    <!-- Блок с балансом -->
    <div class="balance-section">
      <div class="balance-container">
        <div class="balance-header">
          <div class="balance-title">Available Balance</div>
          <div class="balance-amount">
            <span class="amount-value"
              >${{ formatAmount(currentBalance?.amount || 0) }}</span
            >
            <span class="amount-currency">{{
              currentBalance?.currency || "USD"
            }}</span>
          </div>
        </div>

        <div
          class="balance-change"
          :class="{
            'balance-change--up': currentBalance?.changeDirection === 'up',
            'balance-change--down': currentBalance?.changeDirection === 'down',
          }">
          <svg
            class="balance-arrow"
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="currentColor"
              fill="currentColor"
              d="M10.5179 12L3.48207 12C1.93849 12 0.976748 10.3256 1.75451 8.99226L5.27244 2.96153C6.0442 1.63852 7.9558 1.63852 8.72756 2.96153L12.2455 8.99226C13.0232 10.3256 12.0615 12 10.5179 12Z" />
          </svg>
          <div class="balance-percent">
            {{ currentBalance?.changeDirection === "up" ? "+" : "-"
            }}{{ currentBalance?.changePercent }}%
          </div>
        </div>
      </div>
    </div>

    <!-- Блок с группой кнопок -->
    <div class="buttons-section">
      <div class="buttons-container">
        <!-- Кнопка Transfer -->
        <button class="action-button" @click="openTransferModal">
          <div class="button-icon">
            <arrowUpIcon />
          </div>
          <span class="button-text">Transfer</span>
        </button>

        <!-- Разделитель -->
        <div class="button-divider"></div>

        <!-- Кнопка Top Up -->
        <button class="action-button" @click="openTopUpModal">
          <div class="button-icon deg-180">
            <arrowUpIcon />
          </div>
          <span class="button-text">Top Up</span>
        </button>

        <!-- Разделитель -->
        <div class="button-divider"></div>

        <!-- Кнопка Withdraw -->
        <button class="action-button" @click="openWithdrawModal">
          <div class="button-icon">
            <withdrawIcon />
          </div>
          <span class="button-text">Withdraw</span>
        </button>
      </div>
    </div>
    <PrePaidQickTransfer />

    <div class="buttons-create-section flex flex-col gap-8">
      <new-oracle-button
        text="+ Create"
        color="yellow"
        @click="openNewCardModal" />
      <div class="flex gap-8">
        <new-oracle-button
          :text="blockedText"
          :icon="blockIcon"
          @click="openBlockModal" />
        <new-oracle-button text="Renew" :icon="renewIcon" />
      </div>
    </div>

    <!-- Модальные окна -->
    <TransferModal
      :is-visible="isTransferModalVisible"
      @close="closeTransferModal" />

    <TopUpModal :is-visible="isTopUpModalVisible" @close="closeTopUpModal" />

    <WithdrawModal
      :is-visible="isWithdrawModalVisible"
      @close="closeWithdrawModal" />
    <NewCardModal
      :is-visible="isNewCardModalVisible"
      @close="closeNewCardModal" />

    <!-- Модальное окно для блокировки карты -->
    <VerificationDialog
      v-for="(modal, key) in localModals"
      :key="key"
      :type="modal.type"
      :button-type="(modal.buttonType as ButtonType)"
      :button-text="`modals.${key}.buttonText`"
      :title="`modals.${key}.title`"
      :description="`modals.${key}.description`"
      :cancel-text="`modals.${key}.cancelText`"
      :success-text="modal.successText"
      :is-open="modal.isOpen"
      :close="() => closeBlockModal(key)"
      :confirm="() => processBlockCreation(key)"
      :is-cancel="modal.isCancel" />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import arrowUpIcon from "~/assets/svg/arrow-up.svg?component";
// @ts-ignore
import withdrawIcon from "~/assets/svg/withdraw.svg?component";
// @ts-ignore
import blockIcon from "/icons/prepaid-cards/block.svg";
// @ts-ignore
import { CardsCarousel, mockCards } from "~/entities/pre-paid";
import type { CardBalance } from "~/entities/pre-paid/model/card";
import { modals, type Modals } from "~/entities/verification/data/modal";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";
import NewCardModal from "~/widgets/prepaid-cards/modals/NewCardModal.vue";
import TopUpModal from "~/widgets/prepaid-cards/modals/TopUpModal.vue";
import TransferModal from "~/widgets/prepaid-cards/modals/TransferModal.vue";
import WithdrawModal from "~/widgets/prepaid-cards/modals/WithdrawModal.vue";
import PrePaidQickTransfer from "~/widgets/prepaid-cards/PrePaidQickTransfer/index.vue";
import VerificationDialog, {
  type ButtonType,
} from "~/widgets/verification/VerificationDialog/index.vue";
import renewIcon from "/icons/prepaid-cards/re-new.svg";

// Composables

const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const currentCardIndex = ref(0);

// Modal states
const isTransferModalVisible = ref(false);
const isTopUpModalVisible = ref(false);
const isWithdrawModalVisible = ref(false);
const isNewCardModalVisible = ref(false);

// Block modal state
const localModals = ref<Modals>(modals);
const blockedText = ref<string>("Block");

// Computed
const currentBalance = computed((): CardBalance | undefined => {
  return mockCards[currentCardIndex.value]?.balance;
});

// Methods
const onCardChanged = (index: number): void => {
  currentCardIndex.value = index;
};

const formatAmount = (amount: number): string => {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Modal methods
const openTransferModal = (): void => {
  isTransferModalVisible.value = true;
};

const openTopUpModal = (): void => {
  isTopUpModalVisible.value = true;
};

const openWithdrawModal = (): void => {
  isWithdrawModalVisible.value = true;
};

const openNewCardModal = (): void => {
  isNewCardModalVisible.value = true;
};

const closeTransferModal = (): void => {
  isTransferModalVisible.value = false;
};

const closeTopUpModal = (): void => {
  isTopUpModalVisible.value = false;
};

const closeWithdrawModal = (): void => {
  isWithdrawModalVisible.value = false;
};

const closeNewCardModal = (): void => {
  isNewCardModalVisible.value = false;
};

// Block modal methods
const openBlockModal = (): void => {
  localModals.value.blockCardPermission.isOpen = true;
};

const processBlockCreation = (modalName: keyof typeof modals): void => {
  blockedText.value = "Blocked";
  closeBlockModal(modalName);
};

const closeBlockModal = (modalName: keyof typeof modals): void => {
  localModals.value[modalName].isOpen = false;
};
</script>

<style lang="scss">
.quick-transfer {
  flex: 1;
}
</style>

<style lang="scss" scoped>
.cards-and-users-transfer {
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.balance-section {
  padding: 0 16px;
}

.balance-title {
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #fff;
  margin-bottom: 8px;
}

.balance-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;

  &--up {
    color: #28a745;
  }

  &--down {
    color: #dc3545;
  }
}

.balance-arrow {
  transform: rotate(0deg);

  .balance-change--down & {
    transform: rotate(180deg);
  }
}

.balance-percent {
  font-weight: 600;
}

.balance-amount {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.amount-value {
  font-family: Roboto;
  font-weight: 700;
  font-size: 24px;
  line-height: 130%;
  color: #fff;
}

.amount-currency {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #fff;
}

.balance-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons-section {
  padding: 0;
}

.buttons-container {
  display: flex;
  align-items: center;
  background: #14131b;
  border-radius: 12px;
  padding: 4px 6px;
  gap: 0;
}

.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  flex: 1;
  padding: 8px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  svg {
    width: 32px;
    height: 32px;
  }
}

.button-text {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #fff;
  text-align: center;
}

.button-divider {
  width: 1px;
  height: 40px;
  background: #2b2741;
  margin: 0 8px;
}

.deg-180 {
  transform: rotate(180deg);
}
</style>
