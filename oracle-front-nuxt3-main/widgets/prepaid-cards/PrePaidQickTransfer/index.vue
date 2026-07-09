<template>
  <div class="quick-transfer">
    <div class="quick-transfer-header">
      <h3 class="quick-transfer-title">Quick Transfer</h3>
      <div class="quick-transfer-arrow">></div>
    </div>

    <div class="users-list">
      <div
        v-for="user in users"
        :key="user.id"
        class="user-item"
        @click="selectUser(user)">
        <div class="user-avatar">
          <img :src="user.avatar" :alt="user.name" />
        </div>
        <div class="user-name">{{ user.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { usePrepaidCardsStore } from "~/store/prepaid-cards";
import zaglushkaImage from "/png/zaglushka.png";

// Interfaces
interface User {
  id: number;
  name: string;
  avatar: string;
}

// Composables
const prepaidCardsStore = usePrepaidCardsStore();

// Reactive state
const users = ref<User[]>([
  {
    id: 1,
    name: "John Doe",
    avatar: zaglushkaImage,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: zaglushkaImage,
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: zaglushkaImage,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    avatar: zaglushkaImage,
  },
]);

// Methods
const selectUser = (user: User) => {
  console.log("Selected user:", user.name);
  // Здесь можно добавить логику выбора пользователя
};
</script>

<style lang="scss" scoped>
.quick-transfer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.quick-transfer-header {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
}

.quick-transfer-title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
  margin: 0;
}

.quick-transfer-arrow {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-transfer-arrow:hover {
  transform: translateX(2px);
}

.users-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 8px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.users-list::-webkit-scrollbar {
  display: none;
}

.user-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.user-item:hover {
  transform: translateY(-2px);
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.user-item:hover .user-avatar {
  border-color: #f64e2a;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: white;
  text-align: center;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
