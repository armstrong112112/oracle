<template>
  <div class="pre_paid_card_list flex-col gap-8 flex py-16">
    <div class="pre_paid_card_list_card">
      <div class="flex items-center gap-10">
        <img src="/icons/prepaid-cards/visa.svg" alt="" />
        <nuxt-link to="/prepaid-cards/card/1" class="flex flex-col gap-4">
          <div class="pre_paid_card_list_card_money">$1,323.32</div>
          <div class="pre_paid_card_list_card_number">4083 **** **** 8921</div>
        </nuxt-link>
      </div>
      <div ref="menuContainer1" class="menu-container">
        <img
          src="/icons/prepaid-cards/3dots.svg"
          alt=""
          class="menu-trigger"
          @click="toggleMenu(1)" />
        <div
          v-if="activeMenu === 1"
          class="card-menu"
          :style="getMenuPosition(1)">
          <div class="menu-item" @click="handleMenuAction('withdraw', 1)">
            <span>Withdraw</span>
            <img src="/icons/prepaid-cards/withdraw.svg" alt="" />
          </div>
          <div class="menu-item" @click="handleMenuAction('history', 1)">
            <span>View History</span>
            <img src="/icons/prepaid-cards/history.svg" alt="" />
          </div>
          <div class="menu-item" @click="handleMenuAction('transfer', 1)">
            <span>Transfer</span>
            <img src="/icons/prepaid-cards/up.svg" alt="" />
          </div>
          <div class="menu-item" @click="handleMenuAction('topup', 1)">
            <span>Top Up</span>
            <img src="/icons/prepaid-cards/down.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="pre_paid_card_list_card">
      <div class="flex items-center gap-10">
        <img src="/icons/prepaid-cards/visa.svg" alt="" />
        <nuxt-link to="/prepaid-cards/card/2" class="flex flex-col gap-4">
          <div class="pre_paid_card_list_card_money">$1,323.32</div>
          <div class="pre_paid_card_list_card_number">4083 **** **** 8921</div>
        </nuxt-link>
      </div>
      <div class="menu-container" ref="menuContainer2">
        <img
          src="/icons/prepaid-cards/3dots.svg"
          alt=""
          class="menu-trigger"
          @click="toggleMenu(2)" />
        <div
          v-if="activeMenu === 2"
          class="card-menu"
          :style="getMenuPosition(2)">
          <div class="menu-item" @click="handleMenuAction('withdraw', 2)">
            <span>Withdraw</span>
            <img src="/icons/prepaid-cards/withdraw.svg" alt="" />
          </div>
          <div class="menu-item" @click="handleMenuAction('history', 2)">
            <span>View History</span>
            <img src="/icons/prepaid-cards/history.svg" alt="" />
          </div>
          <div class="menu-item" @click="handleMenuAction('transfer', 2)">
            <span>Transfer</span>
            <img src="/icons/prepaid-cards/up.svg" alt="" />
          </div>
          <div class="menu-item" @click="handleMenuAction('topup', 2)">
            <span>Top Up</span>
            <img src="/icons/prepaid-cards/down.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <!-- Blurred Overlay -->
    <div
      v-if="activeMenu !== null"
      class="menu-overlay"
      @click="closeMenu"></div>
  </div>
</template>

<script setup lang="ts">
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Composables
const localePath = useLocalePath();
const prepaidCardsStore = usePrepaidCardsStore();

// Template refs
const menuContainer1 = ref<HTMLElement>();
const menuContainer2 = ref<HTMLElement>();

// Reactive state
const activeMenu = ref<number | null>(null);
const menuPositions = ref<{ [key: number]: { top: string; right: string } }>(
  {}
);

// Methods
const toggleMenu = (cardId: number) => {
  if (activeMenu.value === cardId) {
    closeMenu();
  } else {
    activeMenu.value = cardId;
    nextTick(() => {
      calculateMenuPosition(cardId);
    });
  }
};

const closeMenu = () => {
  activeMenu.value = null;
};

const calculateMenuPosition = (cardId: number) => {
  const containerRef =
    cardId === 1 ? menuContainer1.value : menuContainer2.value;
  if (containerRef) {
    const rect = containerRef.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top = rect.bottom + 8;
    const right = viewportWidth - rect.right;

    const menuHeight = 200;
    if (top + menuHeight > viewportHeight) {
      top = rect.top - menuHeight - 8;
    }

    menuPositions.value[cardId] = {
      top: `${top}px`,
      right: `${right}px`,
    };
  }
};

const getMenuPosition = (cardId: number) => {
  if (!menuPositions.value[cardId]) {
    calculateMenuPosition(cardId);
  }
  return menuPositions.value[cardId] || { top: "0px", right: "0px" };
};

const handleMenuAction = (action: string, cardId: number) => {
  closeMenu();
  console.log(cardId);

  switch (action) {
    case "withdraw":
      break;
    case "history":
      break;
    case "transfer":
      break;
    case "topup":
      break;
  }
};

const handleResize = () => {
  [1, 2].forEach((cardId) => {
    calculateMenuPosition(cardId);
  });
  closeMenu();
};

// Lifecycle
onMounted(() => {
  [1, 2].forEach((cardId) => {
    nextTick(() => {
      calculateMenuPosition(cardId);
    });
  });

  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.pre_paid_card_list_card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 12px;
  background: #13121b;
  cursor: pointer;
}

.pre_paid_card_list_card_money {
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}

.pre_paid_card_list_card_number {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: #b2aaf9;
}

.menu-container {
  position: relative;
}

.menu-trigger {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.card-menu {
  position: fixed;
  background: #13121b;
  border-radius: 12px;
  min-width: 180px;
  box-shadow: 0 0 32px 0 #00000033;
  backdrop-filter: blur(150px);
  z-index: 1001;
  animation: menuSlideIn 0.2s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.menu-item {
  padding: 10px 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: white;
  border-bottom: 0.5px solid #2b2741;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000099;
  z-index: 1000;
  animation: overlayFadeIn 0.2s ease-out;
}

@keyframes menuSlideIn {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes overlayFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
