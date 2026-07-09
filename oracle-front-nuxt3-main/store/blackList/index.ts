import { defineStore } from 'pinia'
import type { BlackListDetailData, BlackListSubjectData } from './blackList.types'

// Helper functions
function checkSubjectValid(data: BlackListSubjectData): boolean {
  return (
    !!data.complaintType &&
    !!data.violationType &&
    !!data.username?.trim() &&
    !!data.profileUrl?.trim() &&
    !!data.email?.trim()
    // telegram va website optional bo'lsa, ularni qo'shmaslik mumkin
  )
}

function checkDetailValid(data: BlackListDetailData): boolean {
  return !!data.header?.trim() && !!data.description?.trim()
}

export const useBlackListStore = defineStore('blackList', () => {
  // State
  const subjectData = ref<BlackListSubjectData>({
    complaintType: null,
    username: '',
    profileUrl: '',
    telegram: '',
    website: '',
    email: '',
    violationType: null,
  })

  const detailData = ref<BlackListDetailData>({
    header: '',
    description: '',
  })

  const isSubjectValid = ref(false)
  const isDetailValid = ref(false)
  const isProcessed = ref(false)

  // Actions (formerly mutations)
  const setSubjectData = (data: Partial<BlackListSubjectData>) => {
    subjectData.value = { ...subjectData.value, ...data }
    isSubjectValid.value = checkSubjectValid(subjectData.value)
  }

  const setProcessed = (status: boolean) => {
    isProcessed.value = status
  }

  const setDetailData = (data: Partial<BlackListDetailData>) => {
    detailData.value = { ...detailData.value, ...data }
    isDetailValid.value = checkDetailValid(detailData.value)
  }

  const resetAll = () => {
    subjectData.value = {
      complaintType: null,
      username: '',
      profileUrl: '',
      telegram: '',
      website: '',
      email: '',
      violationType: null,
    }

    detailData.value = {
      header: '',
      description: '',
    }

    isSubjectValid.value = false
    isDetailValid.value = false
    isProcessed.value = false
  }

  return {
    // State
    subjectData,
    detailData,
    isSubjectValid,
    isDetailValid,
    isProcessed,
    // Actions
    setSubjectData,
    setProcessed,
    setDetailData,
    resetAll
  }
})
