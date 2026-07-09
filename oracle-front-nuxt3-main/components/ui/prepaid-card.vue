<template>
  <div
    class="pre-paid-card-detail py-16"
    :class="cardTypeClass"
    :style="cardStyles">
    <div v-if="props.cardType !== 'oracle'">
      <svg
        v-if="!showCardNumber"
        style="cursor: pointer"
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="toggleCardNumber">
        <path
          d="M17.6089 8.21026C18.5752 9.22699 18.5752 10.7717 17.6089 11.7884C15.9791 13.5032 13.1799 15.8327 10.0003 15.8327C6.82073 15.8327 4.02157 13.5032 2.39175 11.7884C1.42541 10.7717 1.42541 9.22699 2.39175 8.21026C4.02157 6.49546 6.82073 4.16602 10.0003 4.16602C13.1799 4.16602 15.9791 6.49546 17.6089 8.21026Z"
          stroke="black"
          stroke-width="1.2" />
        <path
          d="M12.5003 9.99935C12.5003 11.3801 11.381 12.4993 10.0003 12.4993C8.61961 12.4993 7.50033 11.3801 7.50033 9.99935C7.50033 8.61864 8.61961 7.49935 10.0003 7.49935C11.381 7.49935 12.5003 8.61864 12.5003 9.99935Z"
          stroke="black"
          stroke-width="1.2" />
      </svg>

      <svg
        v-else
        style="cursor: pointer"
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="toggleCardNumber">
        <path
          d="M3.33366 3.33252L16.667 16.6659M11.667 11.8626C11.2247 12.2585 10.6406 12.4992 10.0003 12.4992C8.61961 12.4992 7.50033 11.3799 7.50033 9.99919C7.50033 9.35889 7.74104 8.77482 8.1369 8.33252M16.3401 13.0056C16.8163 12.5911 17.2422 12.1741 17.6089 11.7883C18.5752 10.7715 18.5752 9.22683 17.6089 8.2101C15.9791 6.4953 13.1799 4.16585 10.0003 4.16585C9.25751 4.16585 8.53547 4.29299 7.84424 4.50972M5.41699 5.66867C4.20152 6.44455 3.16502 7.39651 2.39175 8.2101C1.42541 9.22683 1.42541 10.7715 2.39175 11.7883C4.02157 13.5031 6.82073 15.8325 10.0003 15.8325C11.5571 15.8325 13.0226 15.2741 14.3044 14.5029"
          stroke="black"
          stroke-width="1.2"
          stroke-linecap="round" />
      </svg>
    </div>

    <div class="pre-paid-card-detail_card_numbers" :style="{ gap: gapSmall }">
      <div
        class="pre-paid-card-detail_card_number"
        :style="{ fontSize: cardNumberFontSize }">
        {{ showCardNumber ? props.cardNumber.slice(0, 4) : "****" }}
      </div>
      <div
        class="pre-paid-card-detail_card_number"
        :style="{ fontSize: cardNumberFontSize }">
        {{ showCardNumber ? props.cardNumber.slice(4, 8) : "****" }}
      </div>
      <div
        class="pre-paid-card-detail_card_number"
        :style="{ fontSize: cardNumberFontSize }">
        {{ showCardNumber ? props.cardNumber.slice(8, 12) : "****" }}
      </div>
      <div
        class="pre-paid-card-detail_card_number"
        :style="{ fontSize: cardNumberFontSize }">
        {{ showCardNumber ? props.cardNumber.slice(12, 16) : "****" }}
      </div>
      <div v-if="props.cardType === 'oracle'">
        <svg
          v-if="!showCardNumber"
          style="cursor: pointer"
          :width="iconSize"
          :height="iconSize"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="toggleCardNumber">
          <path
            d="M17.6089 8.21026C18.5752 9.22699 18.5752 10.7717 17.6089 11.7884C15.9791 13.5032 13.1799 15.8327 10.0003 15.8327C6.82073 15.8327 4.02157 13.5032 2.39175 11.7884C1.42541 10.7717 1.42541 9.22699 2.39175 8.21026C4.02157 6.49546 6.82073 4.16602 10.0003 4.16602C13.1799 4.16602 15.9791 6.49546 17.6089 8.21026Z"
            stroke="black"
            stroke-width="1.2" />
          <path
            d="M12.5003 9.99935C12.5003 11.3801 11.381 12.4993 10.0003 12.4993C8.61961 12.4993 7.50033 11.3801 7.50033 9.99935C7.50033 8.61864 8.61961 7.49935 10.0003 7.49935C11.381 7.49935 12.5003 8.61864 12.5003 9.99935Z"
            stroke="black"
            stroke-width="1.2" />
        </svg>

        <svg
          v-else
          style="cursor: pointer"
          :width="iconSize"
          :height="iconSize"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="toggleCardNumber">
          <path
            d="M3.33366 3.33252L16.667 16.6659M11.667 11.8626C11.2247 12.2585 10.6406 12.4992 10.0003 12.4992C8.61961 12.4992 7.50033 11.3799 7.50033 9.99919C7.50033 9.35889 7.74104 8.77482 8.1369 8.33252M16.3401 13.0056C16.8163 12.5911 17.2422 12.1741 17.6089 11.7883C18.5752 10.7715 18.5752 9.22683 17.6089 8.2101C15.9791 6.4953 13.1799 4.16585 10.0003 4.16585C9.25751 4.16585 8.53547 4.29299 7.84424 4.50972M5.41699 5.66867C4.20152 6.44455 3.16502 7.39651 2.39175 8.2101C1.42541 9.22683 1.42541 10.7715 2.39175 11.7883C4.02157 13.5031 6.82073 15.8325 10.0003 15.8325C11.5571 15.8325 13.0226 15.2741 14.3044 14.5029"
            :stroke="props.cardType === 'oracle' ? 'white' : 'black'"
            stroke-width="1.2"
            stroke-linecap="round" />
        </svg>
      </div>
    </div>

    <div
      class="pre-paid-card-detail_info"
      :class="props.cardType === 'oracle' ? 'text-white' : 'text-black'"
      :style="{ gap: gapMedium }">
      <div
        class="pre-paid-card-detail_info_name"
        :style="{ fontSize: infoFontSize }">
        {{ props.cardHolderName }}
      </div>
      <div
        class="pre-paid-card-detail_info_name"
        :style="{ fontSize: infoFontSize }">
        {{ props.expiryDate }}
      </div>
      <div
        class="pre-paid-card-detail_info_name"
        :style="{ fontSize: infoFontSize }">
        {{ showCardNumber ? props.cvc : "****" }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

type CardType = "default" | "premium" | "vip" | "oracle";

interface Props {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvc: string;
  cardType?: CardType;
  fontSizeScale?: number;
  gapScale?: number;
  paddingScale?: number;
}

const props = withDefaults(defineProps<Props>(), {
  cardType: "default",
  fontSizeScale: 1,
  gapScale: 1,
  paddingScale: 1,
});

const showCardNumber = ref(false);

const cardTypeClass = computed(() => `card-type-${props.cardType}`);

const cardStyles = computed(() => ({
  padding: `${18 * props.paddingScale}px`,
  gap: `${12 * props.gapScale}px`,
  borderRadius: `${32 * props.paddingScale}px`,
}));

const cardNumberFontSize = computed(() => `${17.22 * props.fontSizeScale}px`);

const infoFontSize = computed(() => `${12 * props.fontSizeScale}px`);

const iconSize = computed(() => `${20 * props.fontSizeScale}px`);

const gapSmall = computed(() => `${8 * props.gapScale}px`);

const gapMedium = computed(() => `${22 * props.gapScale}px`);

function toggleCardNumber() {
  showCardNumber.value = !showCardNumber.value;
}
</script>

<style lang="scss" scoped>
.pre-paid-card-detail {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  aspect-ratio: 3/2;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

// Тип карты по умолчанию (оригинальный дизайн)
.card-type-default {
  background-image: url("/icons/prepaid-cards/card.png");
}
.card-type-oracle {
  background-image: url("/icons/prepaid-cards/oracle.png");
  color: white !important;
  width: 290px;
}

// Премиум карта (синий градиент)
.card-type-premium {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

// VIP карта (золотой градиент)
.card-type-vip {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.pre-paid-card-detail_info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.pre-paid-card-detail_card_numbers {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.pre-paid-card-detail_info_name {
  font-family: Roboto;
  font-weight: 600;
  line-height: 130%;
  letter-spacing: 0%;
  color: #000000;
}

.pre-paid-card-detail_card_number {
  font-family: Hector, Roboto;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: 0%;
  color: #000000;
}
.card-type-oracle .pre-paid-card-detail_card_number,
.pre-paid-card-detail_info_name {
  color: white !important;
}
.card-type-oracle div svg path {
  fill: white !important;
}
</style>
