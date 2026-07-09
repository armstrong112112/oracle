<template>
  <ul class="active-session__list">
    <li
      v-for="session in sessions"
      :key="session.id"
      class="list-item"
    >
      <div
        class="accordion-btn"
        :class="{ show: session.active }"
        @click="toggleSession(session.id)"
      >
        <div class="left-block">
          <div class="session-icon">
            <mobileIcon />
          </div>
          <p class="session-title">{{ session.title }}</p>
        </div>
        <div class="arrown-icon">
          <arrowIcon />
        </div>
      </div>
      <div class="terminal-session" :class="{ show: session.active }">
        <div class="terminal-session-in">
          <button class="current-session">Current session</button>
          <button
            class="terminate-access"
            @click="terminateSession(session.id)"
          >
            Terminate Access
          </button>
        </div>
      </div>
    </li>
    <li
      v-if="sessions.length > 0"
      class="list-item terminate-all-sessions"
    >
      <button
        class="terminate-all-sessions__btn"
        @click="terminateAllSessions"
      >
        Terminate All the Sessions
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import mobileIcon from '@/assets/svg/mobile-icon.svg?component'
import arrowIcon from '@/assets/svg/arrow-back.svg?component'

interface Session {
  id: number
  title: string
  active: boolean
}

interface Props {
  sessions: Session[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:sessions': [sessions: Session[]]
}>()

const toggleSession = (id: number) => {
  const updatedSessions = props.sessions.map(session => ({
    ...session,
    active: session.id === id ? !session.active : false
  }))
  emit('update:sessions', updatedSessions)
}

const terminateSession = (id: number) => {
  const updatedSessions = props.sessions.filter(session => session.id !== id)
  emit('update:sessions', updatedSessions)
}

const terminateAllSessions = () => {
  emit('update:sessions', [])
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/widgets/active-sessions.scss" as *;
</style>