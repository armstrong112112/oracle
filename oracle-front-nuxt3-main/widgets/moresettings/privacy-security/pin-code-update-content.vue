<template>
  <div class="pin-code-update-content">
    <form class="pin-code-update-content__form">
      <div class="input-group">
        <input-oracle type="text" :ispin="true" @openPinCode="openPinCode" />
      </div>
      <div class="pin-code-update-content__button">
        <new-oracle-button
          :text="$t('moreSettings.setUp')"
          :color="isOpenCode ? 'yellow' : 'black'"
          @click="handleSetup"
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
  'pin-updated': []
}>()

// Reactive state
const isOpenCode = ref<boolean>(false)

// Methods
const openPinCode = (pin: string[]) => {
  isOpenCode.value = pin.every((val) => val.trim() !== '')
}

const handleSetup = () => {
  if (isOpenCode.value && props.isModal) {
    emit('pin-updated')
  }
}
</script>

<style lang="scss">
.pin-code-update-content {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .input-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }

  &__button {
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