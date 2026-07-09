<template>
  <div class="flex flex-col gap-10">
    <div class="flex items-center justify-between" v-if="users.length !== 0">
      <div class="category_title">{{ $t("escrow.with") }}</div>
      <div class="add_btn" @click="openAddUsersModal">
        {{ $t("escrow.add") }}
        <img src="/icons/profile/plus.svg" style="width: 12px" alt="plus" />
      </div>
    </div>
    <!-- Пустое состояние -->
    <div v-if="users.length === 0" class="empty-state">
      <div class="empty-state-content">
        <div class="empty-state-title">{{ $t("escrow.noContactsYet") }}</div>
        <div class="empty-state-subtitle">
          {{ $t("escrow.addSomeoneToContacts") }}
        </div>
        <button class="empty-state-btn" @click="openAddUsersModal">
          <img src="/icons/profile/plus.svg" alt="plus" />
          {{ $t("escrow.addNewContact") }}
        </button>
      </div>
    </div>

    <!-- Список пользователей -->
    <div v-else class="users">
      <div
        v-for="user in users"
        :key="user.id"
        class="user relative"
        :class="{ active_user: isSelected(user.id) }"
        @click="toggleSelection(user.id)">
        <img
          v-if="isSelected(user.id)"
          src="/icons/verification/selected.svg"
          alt="selected"
          class="user_selected" />
        <img :src="user.avatar" :alt="user.name" class="user_image" />
        <div class="user_name">{{ user.name }}</div>
      </div>
    </div>

    <!-- Попап добавления пользователей -->
    <AddUsersModal
      :is-open="isAddUsersModalOpen"
      :existing-users="existingUserIds"
      @close="closeAddUsersModal"
      @add-user="addUserToEscrow" />
  </div>
</template>

<script setup lang="ts">
import { Users, type User } from "@/entities/escrow/data/users";
import AddUsersModal from "@/entities/escrow/ui/NewEscrowRoom/AddUsersModal/index.vue";
import { useEscrowStore } from "@/store/escrow";
import { computed, ref } from "vue";

// Composables
const escrowStore = useEscrowStore();

// Reactive state
const users = ref<User[]>(Users);
const isAddUsersModalOpen = ref(false);

// Computed properties
const selectedUser = computed(() => escrowStore.profile.selectedUser);

const existingUserIds = computed((): number[] => {
  return users.value.map((user) => user.id);
});

// Methods
const isSelected = (userId: number): boolean => {
  return selectedUser.value?.id === userId;
};

const toggleSelection = (userId: number): void => {
  if (selectedUser.value?.id === userId) {
    escrowStore.setEscrow({ selectedUser: null });
  } else {
    const user = users.value.find((u) => u.id === userId) || null;
    escrowStore.setEscrow({ selectedUser: user });
  }
};

const openAddUsersModal = (): void => {
  isAddUsersModalOpen.value = true;
};

const closeAddUsersModal = (): void => {
  isAddUsersModalOpen.value = false;
};

const addUserToEscrow = (newUser: any): void => {
  // Добавляем нового пользователя в список
  const userToAdd: User = {
    id: newUser.id,
    name: `${newUser.firstName} ${newUser.lastName}`,
    avatar: newUser.avatar,
  };

  users.value.push(userToAdd);
  closeAddUsersModal();
};
</script>
<style scoped>
.category_title {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
}
.add_btn {
  padding: 7px 10px;
  border-radius: 12px;
  background: #1e1d28;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 4px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  vertical-align: middle;
  cursor: pointer;
}
.users {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 10px;
}
.user {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s linear;
}
.user_image {
  width: 48px;
  height: 48px;
  border: 2px solid transparent;
}
.user_name {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  text-align: center;
  color: white;
}
.active_user .user_image {
  border: 2px solid #f64e2a;
  border-radius: 50%;
}
.user_selected {
  visibility: hidden;
  transition: all 0.3s linear;
}
.active_user .user_selected {
  visibility: visible;
  position: absolute;
  top: 32px;
  left: 60%;
  width: 18px;
  border: 2px solid #121119;
  border-radius: 50%;
}

/* Пустое состояние */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 40px 20px;
  border: 1px solid #2b2741;
  border-radius: 12px;
}

.empty-state-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  width: 100%;
}

.empty-state-title {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;
  color: white;
  margin: 0;
}

.empty-state-subtitle {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  color: white;
  opacity: 0.8;
  margin: 0;
}

.empty-state-btn {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: #2b2741;
  border: none;
  border-radius: 12px;
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 135%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #3a3651;
    transform: translateY(-1px);
  }

  img {
    width: 16px;
    height: 16px;
  }
}
</style>
