<template>
  <div class="check-details">
    <div class="check-details__content">
    <!-- ????????? (?????? ??? ????????, ?? ??? ?????????? ????) -->
    <block-nav-back
      v-if="!isModal"
      :text="$t('checks.checkNumber')"
      :to="localePath('/checks/check-creation?step=1')"
    />
    
    <div class="qr-code">
      <img :src="'/png/qr-code.png'" alt="" />
    </div>
    <input-oracle
      v-if="isMobile"
      :deactivated="true"
      :copy="true"
      :share="true"
      :v="shareUrl"
      @shareContent="shareContent"
    />
    <div class="total-ammount">
      <h5 class="total-ammount__title">{{ $t('checks.totalAmount') }}</h5>
      <h3 class="ammount-coin">
        {{ check?.amount || '100 USDT' }}
        <span class="coin-covert">{{ $t('checks.usdConversion') }}</span>
      </h3>
      <div class="activation-details">
        <div class="activation-labels">
          <p class="label">{{ $t('checks.remainingActivations') }}</p>
          <p class="label">{{ $t('checks.perActivation') }}</p>
        </div>

        <div class="activation-values">
          <p class="remaining-count">{{ check?.remaining || '5 of 10' }}</p>
          <p class="per-activation">
            {{ check?.perActivation || '0.5 BTC' }} <span>{{ $t('checks.btcConversion') }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="check-details__info">
      <div class="check-details__accordion">
        <button
          class="accordion-btn"
          :class="{ active: isOpen }"
          @click="isOpen = !isOpen"
        >
          <span>{{ $t('checks.activationHistory') }}</span>
          <span class="arrown-icon">
            <ArrowIcon />
          </span>
        </button>
        <transition name="accordion">
          <div v-show="isOpen" class="accordion-body">
            <ul class="body-list">
              <li v-for="item in 3" :key="item" class="list-item">
                <div class="list-item__head">
                  <p class="list-num">{{ item }}</p>
                  <div class="user-img">
                    <img src="/png/zaglushka.png" alt="" />
                  </div>
                  <h3 class="user-name">
                    {{ $t('checks.barbaraMartinez') }}
                  </h3>
                  <div class="right-block">
                    <p class="coin-amound">0,0244 LTC</p>
                    <p class="coin-convert">
                      {{ $t('checks.ltcConversion') }}
                    </p>
                  </div>
                </div>
                <p class="create-date">Dec 12, 2025 at 12:32 AM</p>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <div class="check-details__bottom">
      <UrlDisplay 
        v-if="!isMobile"
        :url="shareUrl" 
        :placeholder="$t('checks.fillCheckNumber')"
      />
      <new-oracle-button
        :text="$t('checks.claimCheck')"
        color="yellow"
        @click="status = true"
      />
    </div>

    <!-- ????????? ???? ????????? ???????? ???? -->
    <adresses-modal :is-visible="status" class="check-created__successfully">
      <div class="modal-head">
        <div class="icon">
          <SuccessfullIcon />
        </div>
        <h3 class="modal-title">{{ $t('checks.checkCreatedSuccessfully') }}</h3>
      </div>
          <div class="qr-code">
      <img :src="'/png/qr-code.png'" alt="" />
    </div>
    <UrlDisplay 
      :url="shareUrl" 
      :placeholder="$t('checks.fillCheckNumber')"
    />
      <div class="total-amount">
        <h4 class="amount-title">{{ $t('checks.totalAmountModal') }}</h4>
        <p class="amount-description">
          {{ $t('checks.activationsAvailable') }}
        </p>
        <p class="amount-description">{{ $t('checks.perActivationModal') }}</p>
      </div>
      <new-oracle-button :text="$t('checks.returnToWallet')" color="yellow" />
    </adresses-modal>

    <!-- ????????? ???? ?????? -->
    <adresses-modal
      :is-visible="false"
      class="check-created__successfully error-modal"
    >
      <div class="modal-in">
        <div class="modal-head">
          <div class="icon">
            <ErrorIcon />
          </div>
          <h3 class="modal-title">{{ $t('checks.checkCreationFailed') }}</h3>
        </div>
        <div class="modal-body">
          <p class="body-title">{{ $t('checks.reason') }}</p>
          <p class="body-description">
            {{ $t('checks.networkError') }}
          </p>
          <p class="body-description">
            {{ $t('checks.tryAgain') }}
          </p>
        </div>
      </div>
      <new-oracle-button :text="$t('checks.returnToWallet')" color="yellow" />
    </adresses-modal>
  </div>
  </div>
</template>

<script setup lang="ts">
import type { CheckItem } from '~/entities/checks/model/checks.types'
import ArrowIcon from '@/assets/svg/arrow-back.svg?component'
import UrlDisplay from '~/components/ui/UrlDisplay.vue'
import SuccessfullIcon from '@/assets/svg/checks-succesfull.svg?component'
import ErrorIcon from '@/assets/svg/check-error.svg?component'

const localePath = useLocalePath()

interface Props {
  check?: CheckItem | null
  isModal?: boolean
}

withDefaults(defineProps<Props>(), {
  check: null,
  isModal: false,
})

const isOpen = ref(true)
const status = ref(false)
const shareUrl = ref('https://oraclehub.su/check382941940509230950923450-92345-923-050-23403240324095?2390')
const windowWidth = ref(0)

const isMobile = computed((): boolean => {
  return windowWidth.value < 1024
})

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

const shareContent = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        url: shareUrl.value,
      })
    } catch (error) {
      console.error(error)
    }
  }
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss">
@use '@/assets/styles/pages/_check-details.scss' as *;
</style>
