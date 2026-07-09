import { defineStore } from 'pinia';

export const useOracleProfileStore = defineStore('oracle-profile', () => {
  // State
  const profile = ref({
    username: '@westdev',
    bio: `My name is Anna Sokolova, a designer with 7 years of experience in graphic design and UX/UI. My passion for creating intuitive, visually stunning solutions drives me to craft user-centered designs that blend functionality with aesthetic   appeal.

    `
  })

  // Actions (formerly mutations)
  const SET_PROFILE = (payload: { username: string; bio: string }) => {
    profile.value.username = payload.username
    profile.value.bio = payload.bio
  }

  return {
    // State
    profile,
    // Actions
    SET_PROFILE
  }
})
