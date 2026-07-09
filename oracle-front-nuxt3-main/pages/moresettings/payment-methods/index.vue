<template>
  <more-settings-template :title="$t('moreSettings.paymentMethods')">
    <div class="payment-methods">
      <div class="main-container">
        <block-nav-back
          :to="localePath('/moresettings')"
          :text="$t('moreSettings.paymentMethods')"
          v-if="isMobile"
        />
        <div class="payment-methods__content">
          <div v-if="paymentList.length === 0" class="payment-methods__empty">
            <div class="payment-methods__empty-icon">
              <PaymentIcon />
            </div>
            <p class="payment-methods__empty-text">
              No Payment Methods Available
            </p>
          </div>

          <ul v-else class="payment-methods__list">
            <li
              v-for="method in paymentList"
              :key="method.id"
              class="payment-methods__card"
            >
              <div class="payment-methods__card-body">
                <h3 class="payment-methods__card-title">{{ method.bankName }}</h3>
                <p class="payment-methods__card-name">{{ method.fullName }}</p>
                <p class="payment-methods__card-info">{{ method.accountInfo }}</p>
                <p class="payment-methods__card-note">
                  {{ method.additionalInfo }}
                </p>
              </div>

              <nuxt-link
                v-if="isMobile"
                :to="localePath('/moresettings/payment-methods/edit')"
                class="payment-methods__card-edit"
              >
                <EditIcon />
              </nuxt-link>
              <button
                v-else
                @click="openEditModal"
                class="payment-methods__card-edit"
              >
                <EditIcon />
              </button>
              <button
                class="payment-methods__card-delete"
                @click="deleteMethods(method.id)"
              >
                <TrashIcon />
              </button>
            </li>
          </ul>

          <new-oracle-button
            v-if="isMobile"
            :to="localePath('/moresettings/payment-methods/add')"
            :text="$t('moreSettings.addPaymentMethod')"
            color="yellow"
          />
          <new-oracle-button
            v-else
            @click="openAddModal"
            :text="$t('moreSettings.addPaymentMethod')"
            color="yellow"
          />
        </div>
        <adresses-modal :is-visible="deleteModal" class="payment-methods__modal">
          <div class="modal-body">
            <!-- Icon -->
            <div class="modal__icon">
              <TrashIcon />
            </div>

            <!-- Title -->
            <h2 class="modal__title">Delete Payment Method</h2>

            <!-- Description -->
            <p class="modal__description">
              Are you sure you want to delete this payment method?<br />
              You won't be able to use it for future payouts.
            </p>
          </div>
          <div class="modal__actions">
            <new-oracle-button text="Delete it" @click="confirmDelete" />
            <new-oracle-button
              text="Back"
              color="yellow"
              @click=";(deleteModal = false), (delId = null)"
            />
          </div>
        </adresses-modal>

        <!-- Edit Modal for Desktop -->
        <bills-modal
          v-if="!isMobile"
          :is-open="isEditModalOpen"
          :title="$t('moreSettings.editPaymentMethod')"
          @close="closeEditModal"
          :max-width="'600px'"
        >
          <payment-method-edit-content :is-modal="true" />
        </bills-modal>

        <!-- Add Modal for Desktop -->
        <bills-modal
          v-if="!isMobile"
          :is-open="isAddModalOpen"
          :title="$t('moreSettings.addPaymentMethod')"
          @close="closeAddModal"
          :max-width="'600px'"
        >
          <payment-method-add-content 
            :is-modal="true" 
            @open-bank-info="openBankInfoModal"
          />
        </bills-modal>

        <!-- Bank Info Modal for Desktop -->
        <bills-modal
          v-if="!isMobile"
          :is-open="isBankInfoModalOpen"
          :title="$t('moreSettings.bankInfo')"
          @close="closeBankInfoModal"
          :max-width="'600px'"
        >
          <bank-info-content :is-modal="true" />
        </bills-modal>
      </div>
    </div>
  </more-settings-template>
</template>

<script setup lang="ts">
import PaymentIcon from '@/assets/svg/money-coin.svg?component'
import EditIcon from '@/assets/svg/pencil.svg?component'
import TrashIcon from '@/assets/svg/trash-2.svg?component'
import MoreSettingsTemplate from '~/widgets/moresettings/more-settings-template.vue'
import BillsModal from '@/components/bills-modal.vue'
import PaymentMethodEditContent from '~/widgets/moresettings/payment-method/payment-method-edit-content.vue'
import PaymentMethodAddContent from '~/widgets/moresettings/payment-method/payment-method-add-content.vue'
import BankInfoContent from '~/widgets/moresettings/payment-method/bank-info-content.vue'

definePageMeta({
  layout: 'sidebar',
})

const localePath = useLocalePath()

const windowWidth = ref(0)
const deleteModal = ref(false)
const delId = ref<number | null>(null)
const isEditModalOpen = ref(false)
const isAddModalOpen = ref(false)
const isBankInfoModalOpen = ref(false)

const isMobile = computed(() => windowWidth.value < 1024)

const paymentList = ref([
  {
    id: 1,
    bankName: 'Bank name',
    fullName: 'Name and surname',
    accountInfo: 'USD, 98938219321321321',
    additionalInfo: 'Additional information here',
  },
  {
    id: 2,
    bankName: 'Bank name',
    fullName: 'Name and surname',
    accountInfo: 'USD, 98938219321321321',
    additionalInfo: 'Additional information here',
  },
  {
    id: 3,
    bankName: 'Bank name',
    fullName: 'Name and surname',
    accountInfo: 'USD, 98938219321321321',
    additionalInfo: 'Additional information here',
  },
])

const handleResize = () => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    updateLayout()
  }
}

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? '' : 'sidebar'
  setPageLayout(newLayout)
}

const deleteMethods = (id: number) => {
  deleteModal.value = true
  delId.value = id
}

const confirmDelete = () => {
  paymentList.value = paymentList.value.filter((i) => i.id !== delId.value)
  deleteModal.value = false
}

const openEditModal = () => {
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const openAddModal = () => {
  isAddModalOpen.value = true
}

const closeAddModal = () => {
  isAddModalOpen.value = false
}

const openBankInfoModal = (item: any) => {
  closeAddModal()
  isBankInfoModalOpen.value = true
}

const closeBankInfoModal = () => {
  isBankInfoModalOpen.value = false
}

onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    updateLayout()
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss" scoped>
.payment-methods {
  .main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
    
    @media (min-width: 1024px) {
      max-width: 100%;
      padding: 0;
      min-height: auto;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 100%;
  }
  &__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 100%;
  }
  &__empty-text {
    margin-top: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #7a74ba;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__card {
    border: 1px solid #2b2741;
    border-radius: 12px;
    padding: 12px;
    position: relative;
    &-title {
      margin-bottom: 4px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 12px;
      line-height: 135%;
      color: #fff;
    }
    &-name {
      margin-bottom: 4px;
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #fff;
    }
    &-info {
      margin-bottom: 10px;
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #7a74ba;
    }
    &-note {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #fff;
    }
    &-edit {
      cursor: pointer;
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      padding: 0;
      color: inherit;
    }
    &-delete {
      cursor: pointer;
      position: absolute;
      bottom: 12px;
      right: 12px;
    }
  }
  .new-oracle-button {
    padding: 11px 0;
    line-height: 22px;
    @media (min-width: 1024px) {
      margin-top: 24px;
    }
  }
}
</style>
