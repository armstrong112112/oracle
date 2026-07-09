<template>
  <ul class="additional-security__list">
    <li
      v-for="(card, index) in cards"
      :key="index"
      class="list-item additional-security__card border-gradient"
    >
      <div class="left-blur"></div>
      <div class="card-in">
        <div class="card-body">
          <div class="left-block">
            <h5 class="card-title">{{ card.title }}</h5>
            <div class="card-description">
              <p class="card-description__text">
                {{ card.description }}
              </p>
              <button class="info-icon">
                <infoCircleIcon />
                <div class="info-text">{{ card.infoText }}</div>
              </button>
            </div>
          </div>
          <div class="additional-security__status">
            <div v-if="card.isActive" class="status-active">
              <tickCircleIcon />
            </div>
            <div v-else class="status-inactive">
              <closeCircleIcon />
            </div>
          </div>
        </div>
        <p v-if="card.details" class="card-text__orange">{{ card.details }}</p>
        <button-oracle
          :text="card.isActive ? card.buttonTextActive : card.buttonTextNoActive"
          color="orange"
          :to="card.isActive ? card.routeActive : card.routeNoActive"
        />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import infoCircleIcon from '@/assets/svg/info-circle.svg?component'
import tickCircleIcon from '@/assets/svg/tick-circle.svg?component'
import closeCircleIcon from '@/assets/svg/close-circle.svg?component'

interface Card {
  title: string
  description: string
  infoText: string
  isActive: boolean
  details?: string
  buttonTextActive: string
  buttonTextNoActive: string
  routeActive: string
  routeNoActive: string
}

interface Props {
  cards: Card[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
@use "@/assets/styles/widgets/security-card-list.scss" as *;
</style>