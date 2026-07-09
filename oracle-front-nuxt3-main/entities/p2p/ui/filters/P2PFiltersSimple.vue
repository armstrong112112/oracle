<template>
  <div class="p2p-filters-simple">
    <div class="p2p-filters-simple__filters">
      <div class="p2p-filters-simple__filters-item">
        <AppSelectModal 
          :modalTitle="$t('p2p.selectCoin')" 
          :modelValue="selectedCoin" 
          :modalType="modalType" 
          style="max-width: 150px;" 
          variant="text" 
          size='sm' 
          color="#443D69" 
          textColor="#FFF"
        >
          <template #modalContent>
            <P2pCoinsModal 
              :cryptoList="cryptoList" 
              :initialSelected="selectedCoin" 
              @select="handleSelectCoin" 
            />
          </template>
        </AppSelectModal>
      </div>
      
      <div class="p2p-filters-simple__filters-item">
        <AppSelectModal 
          isCloseButton 
          multiple 
          :modalTitle="$t('p2p.selectPayment')" 
          :modelValue="selectedPaymentTypes" 
          defaultTitle="Payment type" 
          :modalType="modalType" 
          style="max-width: 150px;" 
          variant="text" 
          size='sm' 
          color="#443D69" 
          textColor="#FFF" 
          activeTextColor="#F64E2A"
        >
          <template #modalContent>
            <P2pTabsModal 
              :tabsList="paymentTypes" 
              :initialSelected="selectedPaymentTypes" 
              @select="handleSelectPayment" 
              @close="handleClosePayment" 
            />
          </template>
        </AppSelectModal>
      </div>
      
      <div class="p2p-filters-simple__filters-item">
        <AppSelectModal 
          isCloseButton 
          :modalTitle="$t('p2p.selectAmmount')" 
          :modelValue="selectedAmount" 
          defaultTitle="Ammount" 
          :modalType="modalType" 
          style="max-width: 150px;" 
          variant="text" 
          size='sm' 
          color="#443D69" 
          textColor="#FFF" 
          activeTextColor="#F64E2A"
        >
          <template #modalContent>
            <P2pAmmountModal 
              :ammount="selectedAmount" 
              @select="handleSelectAmount" 
            />
          </template>
        </AppSelectModal>
      </div>
    </div>
    
    <div class="p2p-filters-simple__sort">
      <AppSelectModal v-if="isFiat" modalTitle="Select fiat" isCloseButton :modelValue="activeFiat" :modalType="modalType" style="max-width: 150px;" variant="outline" color="#443D69" textColor="#BFB7FF" >
          <template #modalContent>
            <P2pCoinsModal :cryptoList="fiatData" :initialSelected="activeFiat" @select="handleFiatClick">
              <template #item="{ item }">
                <div class="body-head">
                  <p class="crypto-name">{{ item.title }}</p>
                </div>
              </template>  
            </P2pCoinsModal>
          </template>
        </AppSelectModal>
        
      <SortButtonMenu 
        :items="sortItems" 
        :selectedItem="selectedSort" 
        @select="handleSelectSort" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSelectModal from '~/components/ui/AppSelectModal.vue'
import P2pCoinsModal from '~/entities/p2p/ui/modals/P2pCoinsModal.vue'
import P2pTabsModal from '~/entities/p2p/ui/modals/P2pTabsModal.vue'
import P2pAmmountModal from '~/entities/p2p/ui/modals/P2pAmmountModal.vue'
import SortButtonMenu from '~/components/ui/sortButtonMenu.vue'
import type { Coin } from '~/entities/p2p/model/coins'
import type { PaymentType } from '~/entities/p2p/model/paymentType'
import type { SortItem } from '~/shared/types/sortItems'
import type { Fiat } from '~/entities/p2p/model/fiat'

interface Props {
  cryptoList: Coin[];
  paymentTypes: PaymentType[];
  sortItems: SortItem[];
  fiatData: Fiat[];
  selectedCoin?: Coin | null;
  selectedPaymentTypes?: object[] | null;
  selectedAmount?: string | null;
  selectedSort?: string | null;
  windowWidth?: number;
  activeFiat?: Fiat | null;
  isFiat?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  selectedCoin: null,
  selectedPaymentTypes: null,
  selectedAmount: null,
  selectedSort: null,
  windowWidth: 1024,
  activeFiat: null,
  isFiat: false,
});

const emit = defineEmits<{
  'select-coin': [coin: Coin];
  'select-payment': [payment: object[]];
  'select-amount': [amount: string];
  'select-sort': [sort: string];
  'close-payment': [];
  'select-fiat': [fiat: Fiat];
}>();

// Computed properties
const isMobile = computed((): boolean => {
  return props.windowWidth < 1024;
});

const modalType = computed((): string => {
  return !isMobile.value ? 'default' : 'draggable';
});

// Methods
const handleSelectCoin = (coin: Coin): void => {
  emit('select-coin', coin);
};

const handleSelectPayment = (payment: object[]): void => {
  emit('select-payment', payment);
};

const handleSelectAmount = (amount: string): void => {
  emit('select-amount', amount);
};

const handleSelectSort = (sort: string): void => {
  emit('select-sort', sort);
};

const handleClosePayment = (): void => {
  emit('close-payment');
};

const handleFiatClick = (fiat: Fiat): void => {
  emit('select-fiat', fiat);
};
</script>

<style lang="scss" scoped>
.p2p-filters-simple {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &__filters {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    align-items: center;
    
    &-item {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  
  &__sort {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style> 