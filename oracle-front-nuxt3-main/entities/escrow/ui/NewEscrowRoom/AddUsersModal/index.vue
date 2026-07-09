<template>
  <BillsModal
    :is-open="isOpen"
    :title="$t('escrow.addUsers')"
    max-width="600px"
    @close="$emit('close')">
    <div class="add-users-modal">
      <!-- Поиск -->
      <div class="search-container">
        <div class="search-input-wrapper">
          <img src="/svg/search.svg" alt="search" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('escrow.searchUsers')"
            class="search-input"
            @input="filterUsers" />
        </div>
      </div>

      <!-- Список пользователей -->
      <div class="users-list">
        <div v-for="user in filteredUsers" :key="user.id" class="user-item">
          <div class="user-info">
            <img
              :src="user.avatar"
              :alt="`${user.firstName} ${user.lastName}`"
              class="user-avatar" />
            <div class="user-details">
              <div class="user-name">
                {{ user.firstName }} {{ user.lastName }}
                <span class="user-nickname">@{{ user.nickname }}</span>
              </div>

              <div class="user-id">ID: {{ user.id }}</div>
            </div>
          </div>
          <button
            class="add_btn"
            @click="addUser(user)"
            :disabled="isUserAdded(user.id)">
            {{ $t("escrow.add") }}
            <img src="/icons/profile/plus.svg" style="width: 12px" alt="plus" />
          </button>
        </div>
      </div>

      <!-- Сообщение если пользователи не найдены -->
      <div v-if="filteredUsers.length === 0" class="no-users">
        {{ $t("escrow.noUsersFound") }}
      </div>
    </div>
  </BillsModal>
</template>

<script setup lang="ts">
import BillsModal from "~/components/bills-modal.vue";
import type { ExtendedUser } from "~/entities/escrow/data/extendedUsers";
import { ExtendedUsers } from "~/entities/escrow/data/extendedUsers";

const props = defineProps<{ isOpen: boolean; existingUsers: number[] }>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "add-user", user: ExtendedUser): void;
}>();

const searchQuery = ref("");
const allUsers = ref<ExtendedUser[]>(ExtendedUsers);
const filteredUsers = ref<ExtendedUser[]>([]);

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      searchQuery.value = "";
      filterUsers();
    }
  }
);

function filterUsers() {
  if (!searchQuery.value.trim()) {
    filteredUsers.value = allUsers.value.filter(
      (user) => !isUserAdded(user.id)
    );
  } else {
    const query = searchQuery.value.toLowerCase();
    filteredUsers.value = allUsers.value.filter(
      (user) =>
        !isUserAdded(user.id) &&
        (user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.nickname.toLowerCase().includes(query) ||
          user.id.toString().includes(query))
    );
  }
}

function isUserAdded(userId: number): boolean {
  return props.existingUsers.includes(userId);
}

function addUser(user: ExtendedUser) {
  emit("add-user", user);
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/entities/escrow/add-users-modal.scss" as *;
</style>
