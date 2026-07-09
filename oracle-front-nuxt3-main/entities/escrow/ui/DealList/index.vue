<template>
  <div class="flex flex-col gap-16">
    <div class="flex items-center justify-between py-16 gap-16">
      <div class="mixing_header">
        <div
          class="mixing_header_title"
          :class="{ active: selectedTab === 'All Deals' }"
          @click="setTab('All Deals')">
          {{ $t("escrow.allDeals") }}
        </div>
        <div
          class="mixing_header_title"
          :class="{ active: selectedTab === 'Active Deals' }"
          @click="setTab('Active Deals')">
          {{ $t("escrow.activeDeals") }}
        </div>
        <div
          class="mixing_header_title"
          :class="{ active: selectedTab === 'Finished Deals' }"
          @click="setTab('Finished Deals')">
          {{ $t("escrow.finishedDeals") }}
        </div>
      </div>
      <img src="/icons/escrow/calendar.svg" alt="" class="cursor-pointer" />
      <button
        v-if="!isMobile"
        class="pc-plus-button"
        @click="openCreatingModal">
        <img src="/svg/white-plus.svg" alt="" />
      </button>
    </div>
    <div class="mixing_body_card py-16 flex items-center gap-12">
      <CustomButton
        :value="$t('escrow.asASeller')"
        :type="selectedRole === 'seller' ? 'primary' : 'secondary'"
        size="sm"
        @click="setRole('seller')" />
      <CustomButton
        :value="$t('escrow.asACustomer')"
        :type="selectedRole === 'customer' ? 'primary' : 'secondary'"
        size="sm"
        @click="setRole('customer')" />
    </div>
    <div class="amount_card flex flex-col gap-4 py-16">
      <div class="amount_card_text">{{ $t("escrow.totalAmountSecured") }}</div>
      <div class="flex items-center justify-start gap-4">
        <div class="amount_card_price">$ 1,621.00</div>
        <div class="amount_card_currencies flex items-center justify-center">
          <div>USD</div>
          <img
            src="/icons/verification/down.svg"
            alt="down"
            style="width: 14px" />
        </div>
        <div class="amount_card_deals">
          {{ $t("escrow.escrowDeals", { count: 20 }) }}
        </div>
      </div>
    </div>
    <div class="mixing_list flex-col flex gap-16">
      <div
        v-for="(group, date) in groupedDeals"
        :key="date"
        class="deal-group flex flex-col gap-4">
        <div class="deal-date py-16">{{ date }}</div>
        <div
          v-for="item in group"
          :key="item.handle + item.type"
          class="deal-item py-16">
          <div class="deal-left flex items-center gap-12">
            <img :src="item.icon" alt="crypto-icon" class="crypto-icon" />
            <div class="deal-info flex flex-col gap-4">
              <span class="deal-type">{{ item.type }}</span>
              <div class="flex items-center gap-4">
                <span
                  class="deal-handle"
                  :class="item.type === 'Success' ? 'text-green' : ''"
                  >{{ item.type }}</span
                >
                <span class="deal-handle">{{ item.handle }}</span>
              </div>
            </div>
          </div>
          <div class="deal-right flex flex-col gap-4">
            <div class="deal-amount text-right">{{ item.amount }}</div>
            <div class="deal-usd text-right">{{ item.usdValue }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { activeDealsData } from "~/entities/escrow/data/activeDealsData";
import CustomButton from "~/components/ui/Button.vue";

const emit = defineEmits<{ (e: "openCreatingModal"): void }>();

const selectedTab = ref<string>("All Deals");
const selectedRole = ref<string>("seller");
const originalData = ref(activeDealsData);
const windowWidth = ref(0);

const groupedDeals = computed(() => {
  let filtered = originalData.value;
  if (selectedTab.value === "Active Deals") {
    filtered = originalData.value.filter(
      (item) => item.type === "Deal With" || item.type === "Pending"
    );
  } else if (selectedTab.value === "Finished Deals") {
    filtered = originalData.value.filter((item) => item.type === "Success");
  }

  const grouped: { [key: string]: typeof filtered } = {};
  filtered.forEach((item) => {
    if (!grouped[item.date]) {
      grouped[item.date] = [];
    }
    grouped[item.date].push(item);
  });

  const sortedGrouped: typeof grouped = {};
  Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .forEach((date) => {
      sortedGrouped[date] = grouped[date];
    });

  return sortedGrouped;
});

function setTab(tab: string) {
  selectedTab.value = tab;
}

function setRole(role: string) {
  selectedRole.value = role;
}

function openCreatingModal() {
  emit("openCreatingModal");
}

onMounted(() => {
  windowWidth.value = window.innerWidth;
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});

function updateWindowWidth() {
  windowWidth.value = window.innerWidth;
}

const isMobile = computed(() => windowWidth.value < 1024);
</script>
<style lang="scss" scoped>
.mixing_header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  @media (min-width: 1024px) {
    flex: 1 1 100%;
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
.deal-date {
  font-family: Roboto;
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #bfb7ff;
}
.deal-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.deal-item {
  border-bottom: 1px solid #2b2741;
  padding: 4px 16px;
}
.deal-type {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
.deal-handle {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  color: #8780cf;
}
.deal-amount {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  vertical-align: middle;
  color: white;
}
.deal-usd {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  text-align: right;
  color: #7a74ba;
}

.amount_card_text {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  color: white;
}
.amount_card_price {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  color: white;
}
.amount_card_currencies {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  color: white;
}
.amount_card_deals {
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  color: #b2aaf9;
}
.pc-plus-button {
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f64e2a;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background: #e3300a;
  }
}
</style>
