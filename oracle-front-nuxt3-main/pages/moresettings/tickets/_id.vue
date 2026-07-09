<template>
  <ticket-detail-content :ticket="ticket" :is-modal="false" />
</template>

<script setup lang="ts">
import TicketDetailContent from '~/widgets/moresettings/tickets/ticket-detail-content.vue'

const route = useRoute()

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

const tickets = ref<TicketGroup[]>([
  {
    date: 'March 20, 2025',
    tickets: [
      {
        id: '101010101',
        title: 'Ticket title',
        time: '12:03',
        status: 'Active',
      },
      {
        id: '101010102',
        title: 'Ticket title',
        time: '12:03',
        status: 'Closed',
      },
      {
        id: '101010103',
        title: 'Ticket title',
        time: '12:03',
        status: 'Closed',
      },
      {
        id: '101010104',
        title: 'Ticket title',
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
        title: 'Ticket title',
        time: '12:03',
        status: 'Active',
      },
      {
        id: '101010106',
        title: 'Ticket title',
        time: '12:03',
        status: 'Closed',
      },
    ],
  },
])

const ticketId = computed(() => route.params.id as string)

const ticket = computed((): Ticket | null => {
  let foundTicket: Ticket | null = null
  for (const group of tickets.value) {
    foundTicket = group.tickets.find((t) => t.id === ticketId.value) || null
    if (foundTicket) break
  }
  return foundTicket
})
</script>


