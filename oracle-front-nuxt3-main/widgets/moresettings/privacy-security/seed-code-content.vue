<template>
  <div class="seed-code-content">
    <div class="seed-code-content__head">
      <h2 class="seed-code-content__title">
        {{ $t('moreSettings.yourRecoveryPhrase') }}
      </h2>
      <p class="seed-code-content__description">
        {{ $t('moreSettings.seedCheckConfirms') }} <br />
        {{ $t('moreSettings.yourSeedPhrase') }}
      </p>
      <SeedCodeList :words="seedWords" @update:words="handleWordsUpdate" />
    </div>
    <div class="seed-code-content__button">
      <new-oracle-button
        :text="$t('moreSettings.verify')"
        :color="selectedOrder.length > 0 ? 'yellow' : 'black'"
        @click="handleVerify"
      />
    </div>

    <VerificationModal
      :is-visible="isFailed"
      type="failed"
      @close="isFailed = false"
      @contact-support="contactSupport"
    />

    <VerificationModal
      :is-visible="isSuccesfull"
      type="success"
      @close="isSuccesfull = false"
    />
  </div>
</template>

<script setup lang="ts">
import VerificationModal from '@/widgets/moresettings/privacy-security/seed-code/VerificationModal/index.vue'
import SeedCodeList from '@/widgets/moresettings/privacy-security/seed-code/SeedCodeList/index.vue'

interface SeedWord {
  id: number
  selected: string
  name: string
}

interface Props {
  isModal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isModal: false,
})

const emit = defineEmits<{
  'verification-completed': [order: string[]]
  'contact-support': []
}>()

const isFailed = ref(false)
const isSuccesfull = ref(false)
const seedWords = ref<SeedWord[]>([
  { id: 1, selected: '', name: 'apple' },
  { id: 2, selected: '', name: 'bridge' },
  { id: 3, selected: '', name: 'cradle' },
  { id: 4, selected: '', name: 'dream' },
  { id: 5, selected: '', name: 'Nikol' },
  { id: 6, selected: '', name: 'forest' },
  { id: 7, selected: '', name: 'gadget' },
  { id: 8, selected: '', name: 'honey' },
  { id: 9, selected: '', name: 'island' },
  { id: 10, selected: '', name: 'journey' },
  { id: 11, selected: '', name: 'knife' },
  { id: 12, selected: '', name: 'logic' },
  { id: 13, selected: '', name: 'Okay' },
  { id: 14, selected: '', name: 'Varchahd' },
  { id: 15, selected: '', name: 'eagle' },
])

const selectedOrder = computed((): string[] => {
  return seedWords.value
    .filter((word) => word.selected)
    .sort((a, b) => parseInt(a.selected) - parseInt(b.selected))
    .map((word) => word.name)
})

const handleWordsUpdate = (updatedWords: SeedWord[]) => {
  seedWords.value = updatedWords
}

const handleVerify = () => {
  if (selectedOrder.value.length > 0) {
    // Здесь должна быть логика проверки seed-фразы
    // Для примера просто показываем успешное сообщение
    isSuccesfull.value = true
    // Или ошибочное, если проверка не прошла:
    // isFailed.value = true
    
    if (props.isModal) {
      emit('verification-completed', selectedOrder.value)
    }
  }
}

const contactSupport = () => {
  // Логика обращения в поддержку
  console.log('Contact support')
  if (props.isModal) {
    emit('contact-support')
  }
}
</script>

<style lang="scss" scoped>
.seed-code-content {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  gap: 24px;
  
  &__form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1 1 100%;
    height: 100%;
  }
  &__head {
    flex: 1 1 100%;
    padding-top: 14px;
  }

  &__title {
    margin-bottom: 8px;
    font-family: 'Hector', sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    text-align: center;
    color: #fff;
  }

  &__description {
    margin-bottom: 38px;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 130%;
    text-align: center;
    color: #fff;
  }

  &__button {
    .new-oracle-button {
      line-height: 22px;
      padding: 11px;
      border: 2px solid #2b2741;
      border-radius: 14px;
      color: #fff;
      &.black {
        background: #13121b;
        color: #67639a;
        cursor: no-drop;
        &:hover {
          background: #13121b;
          box-shadow: none;
        }
      }
      &.yellow {
        border-color: #f64e2a;
      }
    }
  }
}
</style> 