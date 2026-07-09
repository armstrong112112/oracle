<template>
  <div class="pin-code-change-content">
    <form class="pin-code-change-content__form">
      <p class="pin-code-change-content__description">
        {{ $t('moreSettings.enterPinToRemoveOrSetNew') }}
      </p>
      <div class="input-group">
        <input-oracle type="text" :ispin="true" @openPinCode="openPinCode" />
      </div>
      <div v-if="isOpenCode" class="pin-code-change-content__button">
        <new-oracle-button 
          :text="$t('moreSettings.removePin')" 
          @click="handleRemovePin"
        />
        <new-oracle-button
          :text="$t('moreSettings.updatePin')"
          color="yellow"
          @click="handleUpdatePin"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isModal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isModal: false,
})

const emit = defineEmits<{
  'pin-removed': []
  'pin-update-requested': []
}>()

// Reactive state
const isOpenCode = ref<boolean>(false)

// Methods
const openPinCode = (pin: string[]) => {
  isOpenCode.value = pin.every((val) => val.trim() !== '')
}

const handleRemovePin = () => {
  if (props.isModal) {
    emit('pin-removed')
  }
}

const handleUpdatePin = () => {
  if (props.isModal) {
    emit('pin-update-requested')
  }
}
</script>

<style lang="scss" >
.pin-code-change-content {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__description {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 130%;
    text-align: center;
    color: #fff;
  }

  .input-group {
    display: flex;
    gap: 16px;
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }

  &__button {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .new-oracle-button {
      line-height: 22px;
      padding: 9.5px;
      border: 2px solid #2b2741;
      border-radius: 14px;
      box-sizing: border-box;
      
      &.black {
        background: #13121b;
        color: #67639a;
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