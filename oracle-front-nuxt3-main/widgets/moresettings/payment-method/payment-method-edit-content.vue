<template>
  <div class="bank-info">
    <div class="main-container">
      <block-nav-back
        v-if="!isModal"
        :to="localePath('/moresettings/payment-methods')"
        :text="$t('moreSettings.paymentMethods')"
      />
      <form
        action=""
        class="bank-info__form"
        @submit="savePaymentMethod($event)"
      >
        <div class="bank-info__form--in">
          <div class="form-control">
            <input-oracle
              :v="name"
              type="text"
              :placeholder="$t('moreSettings.vakkoNikko')"
              :label="$t('moreSettings.paymentMethodName')"
              @changed="chaneName"
            />
          </div>
          <div class="form-control">
            <input-oracle
              :v="account"
              type="number"
              :placeholder="$t('moreSettings.accountNumber')"
              @changed="chaneAccount"
            />
          </div>
          <div class="form-control">
            <select-oracle
              selected-val="USDT"
              :data="data"
              @changed="changeCurrency"
            />
          </div>
          <div class="form-control">
            <textarea-oracle
              :placeholder="$t('moreSettings.additionalInformation')"
              :v="additional"
              @changed="changeAdditional"
            />
          </div>
        </div>
        <new-oracle-button
          :to="localePath('/moresettings/payment-methods')"
          :text="$t('moreSettings.confirm')"
          color="yellow"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isModal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isModal: false,
})

const localePath = useLocalePath()

const name = ref<string>('Vakko Nikko')
const account = ref<string>('28392189321321')
const currency = ref<string>('USD')
const additional = ref<string>('Good')

const data = [
  {
    id: 1,
    name: 'Litecoin',
    selected: false,
  },
  {
    id: 2,
    name: 'XRP',
    selected: false,
  },
  {
    id: 3,
    name: 'Bitcoin',
    selected: false,
  },
  {
    id: 4,
    name: 'Etherium',
    selected: false,
  },
  {
    id: 5,
    name: 'USDT',
    selected: false,
  },
  {
    id: 6,
    name: 'BNB',
    selected: false,
  },
]

const isFormValid = computed(() => {
  return name.value && account.value && currency.value && additional.value
})

const savePaymentMethod = (event: Event) => {
  event.preventDefault()
}

const chaneName = (val: string) => {
  name.value = val
}

const chaneAccount = (val: string) => {
  account.value = val
}

const changeCurrency = (val: string) => {
  currency.value = val
}

const changeAdditional = (val: string) => {
  additional.value = val
}
</script>

<style lang="scss">
.bank-info {
  .main-container {
    min-height: 100vh;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
    @media (min-width: 1024px) {
      min-height: auto;
      max-width: 100%;
      padding-bottom: 0;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    gap: 24px;
    &--in {
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1 1 100%;
      .form-control {
        position: relative;
        .input {
          input {
            background: #13121b;
            @media (min-width: 1024px) {
              background: #1B1A24;
            }
          }
        }
        .select-btn, .textarea-oracle textarea {
          @media (min-width: 1024px) {
            background: #1B1A24;
          }
        }
        &:nth-child(3) {
          z-index: 3;
        }
        &:nth-child(4) {
          z-index: 2;
        }
      }
    }
    .new-oracle-button {
      line-height: 22px;
      padding: 11px 0;
      &.black {
        background: #13121b;
        border: 2px solid #2b2741;
        border-radius: 14px;
        cursor: no-drop;
        &:hover {
          background: #13121b;
          box-shadow: none;
        }
      }
      &.yellow {
        border: 2px solid #f64e2a;
        border-radius: 14px;
        background: #f64e2a;
      }
    }
  }
}
</style> 