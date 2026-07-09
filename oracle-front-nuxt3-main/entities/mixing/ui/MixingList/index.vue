<template>
  <div class="mixing-list-container">
    <div class="flex flex-col gap-16">
      <div class="flex items-center justify-between gap-16 py-16">
        <div class="mixing_header">
          <div
            class="mixing_header_title"
            :class="{ active: selectedTab === 'All' }"
            @click="setTab('All')">
            {{ t("mixing.tabs.all") }}
          </div>
          <div
            class="mixing_header_title"
            :class="{ active: selectedTab === 'Active Mixes' }"
            @click="setTab('Active Mixes')">
            {{ t("mixing.tabs.active") }}
          </div>
          <div
            class="mixing_header_title"
            :class="{ active: selectedTab === 'Completed Mixes' }"
            @click="setTab('Completed Mixes')">
            {{ t("mixing.tabs.completed") }}
          </div>
        </div>
        <button
          v-if="!isMobile"
          @click="openMixingCreationModal()"
          class="create-circle-btn"
          title="Создать миксинг">
          <img src="/svg/add-icon.svg" alt="add" />
        </button>
        <img src="/icons/mixing/arrows.svg" alt="" class="cursor-pointer" />
      </div>
      <div class="mixing_body_card py-16 flex flex-col gap-12">
        <nuxt-link
          :to="localePath('/mixing/pre-finished')"
          class="flex flex-col gap-8">
          <div class="mixing_body_card_header">
            <div class="mixing_body_card_header_title">
              {{ t("mixing.card.mixingNumber", { number: "3213218398213" }) }}
            </div>
            <div class="mixing_body_card_header_price">0,0244 LTC</div>
          </div>
          <div class="mixing_body_card_header">
            <div class="mixing_body_card_header_date">
              {{ t("mixing.card.created", { date: "Jan 01, 2025 at 23:12" }) }}
            </div>
            <div class="mixing_body_card_header_quantity">
              {{ t("mixing.card.approx", { amount: "100.234" }) }}
            </div>
          </div>
          <CustomButton :value="t('mixing.card.withdraw')" type="secondary" />
        </nuxt-link>
      </div>
      <div class="mixing_list py-16 flex-col flex">
        <nuxt-link
          v-for="item in filteredData"
          :key="item.id"
          :to="localePath('/mixing/pre-finished')"
          class="mixing_list_item">
          <div class="mixing_list_item_left flex flex-col gap-8">
            <div class="mixing_body_card_header_title">
              {{ t("mixing.card.mixingNumber", { number: item.id }) }}
            </div>
            <div class="flex flex-col gap-4">
              <div class="mixing_body_card_header_price">
                {{ t("mixing.card.created", { date: item.createdAt }) }}
              </div>
              <div class="mixing_body_card_header_finished">
                {{ t("mixing.card.finished", { date: item.finishedAt }) }}
              </div>
            </div>
          </div>
          <div class="mixing_list_item_right flex flex-col gap-4">
            <div class="mixing_body_card_header_title">
              {{ item.amountLTC }} LTC
            </div>
            <div class="mixing_body_card_header_quantity">
              {{ t("mixing.card.approx", { amount: item.amountUSD }) }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>

    <!-- Модальное окно создания миксинга для ПК -->
    <bills-modal
      v-if="!isMobile"
      :is-open="activeModal === 'mixing-creation'"
      :title="t('mixing.newMixing')"
      @close="closeModal"
      max-width="600px">
      <MixingCreationContent @close="closeModal" />
    </bills-modal>
  </div>
</template>

<script setup lang="ts">
import BillsModal from "~/components/bills-modal.vue";
import MixingCreationContent from "~/components/mixing/MixingCreationContent.vue";
import { mixingData } from "~/entities/mixing/data/mixes";
import CustomButton from "~/components/ui/Button.vue";
import { useMixingStore } from "~/store/mixing";

// Composables
const localePath = useLocalePath();
const { t } = useI18n();
const mixingStore = useMixingStore();

// Reactive state
const windowWidth = ref(0);

// Computed
const isMobile = computed(() => windowWidth.value < 1024);
const selectedTab = computed(() => mixingStore.selectedTab);
const activeModal = computed(() => mixingStore.activeModal);
const filteredData = computed(() => mixingStore.filteredData);

// Methods
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const setTab = (tab: string) => {
  mixingStore.setSelectedTab(tab);
};

const openMixingCreationModal = () => {
  mixingStore.setActiveModal("mixing-creation");
};

const closeModal = () => {
  mixingStore.setActiveModal(null);
};

// Lifecycle
onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
  // Initialize mixing data
  mixingStore.setMixingData(mixingData);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.mixing_header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  @media (min-width: 1024px) {
    flex: 1;
    border-bottom: 1px solid #2b2741;
  }
}
.mixing_header_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: white;
  border-bottom: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 4px;
  cursor: pointer;
}
.mixing_header_title.active {
  border-bottom: 1px solid #f64e2a;
  color: #f64e2a;
}
.mixing_body_card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mixing_body_card_header_title,
.mixing_body_card_header_price {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.mixing_body_card_header_date {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #7a74ba;
}
.mixing_body_card_header_quantity {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #b2aaf9;
  text-align: right;
}
.mixing_list_item {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #2b2741;
  gap: 12px;
  padding: 14px 16px;
}
.mixing_body_card_header_finished {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #31f62a;
}
.create-circle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f64e2a;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #e54524;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  img {
    width: 16px;
    height: 16px;
    filter: brightness(0) invert(1);
  }
}
</style>
