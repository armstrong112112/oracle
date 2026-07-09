<template>
  <div class="coin-filter-wrapper">
    <!-- SLOT или дефолтная кнопка -->
    <slot name="trigger" :open="openModal">
      <button class="coin-selected__btn" @click="openModal">
        <span v-if="!hasSelection">{{ $t("checks.allCrypto") }}</span>
        <span v-else class="selected-coin">
          <template v-if="isMultiple">
            <span v-for="(item, i) in selectedArray" :key="i">
              {{ item }}<span v-if="i < selectedArray.length - 1">, </span>
            </span>
          </template>
          <template v-else>
            {{ selectedSingle }}
          </template>
        </span>
        <span class="arrow-icon"><ArrowIcon /></span>
      </button>
    </slot>

    <!-- PC Modal -->
    <bills-modal
      v-if="isPC"
      :is-open="modalOpen"
      :title="$t('checks.chooseNetwork')"
      @close="closeModal"
      :max-width="'500px'"
      class="filter-modal">
      <button v-if="isMultiple" class="select-all" @click="toggleAllCheck">
        <checkbox-oracle :checked="allCheck" />
        <span>{{ $t("checks.selectAllCoin") }}</span>
      </button>

      <ul class="crypto-list">
        <li v-for="item in cryptoList" :key="item.id" class="list-item">
          <button class="crypto-button" @click.prevent="onItemClick(item.name)">
            <div class="form-control">
              <checkbox-oracle
                v-if="isMultiple"
                :checked="isSelected(item.name)" />
              <div v-else class="form-input">
                <input
                  type="radio"
                  name="crypto-selection"
                  class="crypto-selection"
                  :checked="isSelected(item.name)"
                  readonly />
                <div class="checkbox-button">
                  <span class="check-icon">
                    <CheckIcon />
                  </span>
                </div>
              </div>
            </div>

            <!-- SIMPLE или ПОДРОБНЫЙ ВИД -->
            <template v-if="!details">
              <div class="icon">
                <img :src="item.img" :alt="item.name" />
              </div>
              <p class="crypto-text">{{ item.name }}</p>
            </template>

            <template v-else>
              <div class="right-block">
                <div class="icon">
                  <img :src="item.img" :alt="item.name" />
                </div>
                <div class="coin-body">
                  <div class="body-head">
                    <p class="crypto-name">{{ item.name }}</p>
                    <p class="crypto-amound">{{ item.amount }}</p>
                  </div>
                  <div class="body-bottom">
                    <p class="crypto-card">{{ item.cardNumber }}</p>
                    <p class="crypto-price">≈ {{ item.price }}$</p>
                  </div>
                </div>
              </div>
            </template>
          </button>
        </li>
      </ul>
      <div class="close-modal-btn">
        <new-oracle-button
          :text="$t('coinFilter.close')"
          color="yellow"
          @click="closeModal" />
      </div>
    </bills-modal>

    <!-- Mobile Modal -->
    <draggable-modal
      v-else
      class="filter-modal"
      :is-open="modalOpen"
      @close="closeModal">
      <h3 class="modal-title">{{ $t("checks.chooseNetwork") }}</h3>

      <button v-if="isMultiple" class="select-all" @click="toggleAllCheck">
        <checkbox-oracle :checked="allCheck" />
        <span>{{ $t("checks.selectAllCoin") }}</span>
      </button>

      <ul class="crypto-list">
        <li v-for="item in cryptoList" :key="item.id" class="list-item">
          <button class="crypto-button" @click.prevent="onItemClick(item.name)">
            <div class="form-control">
              <checkbox-oracle
                v-if="isMultiple"
                :checked="isSelected(item.name)" />
              <div v-else class="form-input">
                <input
                  type="radio"
                  name="crypto-selection"
                  class="crypto-selection"
                  :checked="isSelected(item.name)"
                  readonly />
                <div class="checkbox-button">
                  <span class="check-icon">
                    <CheckIcon />
                  </span>
                </div>
              </div>
            </div>

            <!-- SIMPLE или ПОДРОБНЫЙ ВИД -->
            <template v-if="!details">
              <div class="icon">
                <img :src="item.img" :alt="item.name" />
              </div>
              <p class="crypto-text">{{ item.name }}</p>
            </template>

            <template v-else>
              <div class="right-block">
                <div class="icon">
                  <img :src="item.img" :alt="item.name" />
                </div>
                <div class="coin-body">
                  <div class="body-head">
                    <p class="crypto-name">{{ item.name }}</p>
                    <p class="crypto-amound">{{ item.amount }}</p>
                  </div>
                  <div class="body-bottom">
                    <p class="crypto-card">{{ item.cardNumber }}</p>
                    <p class="crypto-price">≈ {{ item.price }}$</p>
                  </div>
                </div>
              </div>
            </template>
          </button>
        </li>
      </ul>
    </draggable-modal>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from "@/assets/svg/arrow-back.svg?component";
import CheckIcon from "@/assets/svg/check-icon.svg?component";

interface CryptoItem {
  id: number;
  img: string;
  name: string;
  cardNumber?: string;
  price?: number;
  amount?: string;
}

interface Props {
  cryptoList: CryptoItem[];
  initialSelected: string[] | string;
  details?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  details: false,
});

const emit = defineEmits<{
  'selection-change': [value: string | string[]];
  open: [];
  close: [];
}>();

// Reactive state
const modalOpen = ref(false);
const selectedArray = ref<string[]>([]);
const selectedSingle = ref("");
const allCheck = ref(false);
const windowWidth = ref(1024);

// Computed properties
const isPC = computed((): boolean => {
  return windowWidth.value >= 1024;
});

const isMultiple = computed((): boolean => {
  return Array.isArray(props.initialSelected);
});

const hasSelection = computed((): boolean => {
  return isMultiple.value
    ? selectedArray.value.length > 0
    : !!selectedSingle.value;
});

// Methods
const handleResize = () => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
  }
};

const openModal = () => {
  modalOpen.value = true;
  emit('open');
  // Note: $nuxt.$emit not needed in Nuxt 3
};

const closeModal = () => {
  modalOpen.value = false;
  emit('close');
  emitSelection();
};

const emitSelection = () => {
  const value = isMultiple.value ? selectedArray.value : selectedSingle.value;
  emit('selection-change', value);
  return value;
};

const isSelected = (name: string): boolean => {
  return isMultiple.value
    ? selectedArray.value.includes(name)
    : selectedSingle.value === name;
};

const onItemClick = (name: string) => {
  if (isMultiple.value) {
    const index = selectedArray.value.indexOf(name);
    if (index !== -1) {
      selectedArray.value.splice(index, 1);
    } else {
      selectedArray.value.push(name);
    }
    updateAllCheckState();
  } else {
    selectedSingle.value = name;
  }
};

const toggleAllCheck = () => {
  allCheck.value = !allCheck.value;
  selectedArray.value = allCheck.value
    ? props.cryptoList.map((c) => c.name)
    : [];
};

const updateAllCheckState = () => {
  allCheck.value = selectedArray.value.length === props.cryptoList.length;
};

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", handleResize);
  }

  if (isMultiple.value) {
    selectedArray.value = [...(props.initialSelected as string[])];
    updateAllCheckState();
  } else {
    selectedSingle.value = props.initialSelected as string;
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", handleResize);
  }
});
</script>

<style lang="scss">
@use "@/assets/styles/components/coin-filter-button.scss" as *;
</style>
