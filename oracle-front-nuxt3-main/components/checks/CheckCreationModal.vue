<template>
  <div class="check-creation-modal">
    <div v-if="step === 1" class="create-checks">
      <StepOne @nextStep="goToStep(step + 1)" @prevStep="goToStep(step - 1)" />
    </div>

    <div v-if="step === 2" class="create-checks">
      <StepTwo @prevStep="goToStep(step - 1)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StepOne from '~/components/checks/step-one.vue'
import StepTwo from '~/components/checks/step-two.vue'

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

// Reactive state
const step = ref(1)
const windowWidth = ref(0)

// Computed
const isMobile = computed((): boolean => {
  return windowWidth.value < 1024
})

// Methods
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

const updateStepFromRoute = () => {
  const stepParam = route.query.step
  if (stepParam && [1, 2, 3, 4].includes(Number(stepParam))) {
    step.value = Number(stepParam)
  } else {
    // Если нет параметра step в URL, устанавливаем шаг 1
    step.value = 1
  }
}

const goToStep = (newStep: number) => {
  console.log('goToStep called with:', newStep)
  if (newStep >= 1 && newStep <= 4) {
    console.log('Setting step to:', newStep)
    step.value = newStep
    
    // Переходим по ссылке только на мобильных устройствах
    if (isMobile.value) {
      console.log('Navigating to step:', newStep)
      router.push({
        path: localePath('/checks/check-creation'),
        query: { step: String(newStep) },
      })
    }
  }
}

// Lifecycle hooks
onMounted(() => {
  updateStepFromRoute()
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
  
  // Слушаем изменения маршрута
  router.afterEach(() => {
    updateStepFromRoute()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.check-creation-modal {
  .create-checks {
    max-width: 100%;
    margin: 0 auto;
    min-height: auto;
    padding: 0;
  }
}
</style> 