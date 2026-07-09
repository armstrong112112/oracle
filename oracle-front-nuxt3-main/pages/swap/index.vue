<template>
  <div class="swap-page">
    <block-nav-bar
      v-if="isMobile"
      to="#"
      :text="$t('swap.title')"
      :time="true" />
    <div class="swap-page__content">
      <div class="swap-page__converter">
        <PrePaidDepositForm :is-escrow="true" />
        <coin-filter-button
          :crypto-list="cryptoList"
          :initial-selected="selectedCoin"
          :details="true"
          @open="isOpen = true"
          @close="isOpen = false"
          @selection-change="handleSelection">
          <template #trigger="{ open }">
            <button
              class="coin-convert__icon"
              :class="{ active: isOpen }"
              @click="open">
              <ConvertShowIcon v-if="isOpen" class="convert-show__icon" />
              <ConvertIcon v-else class="convert-icon" />
            </button>
          </template>
        </coin-filter-button>
        <PrePaidDepositForm :is-escrow="true" />
      </div>
      <div class="swap-info">
        <div class="swap-info__fees">
          <div class="swap-info__label">{{ $t("swap.fees") }}</div>
          <div class="swap-info__amount">0.5 USDT</div>
        </div>
        <div class="swap-info__coin">
          <div class="swap-info__pair">USDT/LTC</div>
          <div class="swap-info__rate">0.00000010</div>
        </div>
        <new-oracle-button
          :text="$t('swap.swap')"
          color="yellow"
          @click="isSuccessful = true" />
      </div>
    </div>

    <history-modal :is-visible="isSuccessful" class="successful-modal">
      <div class="modal-body">
        <div class="icon">
          <SeccessfulIcon />
        </div>
        <h2 class="modal-title">{{ $t("swap.swapSuccessful") }}</h2>
        <div class="conversion-info">
          <p class="conversion-info__pair">{{ $t("swap.conversionPair") }}</p>
          <p class="conversion-info__result">{{ $t("swap.youveReceived") }}</p>
          <p class="conversion-info__rate-change">
            <span>3.5 USDT</span> → 4 USDT
          </p>
        </div>
      </div>
      <new-oracle-button
        :text="$t('swap.close')"
        color="yellow"
        @click="isSuccessful = false" />
    </history-modal>
    <history-modal :is-visible="isFailed" class="failed-modal">
      <div class="modal-body">
        <div class="icon">
          <FailedIcon />
        </div>
        <h2 class="modal-title">{{ $t("swap.swapFailed") }}</h2>
        <p class="modal-description">
          {{ $t("swap.swapFailedDescription") }}
        </p>
      </div>
      <new-oracle-button :text="$t('swap.close')" @click="isFailed = false" />
    </history-modal>
  </div>
</template>

<script setup lang="ts">
import ConvertIcon from "@/assets/svg/coin-convert-icon.svg?component";
import ConvertShowIcon from "@/assets/svg/coin-convert-show-icon.svg?component";
import FailedIcon from "@/assets/svg/failed.svg?component";
import SeccessfulIcon from "@/assets/svg/successful.svg?component";
import CoinFilterButton from "~/components/coins/coinFilterButton.vue";
import PrePaidDepositForm from "~/widgets/prepaid-cards/PrePaidDepositForm/index.vue";

// Use localePath if needed
const localePath = useLocalePath();

// Use i18n for translations
const { t } = useI18n();

// Define layout
definePageMeta({
  layout: "sidebar",
});

// Reactive state
const isOpen = ref(false);
const inputCoin = ref<string>("");
const coinConvert = ref<string>("");
const inputDollor = ref<string>("");
const outputDollor = ref<string>("");
const selectedCoin = ref<string>("");
const maxInput = ref("100");
const maxOutput = ref("55");
const isInputFilled = ref<boolean>(true);
const isOutputFilled = ref<boolean>(true);
const isSuccessful = ref<boolean>(false);
const isFailed = ref<boolean>(false);
const windowWidth = ref<number>(0);

// Computed properties
const isMobile = computed((): boolean => {
  return windowWidth.value < 1024;
});

const cryptoList = computed(() => [
  {
    id: 1,
    img: "/svg/litecoin-ltc.svg",
    name: t("swap.litecoin"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
  {
    id: 2,
    img: "/svg/bitcoin.svg",
    name: t("swap.xrp"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
  {
    id: 3,
    img: "/svg/bitcoin.svg",
    name: t("swap.bitcoin"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
  {
    id: 4,
    img: "/svg/bitcoin.svg",
    name: t("swap.etherium"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
  {
    id: 5,
    img: "/svg/tether-usdt.svg",
    name: t("swap.usdt"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
  {
    id: 6,
    img: "/svg/tether-usdt.svg",
    name: t("swap.bnb"),
    price: 1000.4,
    cardNumber: "****4342",
    amount: "0,0244 TON",
    selected: false,
  },
]);

// Methods
const inputDollorEvent = () => {
  inputDollor.value = inputDollor.value.replace(",", ".");
  isInputFilled.value = inputDollor.value.trim() === "";
  inputCoin.value = String(Number(inputDollor.value) * 1.3);
};

const outputDollorEvent = () => {
  outputDollor.value = outputDollor.value.replace(",", ".");
  isOutputFilled.value = outputDollor.value.trim() === "";
  coinConvert.value = String(Number(outputDollor.value) * 1.3);
};

const coinEvent = (event: Event) => {
  inputCoin.value = inputCoin.value.replace(",", ".");
  isInputFilled.value = inputCoin.value.trim() === "";
  inputDollor.value =
    inputCoin.value.trim() === "" ? "" : String(Number(inputCoin.value) * 0.7);
  allowDecimalNumbers(event as KeyboardEvent);
};

const coinConvertEvent = () => {
  coinConvert.value = coinConvert.value.replace(",", ".");
  isOutputFilled.value = coinConvert.value.trim() === "";
  outputDollor.value =
    coinConvert.value.trim() === ""
      ? ""
      : String(Number(coinConvert.value) * 0.7);
};

const maxInputSelect = () => {
  inputCoin.value = maxInput.value;
  inputCoin.value = inputCoin.value.replace(",", ".");
  isInputFilled.value = inputCoin.value.trim() === "";
  inputDollor.value =
    inputCoin.value.trim() === "" ? "" : String(Number(inputCoin.value) * 0.7);
};

const maxOutputSelect = () => {
  coinConvert.value = maxOutput.value;
  coinConvertEvent();
};

const allowDecimalNumbers = (event: KeyboardEvent): void => {
  const key = event.key;
  const isNumber = /^\d$/.test(key);
  const isDot = key === "." || key === ",";

  const target = event.target as HTMLInputElement;
  const currentValue = target.value;
  const alreadyHasDot =
    currentValue.includes(".") || currentValue.includes(",");

  if (!isNumber && !(isDot && !alreadyHasDot)) {
    event.preventDefault();
  }
};

const blockInvalidDecimalPaste = (event: ClipboardEvent): void => {
  event.preventDefault();
  let pasted = event.clipboardData?.getData("text") || "";

  pasted = pasted.replace(/,/g, ".");

  pasted = pasted.replace(/[^\d.]/g, "");

  const firstDotIndex = pasted.indexOf(".");
  if (firstDotIndex !== -1) {
    const beforeDot = pasted.slice(0, firstDotIndex + 1);
    const afterDot = pasted.slice(firstDotIndex + 1).replace(/\./g, "");
    pasted = beforeDot + afterDot;
  }

  const target = event.target as HTMLInputElement;
  const currentValue = target.value;
  const selectionStart = target.selectionStart || 0;
  const selectionEnd = target.selectionEnd || 0;

  const newValue =
    currentValue.slice(0, selectionStart) +
    pasted +
    currentValue.slice(selectionEnd);

  target.value = newValue;
};

const handleSelection = (selected: string) => {
  selectedCoin.value = selected;
};

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
  updateLayout();
};

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? "" : "sidebar";
  // Layout is handled by definePageMeta
  // If dynamic layout change is needed, use setPageLayout(newLayout)
};

// Lifecycle hooks
onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", updateWidth);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", updateWidth);
  }
});
</script>

<style lang="scss">
@use "@/assets/styles/pages/_swap.scss" as *;
</style>
