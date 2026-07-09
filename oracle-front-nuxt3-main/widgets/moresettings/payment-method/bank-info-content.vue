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
            <select-oracle :data="data" @changed="changeCurrency" />
          </div>
          <div class="form-control">
            <select-oracle :data="data" @changed="changeCurrency" />
          </div>
          <div class="form-control">
            <textarea-oracle
              :placeholder="$t('moreSettings.additionalInformation')"
              @changed="changeAdditional"
            />
          </div>
        </div>
        <new-oracle-button
          :to="!isFormValid ? '' : localePath('/moresettings/payment-methods')"
          :text="$t('moreSettings.confirm')"
          :color="!isFormValid ? 'black' : 'yellow'"
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

const name = ref<string>('')
const account = ref<string>('')
const currency = ref<string>('')
const additional = ref<string>('')

const data = [
  {
    id: 1,
    name: 'Litecoin',
  },
  {
    id: 2,
    name: 'XRP',
  },
  {
    id: 3,
    name: 'Bitcoin',
  },
  {
    id: 4,
    name: 'Etherium',
  },
  {
    id: 5,
    name: 'USDT',
  },
  {
    id: 6,
    name: 'BNB',
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