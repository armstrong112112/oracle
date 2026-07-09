<template>
  <div class="mixing-creation-content">
    <div class="flex flex-col gap-24 px-16 py-8">
      <PrePaidDepositForm @update:amount="inputAmount = Number($event)" />

      <div class="flex flex-col gap-8">
        <div class="choose_mixing_title">
          {{ t("mixing.chooseMode") }} {{ inputAmount }}
        </div>
        <div class="choose_mixing_cards">
          <div
            class="choose_mixing_card choose_mixing_card-a"
            :class="{ active: selectedMode === 'slow' }"
            @click="selectMode('slow')">
            <div class="choose_mixing_card_title">
              {{ t("mixing.modes.slow.title") }}
            </div>
            <div
              class="choose_mixing_card_description text-center"
              v-html="t('mixing.modes.slow.desc')"></div>
          </div>

          <div
            class="choose_mixing_card choose_mixing_card-b"
            :class="{ active: selectedMode === 'regular' }"
            @click="selectMode('regular')">
            <div class="choose_mixing_card_title">
              {{ t("mixing.modes.regular.title") }}
            </div>
            <div
              class="choose_mixing_card_description text-center"
              v-html="t('mixing.modes.regular.desc')"></div>
          </div>

          <div
            class="choose_mixing_card choose_mixing_card-c"
            :class="{ active: selectedMode === 'rapid' }"
            @click="selectMode('rapid')">
            <div class="choose_mixing_card_title">
              {{ t("mixing.modes.rapid.title") }}
            </div>
            <div
              class="choose_mixing_card_description text-center"
              v-html="t('mixing.modes.rapid.desc')"></div>
          </div>
        </div>
      </div>

      <div class="mixing-creation-actions">
        <div v-if="inputAmount" class="creating_tips_msg">
          {{ t("mixing.feeNotice") }}
        </div>
        <CustomButton
          :value="t('mixing.createMixing')"
          :type="inputAmount ? 'primary' : 'confirm'"
          class="w-full"
          :disabled="!inputAmount || inputAmount <= 0"
          @click="handleCreateMixing" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";
import { useMixingStore } from "~/store/mixing";
import PrePaidDepositForm from "~/widgets/prepaid-cards/PrePaidDepositForm/index.vue";

// Composables
const localePath = useLocalePath();
const { t } = useI18n();
const router = useRouter();
const mixingStore = useMixingStore();

// Reactive state
const inputAmount = ref(0);

// Computed
const selectedMode = computed(() => mixingStore.selectedMode);
const netAmount = computed(() => mixingStore.netAmount);
const netAmountInteger = computed(() => mixingStore.netAmountInteger);
const netAmountDecimal = computed(() => mixingStore.netAmountDecimal);

// Methods
const selectMode = (mode: string) => {
  mixingStore.setSelectedMode(mode);
};

const handleCreateMixing = () => {
  // Emit close event for modal
  emit("close");
  // Navigate to mixing creation page
  router.push(localePath("/mixing/created"));
};

// Emits
const emit = defineEmits<{
  close: [];
}>();

// Watch for input amount changes
watch(inputAmount, (newValue) => {
  mixingStore.setInputAmount(newValue);
});
</script>

<style lang="scss" scoped>
.mixing-creation-content {
  .mixing-creation-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;

    // Для мобильной версии (когда компонент используется на странице)
    @media (max-width: 1023px) {
      position: absolute;
      bottom: 24px;
      left: 16px;
      right: 16px;
    }
  }
}

.new-creating-card {
  @media (min-width: 1024px) {
    background: #1b1a24;
  }
}
.choose_mixing_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: white;
}
.choose_mixing_cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 8px;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
  }
}

.choose_mixing_card-a {
  grid-column: 1;
  grid-row: 1;
}

.choose_mixing_card-b {
  grid-column: 2;
  grid-row: 1;
}

.choose_mixing_card-c {
  grid-column: 1 / span 2; /* spans both columns */
  grid-row: 2;
  @media (min-width: 1024px) {
    grid-column: 3; /* spans both columns */
    grid-row: 1;
  }
}

.choose_mixing_card {
  gap: 10px;
  border-radius: 8px;
  padding: 16px 8px;
  background: #13121b;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s linear;
  flex-direction: column;
  cursor: pointer;
  @media (min-width: 1024px) {
    background: #1b1a24;
  }
}
.choose_mixing_card.active {
  background: #f64e2a;
}
.choose_mixing_card_title {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: white;
}
.choose_mixing_card_description {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: white;
}
.creating_tips_msg {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: white;
}
</style>
