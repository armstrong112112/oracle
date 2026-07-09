<template>
  <div class="external-transfer__step-two">
    <div class="external-transfer__content">
      <div class="from-card">
        <h4 class="card-title">{{ $t('transfers.from') }}</h4>
        <p class="card-promocode">32189dhsajdHJd8923jKJDkds90232</p>
        <div class="coin-img">
          <CoinIcon />
        </div>
        <h2 class="coin-amount">100.00</h2>
        <h5 class="coin-to__usd">≈ $98.98</h5>
      </div>
      <div class="address-selected">
        <div class="left-block">
          <div class="coin-img">
            <CoinIcon />
          </div>
          <div class="address-info">
            <h5 class="address-code">92das8d9asdh89dsa8dupaosd2e32</h5>
            <h4 class="coin-name">Litecoin</h4>
          </div>
        </div>
        <button class="save-btn" @click="isSave = true">
          <SaveImg />
          {{ $t('transfers.save') }}
        </button>
      </div>
      <div class="transaction-summary">
        <div class="transaction-summary__fees">
          <h5 class="transaction-summary__label">{{ $t('transfers.fees') }}</h5>
          <h5 class="transaction-summary__amount">0.01%</h5>
        </div>
        <div class="transaction-summary__price">
          <h5 class="transaction-summary__label">
            {{ $t('transfers.amountReceived') }}
          </h5>
          <h5 class="transaction-summary__amount">98.09 USDT</h5>
        </div>
        <div class="transaction-summary__confirm">
          <button-oracle
            :to="localePath('/transfer/external-transfer?step=2')"
            :text="$t('transfers.confirm')"
            color="orange"
            @click="isConfirm = true"
          />
        </div>
      </div>
    </div>
    <adresses-modal
      class="transaction-confirmed__modal"
      :is-visible="isConfirm"
      @close="isConfirm = false"
    >
      <div class="modal-head">
        <div class="check-icon">
          <CheckIcon />
        </div>
        <h3 class="modal-title">{{ $t('transfers.transactionConfirmed') }}</h3>
        <div class="border-bottom">
          <svg
            width="290"
            height="2"
            viewBox="0 0 290 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H290" stroke="#443D69" stroke-dasharray="8 8" />
          </svg>
        </div>
      </div>
      <div class="user-info">
        <ul class="user-info__list">
          <li class="list-item">
            <div class="info-head">
              <h5 class="date">{{ $t('transfers.date') }}</h5>
              <h5 class="time">{{ $t('transfers.time') }}</h5>
            </div>
            <div class="info-bottom">
              <h5 class="date">Feb 20, 2025</h5>
              <h5 class="time">11:23 AM</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="amount">{{ $t('transfers.fromLabel') }}</h5>
            </div>
            <div class="info-bottom">
              <h2 class="coin-img">
                <CoinIcon />
              </h2>
              <h5 class="transfer-to__usd">2321sdsa3JKJjhkasdS32iosadA</h5>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="sent-to">{{ $t('transfers.sentTo') }}</h5>
            </div>
            <div class="info-bottom">
              <h2 class="coin-promocode">odsj2J9023jklLKD909210321312Das</h2>
              <button
                class="save-btn"
                @click=";(isSave = true), (isConfirm = false)"
              >
                <SaveImg />
                {{ $t('transfers.save') }}
              </button>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="sent-to">{{ $t('transfers.txId') }}</h5>
            </div>
            <div class="info-bottom">
              <h2 ref="textToCopyRef" class="coin-promocode">
                odsj2J9023jklLKD909210321312Das
              </h2>
              <button class="copy-btn" @click="copyText">
                <CopyIcon />
              </button>
            </div>
          </li>
          <li class="list-item">
            <div class="info-head">
              <h5 class="amount">{{ $t('transfers.amountReceived') }}</h5>
            </div>
            <div class="info-bottom">
              <h2 class="amount-coin">100 USDT</h2>
              <h5 class="transfer-to__usd">≈ $98.98</h5>
            </div>
          </li>
        </ul>
      </div>
      <div class="transaction-summary">
        <div class="transaction-summary__fees">
          <h5 class="transaction-summary__label">{{ $t('transfers.fees') }}</h5>
          <h5 class="transaction-summary__amount">0.01%</h5>
        </div>
        <div class="transaction-summary__price">
          <h5 class="transaction-summary__label">
            {{ $t('transfers.pricePer') }}
          </h5>
          <h5 class="transaction-summary__amount">0.001 BTC (≈ $1.06)</h5>
        </div>
      </div>
    </adresses-modal>
    <adresses-modal
      class="payment-error-modal"
      :is-visible="isPaymentError"
      @close="isPaymentError = false"
    >
      <div class="payment-error__head">
        <ErrorIcon />
        <h2 class="modal-title">
          {{ $t('transfers.weCouldntProcessPayment') }}
        </h2>
        <p class="modal-description">
          {{ $t('transfers.transactionCouldntBeProcessed') }}
        </p>
        <p class="modal-description">{{ $t('transfers.pleaseTryAgain') }}</p>
      </div>
      <div class="modal-buttons">
        <button-oracle
          :text="$t('transfers.tryAgain')"
          color="gray"
          @click="isPaymentError = false"
        />
        <button-oracle
          :text="$t('transfers.okay')"
          color="orange"
          @click="isPaymentError = false"
        />
      </div>
    </adresses-modal>
    <adresses-modal
      class="save-modal"
      :is-visible="isSave"
      @close="isSave = false"
    >
      <div class="save-modal__head">
        <h2 class="modal-title">{{ $t('transfers.saveAddress') }}</h2>
        <p class="modal-description">
          {{ $t('transfers.assignNameToAddress') }}
        </p>
        <input-oracle :placeholder="$t('transfers.name')" />
      </div>
      <div class="modal-buttons">
        <button-oracle
          :text="$t('transfers.close')"
          color="gray"
          @click="isSave = false"
        />
        <button-oracle
          :text="$t('transfers.saveAddressButton')"
          color="orange"
          @click="isSave = false"
        />
      </div>
    </adresses-modal>
  </div>
</template>

<script setup lang="ts">
import CoinIcon from '@/assets/svg/usdt.svg?component'
import SaveImg from '@/assets/svg/bookmark.svg?component'
import CheckIcon from '@/assets/svg/transaction-check.svg?component'
import ErrorIcon from '@/assets/svg/payment-error.svg?component'
import CopyIcon from '@/assets/svg/moresettings/copy.svg?component'

const localePath = useLocalePath()

// Reactive state
const isSave = ref(false)
const isConfirm = ref(false)
const isPaymentError = ref(false)
const textToCopyRef = ref<HTMLElement | null>(null)

// Methods
const copyText = (): void => {
  const el = textToCopyRef.value
  if (!el) return
  const text = el.innerText
  navigator.clipboard.writeText(text)
  const range = document.createRange()
  range.selectNodeContents(el)
  const selection = window.getSelection()
  if (selection) {
    selection.removeAllRanges()
    selection.addRange(range)
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/components/transfer/external/step-two.scss' as *;
</style>
