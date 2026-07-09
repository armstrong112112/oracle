<template>
  <div class="internal-transfer__step-two">
    <div class="internal-transfer__content">
      <div class="selected-user">
        <div class="user-img">
          <img :src="'/png/zaglushka.png'" alt="" />
        </div>
        <h4 class="user-name">Barbara Martinez</h4>
      </div>
      <div class="selected-user__info">
        <ul class="info-list">
          <li v-for="profile of profilInfo" :key="profile.id" class="list-item">
            <div class="profile-img">
              <img :src="profile.img" alt="" />
            </div>
            <h4 class="profile-title">
              {{ $t(profile.title) }}
            </h4>
          </li>
        </ul>
      </div>
      <div class="internal-transfer__converter">
        <div class="coin-converter coin-converter__input">
          <coin-select name="USDT" price="2500 USDT" amount="2500" />
          <div class="input-coin">
            <div class="form-control">
              <input
                v-model="coin"
                type="text"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                placeholder="0.00"
                class="form-input"
                @input="coinEvent"
                @keypress="allowDecimalNumbers"
                @paste="blockInvalidDecimalPaste" />
            </div>
            <h4 class="coin-name">USDT</h4>
          </div>
          <div class="coin-converter__to-usd">
            <h5 class="to-usd__value">$</h5>
            <div class="form-control">
              <input
                v-model="dollor"
                type="text"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                class="form-input"
                @input="dollorEvent"
                @keypress="allowDecimalNumbers"
                @paste="blockInvalidDecimalPaste" />
              <div v-if="isFilled" class="input-placeholder">
                <span>0</span>.00
              </div>
            </div>
            <button class="transfer-btn">
              <TransferIcon />
            </button>
          </div>
        </div>
        <button
          class="coin-convert__icon"
          :class="{ active: isOpen }"
          @click="isOpen = true">
          <ConvertShowIcon v-if="isOpen" />
          <ConvertIcon v-else />
        </button>
        <div class="coin-converter coin-converter__output">
          <coin-select name="Litecoin" />
          <div class="input-coin">
            <div class="form-control">
              <input
                v-model="coinConvert"
                type="text"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                class="form-input"
                placeholder="0.00"
                @input="coinConvertEvent"
                @keypress="allowDecimalNumbers"
                @paste="blockInvalidDecimalPaste" />
            </div>
            <h4 class="coin-name">LTC</h4>
          </div>
        </div>
      </div>
    </div>
    <button-oracle
      :text="$t('transfers.transfer')"
      color="orange"
      @click="$emit('nextStep')" />
    <component
      :is="windowWidth < 1024 ? 'DraggableModal' : 'BillsModal'"
      :title="$t('transfers.chooseNetwork')"
      :is-open="isOpen"
      max-width="500px"
      @close="isOpen = false">
      <h1 class="modal-title" v-if="windowWidth < 1024">
        {{ $t("transfers.chooseNetwork") }}
      </h1>
      <ul class="coins-list">
        <div v-for="item of 6" :key="item" class="list-item">
          <label :for="`user` + item" class="list-item__label">
            <input :id="`user` + item" type="checkbox" class="form-input" />
            <label :for="`user` + item" class="checkbox-button">
              <span class="check-icon">
                <CheckIcon />
              </span>
            </label>
            <div class="coin-info">
              <div class="coin-img">
                <img :src="'/svg/usdt.svg'" alt="" />
              </div>
              <div class="coin-body">
                <div class="body-head">
                  <h4 class="coin-name">Litecoin</h4>
                  <h4 class="coin-convert">0,0244 TON</h4>
                </div>
                <div class="body-bottom">
                  <h5 class="card-num">***2343</h5>
                  <h5 class="coin-convert">≈ 1000.4$</h5>
                </div>
              </div>
            </div>
          </label>
        </div>
      </ul>
    </component>
  </div>
</template>

<script setup lang="ts">
import CheckIcon from "@/assets/svg/check-icon.svg?component";
import ConvertIcon from "@/assets/svg/coin-convert-icon.svg?component";
import ConvertShowIcon from "@/assets/svg/coin-convert-show-icon.svg?component";
import TransferIcon from "@/assets/svg/transfer-vertical-svg.svg?component";

const emit = defineEmits<{
  nextStep: []
}>()

// Reactive state
const isOpen = ref(false);
const coin = ref("");
const coinConvert = ref("");
const dollor = ref("");
const isFilled = ref(true);
const windowWidth = ref(0);

const profilInfo = [
  {
    id: 1,
    img: '/svg/selected-profile.svg',
    title: "transfers.profile",
  },
  {
    id: 2,
    img: '/svg/ensrow-profile.svg',
    title: "transfers.escrowReviews",
  },
  {
    id: 3,
    img: '/svg/p2p-profile.svg',
    title: "transfers.p2pReviews",
  },
];

// Methods
const dollorEvent = () => {
  dollor.value = dollor.value.replace(",", ".");
  isFilled.value = dollor.value.trim() === "";
};

const coinEvent = () => {
  coin.value = coin.value.replace(",", ".");
};

const coinConvertEvent = () => {
  coinConvert.value = coinConvert.value.replace(",", ".");
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

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

// Lifecycle hooks
onMounted(() => {
  windowWidth.value = window.innerWidth;
  if (import.meta.client) {
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
@use "@/assets/styles/components/transfer/internal/step-two.scss" as *;
</style>
