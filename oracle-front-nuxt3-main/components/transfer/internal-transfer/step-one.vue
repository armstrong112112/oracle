<template>
  <div class="internal-transfer__step-one">
    <div v-if="state" class="internal-transfer__content">
      <input-oracle
        :search="true"
        :placeholder="$t('transfers.search')"
        @changed="filterUsers"
      />
      <div class="transfer-users">
        <div class="transfer-users__head">
          <h3 class="send-to__text">{{ $t('transfers.sendTo') }}</h3>
          <button class="add-button">
            {{ $t('transfers.add') }}
            <PlusIcon />
          </button>
        </div>
        <ul class="user-list">
          <li v-for="user of filteredUsers" :key="user.id" class="user-item">
            <button class="user-selected__btn" @click="selectUser(user.id)">
              <div class="user-img" :class="{ selected: user.selected }">
                <img :src="user.img" alt="" />
                <CheckIcon v-if="user.selected" class="user-checker" />
              </div>
              <h4 class="user-name">{{ user.name }}</h4>
            </button>
          </li>
        </ul>
      </div>
      <button-oracle
        v-if="selectedUser"
        :text="$t('transfers.continue')"
        color="orange"
        @click="$emit('nextStep')"
      />
    </div>
    <div v-else class="contacts-empty__state">
      <h2 class="title">{{ $t('transfers.noContactsYet') }}</h2>
      <p class="description">
        {{ $t('transfers.addFriendsDescription') }}
      </p>
      <router-link :to="localePath('/transfer/add-contact')" class="add-button">
        <span>
          <PlusIcon />
        </span>
        {{ $t('transfers.addNewContact') }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from '@/assets/svg/plus.svg?component'
import CheckIcon from '@/assets/svg/user-checker.svg?component'

const localePath = useLocalePath()

const emit = defineEmits<{
  nextStep: []
}>()

// Reactive state
const searchQuery = ref('')
const selectedUser = ref(false)
const state = ref(true)

const users = ref([
  {
    id: 1,
    img: '/png/zaglushka.png',
    name: 'Barbara Martinez',
    selected: false,
  },
  {
    id: 2,
    img: '/png/zaglushka.png',
    selected: false,
    name: 'Patricia Martin',
  },
  {
    id: 3,
    img: '/png/zaglushka.png',
    selected: false,
    name: 'Michael Anderson',
  },
  {
    id: 4,
    img: '/png/zaglushka.png',
    selected: false,
    name: 'Patricia Lopez',
  },
  {
    id: 5,
    img: '/png/zaglushka.png',
    selected: false,
    name: 'Thomas Wilson',
  },
  {
    id: 6,
    img: '/png/zaglushka.png',
    selected: false,
    name: 'Barbara Martinez',
  },
  {
    id: 7,
    img: '/png/zaglushka.png',
    selected: false,
    name: 'Barbara Martinez',
  },
  {
    id: 8,
    img: '/png/zaglushka.png',
    selected: false,
    name: 'Barbara Martinez',
  },
  {
    id: 9,
    img: '/png/zaglushka.png',
    selected: false,
    name: 'Barbara Martinez',
  },
])

const filteredUsers = ref([...users.value])

// Methods
const filterUsers = (value: string): void => {
  searchQuery.value = value
  filteredUsers.value = users.value.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
}

const selectUser = (userId: number) => {
  const clickedUser = users.value.find((user) => user.id === userId)

  if (clickedUser?.selected) {
    selectedUser.value = false
    filteredUsers.value = filteredUsers.value.map((user) => ({
      ...user,
      selected: false,
    }))
    users.value = users.value.map((user) => ({
      ...user,
      selected: false,
    }))
  } else {
    selectedUser.value = true
    filteredUsers.value = filteredUsers.value.map((user) => ({
      ...user,
      selected: user.id === userId,
    }))
    users.value = users.value.map((user) => ({
      ...user,
      selected: user.id === userId,
    }))
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/components/transfer/internal/step-one.scss' as *;
</style>
