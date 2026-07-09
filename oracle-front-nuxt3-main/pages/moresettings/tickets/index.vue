<template>
  <more-settings-template :title="$t('moreSettings.tickets')">
    <div class="tickets">
      <div class="main-container">
        <block-nav-back
          :text="$t('moreSettings.tickets')"
          :to="localePath('/moresettings')"
          :add="true"
          v-if="isMobile"
        />

        <!-- Filter -->
        <div class="tickets__filter">
          <button
            v-for="option in filterOptions"
            :key="option"
            class="tickets__filter-button"
            :class="{
              'tickets__filter-button--active': selectedFilter === option,
            }"
            @click="selectFilter(option)"
          >
            {{ $t(option) }}
          </button>
        </div>

        <!-- Ticket List -->
        <div
          v-for="(group, index) in filteredTicketGroups"
          :key="index"
          class="tickets__group"
        >
          <h2 class="tickets__date">{{ group.date }}</h2>
          <ul class="tickets__items">
            <li v-for="(ticket, i) in group.tickets" :key="i">
              <component
                :is="!isMobile ? 'div' : 'nuxt-link'"
                :to="localePath(`/moresettings/tickets/${ticket.id}`)"
                @click="!isMobile ? openTicketModal(ticket) : null"
                class="tickets__card"
              >
                <p class="tickets__card-id">
                  <strong>{{ $t('moreSettings.id') }}</strong> #{{ ticket.id }}
                </p>
                <p class="tickets__card-title">{{ $t(ticket.title) }}</p>
                <time class="tickets__card-time">{{ ticket.time }}</time>
                <span
                  class="tickets__card-status"
                  :class="{
                    'tickets__card-status--active': ticket.status === 'Active',
                    'tickets__card-status--closed': ticket.status === 'Closed',
                  }"
                >
                  {{ $t(ticket.status) }}
                </span>
              </component>
            </li>
          </ul>
        </div>

        <!-- Ticket Modal for Desktop -->
        <bills-modal
          v-if="!isMobile"
          :is-open="isModalOpen"
          :title="$t('moreSettings.ticket') + ' #' + selectedTicket?.id"
          @close="closeTicketModal"
          :max-width="'500px'"
        >
          <ticket-detail-content :ticket="selectedTicket" :is-modal="true" />
        </bills-modal>
      </div>
    </div>
  </more-settings-template>
</template>

<script setup lang="ts">
import addCircleIcon from '@/assets/svg/moresettings/add-circle.svg?component'
import MoreSettingsTemplate from '~/widgets/moresettings/more-settings-template.vue'
import BillsModal from '@/components/bills-modal.vue'
import TicketDetailContent from '~/widgets/moresettings/tickets/ticket-detail-content.vue'

interface Ticket {
  id: string
  title: string
  time: string
  status: string
}

interface TicketGroup {
  date: string
  tickets: Ticket[]
}

definePageMeta({
  layout: 'sidebar',
})

const localePath = useLocalePath()

const windowWidth = ref(0)
const selectedFilter = ref<string>('moreSettings.all')
const isModalOpen = ref(false)
const selectedTicket = ref<Ticket | null>(null)
const filterOptions = ['moreSettings.all', 'moreSettings.active', 'moreSettings.closed']

const ticketGroups = ref<TicketGroup[]>([
  {
    date: 'March 20, 2025',
    tickets: [
      {
        id: '101010101',
        title: 'moreSettings.ticketTitle',
        time: '12:03',
        status: 'Active',
      },
      {
        id: '101010102',
        title: 'moreSettings.ticketTitle',
        time: '12:03',
        status: 'Closed',
      },
      {
        id: '101010103',
        title: 'moreSettings.ticketTitle',
        time: '12:03',
        status: 'Closed',
      },
      {
        id: '101010104',
        title: 'moreSettings.ticketTitle',
        time: '12:03',
        status: 'Active',
      },
    ],
  },
  {
    date: 'March 20, 2025',
    tickets: [
      {
        id: '101010105',
        title: 'moreSettings.ticketTitle',
        time: '12:03',
        status: 'Active',
      },
      {
        id: '101010106',
        title: 'moreSettings.ticketTitle',
        time: '12:03',
        status: 'Closed',
      },
    ],
  },
])

const isMobile = computed(() => windowWidth.value < 1024)

const filteredTicketGroups = computed((): TicketGroup[] => {
  if (selectedFilter.value === 'moreSettings.all') {
    return ticketGroups.value
  }

  return ticketGroups.value
    .map((group) => ({
      date: group.date,
      tickets: group.tickets.filter(
        (ticket) => ticket.status === selectedFilter.value,
      ),
    }))
    .filter((group) => group.tickets.length > 0)
})

const handleResize = () => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    updateLayout()
  }
}

const updateLayout = () => {
  const newLayout = windowWidth.value < 1024 ? '' : 'sidebar'
  setPageLayout(newLayout)
}

const selectFilter = (option: string): void => {
  selectedFilter.value = option
}

const openTicketModal = (ticket: Ticket): void => {
  selectedTicket.value = ticket
  isModalOpen.value = true
}

const closeTicketModal = (): void => {
  isModalOpen.value = false
  selectedTicket.value = null
}

onMounted(() => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
    updateLayout()
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss" scoped>
.tickets {
  .main-container {
    @media (min-width: 1024px) {
      max-width: 100%;
      padding: 0;
    }
  }
  
  &__filter {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    &-button {
      width: 40px;
      position: relative;
      padding-bottom: 6px;
      cursor: pointer;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      text-align: center;
      color: #fff;
      &::after {
        content: '';
        width: 0;
        height: 2px;
        border-radius: 10px;
        background: #f64e2a;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
      &--active {
        color: #f64e2a;
        &::after {
          width: 100%;
        }
      }
    }
  }
  &__date {
    margin-bottom: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__items {
    margin-bottom: 24px;
  }
  &__card {
    display: block;
    width: calc(100% + 32px);
    border-bottom: 1px solid #2b2741;
    padding: 12px 16px;
    position: relative;
    margin-left: -16px;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
    &-id {
      margin-bottom: 8px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 10px;
      line-height: 130%;
      color: #7a74ba;
    }
    &-title {
      margin-bottom: 4px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-time {
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 12px;
      line-height: 135%;
      color: #7a74ba;
    }
    &-status {
      padding: 5.5px 10px;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 12px;
      line-height: 145%;
      position: absolute;
      right: 16px;
      bottom: 22px;
      &--active {
        background: #31f62a;
        color: #000;
      }
      &--closed {
        background: #292929;
        color: #f2ff00;
      }
    }
  }
}
</style>
