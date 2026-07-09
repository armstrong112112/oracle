<template>
  <div class="container">
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

// Use localePath if needed
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

// Reactive state
const step = ref(1)

// Methods
const updateStepFromRoute = () => {
  const stepParam = route.query.step
  if (stepParam && [1, 2, 3, 4].includes(Number(stepParam))) {
    step.value = Number(stepParam)
  }
}

const goToStep = (newStep: number) => {
  if (newStep >= 1 && newStep <= 4) {
    step.value = newStep
    router.push({
      path: localePath('/checks/check-creation'),
      query: { step: String(newStep) },
    })
  }
}

// Lifecycle hooks
onMounted(() => {
  updateStepFromRoute()
})
</script>

<style lang="scss">
.create-checks {
  max-width: 375px;
  margin: 0 auto;
  min-height: calc(100vh);
  padding: 0 16px 24px;
}
</style>
