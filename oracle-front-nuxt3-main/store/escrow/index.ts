import { defineStore } from 'pinia'
import  type { User } from '@/entities/escrow/data/users'

interface Crypto {
  id: number
  title: string
  checked: boolean
  icon: string
}

export const useEscrowStore = defineStore('escrow', () => {
  // State
  const profile = ref({
    role: 'Customer',
    categories: [] as { id: number; title: string }[],
    selectedUser: null as User | null,
    selectedCrypto: null as Crypto | null,
    inputAmount: '0' as string,
    description: '' as string,
  })

  // Actions (formerly mutations)
  const setEscrow = (data: {
    role?: string
    categories?: { id: number; title: string }[]
    selectedUser?: User | null
    selectedCrypto?: Crypto | null
    inputAmount?: string
    description?: string
  }) => {
    if (data.role !== undefined) {
      profile.value.role = data.role
    }
    if (data.categories !== undefined) {
      profile.value.categories = data.categories
    }
    if (data.selectedUser !== undefined) {
      profile.value.selectedUser = data.selectedUser
    }
    if (data.selectedCrypto !== undefined) {
      profile.value.selectedCrypto = data.selectedCrypto
    }
    if (data.inputAmount !== undefined) {
      profile.value.inputAmount = data.inputAmount
    }
    if (data.description !== undefined) {
      profile.value.description = data.description
    }
  }

  return {
    // State
    profile,
    // Actions
    setEscrow
  }
})
