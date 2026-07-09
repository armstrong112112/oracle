<template>
  <div class="checks-list">
    <div v-for="(check, index) in checks" :key="index" class="check-item">
      <!-- Мобильная версия - ссылка -->
      <nuxt-link
        v-if="isMobile"
        :to="localePath('/checks/check-creation/check-details')"
        class="check-item__link">
        <div class="check-item__in">
          <div class="checks-info">
            <span class="check-amount">{{ check.amount }}</span>
            <span class="check-usdvalue"> ≈ {{ check.usdValue }} </span>
          </div>
        </div>
        <div class="check-item__in">
          <div class="checks-info">
            {{ $t("checks.remainingActivations") }}
            <span class="check-remaining">
              {{ check.remaining }}
            </span>
          </div>
          <div class="checks-info">
            {{ $t("checks.perActivation") }}
            <span class="item">
              <span class="check-per__activation">
                {{ check.perActivation }}
              </span>
              <span class="check-rate"> ≈ {{ check.rate }} </span>
            </span>
          </div>
        </div>
        <div class="check-item__in">
          <div class="checks-info">
            <span
              class="check-status"
              :class="check.status === 'Claimed' ? 'claimed' : 'unclaimed'">
              {{ check.status }}
            </span>
          </div>
          <div class="checks-info">
            Created On:
            <span class="check-createdOn"> ≈ {{ check.createdOn }}</span>
          </div>
        </div>
      </nuxt-link>

      <!-- Десктопная версия - кнопка для открытия модального окна -->
      <button
        v-else
        class="check-item__button"
        @click="openCheckDetailsModal(check)">
        <div class="check-item__in">
          <div class="checks-info">
            <span class="check-amount">{{ check.amount }}</span>
            <span class="check-usdvalue"> ≈ {{ check.usdValue }} </span>
          </div>
        </div>
        <div class="check-item__in">
          <div class="checks-info">
            {{ $t("checks.remainingActivations") }}
            <span class="check-remaining">
              {{ check.remaining }}
            </span>
          </div>
          <div class="checks-info">
            {{ $t("checks.perActivation") }}
            <span class="item">
              <span class="check-per__activation">
                {{ check.perActivation }}
              </span>
              <span class="check-rate"> ≈ {{ check.rate }} </span>
            </span>
          </div>
        </div>
        <div class="check-item__in">
          <div class="checks-info">
            <span
              class="check-status"
              :class="check.status === 'Claimed' ? 'claimed' : 'unclaimed'">
              {{ check.status }}
            </span>
          </div>
          <div class="checks-info">
            Created On:
            <span class="check-createdOn"> ≈ {{ check.createdOn }}</span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CheckItem } from "~/entities/checks/model/checks.types";

const localePath = useLocalePath()

interface Props {
  checks: CheckItem[]
}

defineProps<Props>()

const emit = defineEmits<{ 'open-check-details': [check: CheckItem] }>()

const windowWidth = ref(1920)

const isMobile = computed((): boolean => {
  return windowWidth.value < 1024
})

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

const openCheckDetailsModal = (check: CheckItem) => {
  emit('open-check-details', check)
}

onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss">
@use "@/assets/styles/components/checks/check-list.scss" as *;

.check-item {
  &__button {
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-align: left;
    color: inherit;
    font-family: inherit;

    &:hover {
      opacity: 0.8;
    }
  }

  &__link {
    display: block;
    text-decoration: none;
    color: inherit;
  }
}
</style>
