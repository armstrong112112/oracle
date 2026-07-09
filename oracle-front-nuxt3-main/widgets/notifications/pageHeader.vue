<template>
  <div class="new-go-back">
    <NuxtLink :class="isCreated ? 'w-65' : null" :to="$localePath('/')">
      <img :src="`/svg/arrow-back.svg`" alt="" />
    </NuxtLink>
    <div class="back-title">{{ title }}</div>
    <div>
      <div v-if="isChat" class="chat_box relative">
        <img src="/svg/chat.svg" alt="" class="cursor-pointer" />
        <div class="chat_count">{{ notificationCount }}</div>
      </div>
      <img
        v-if="isPlus"
        src="/svg/plus.svg"
        alt=""
        class="cursor-pointer"
        @click="plusClick" />
      <img
        v-if="isDot"
        src="/svg/3dots.svg"
        alt=""
        class="cursor-pointer"
        @click="plusClick" />
      <img
        v-if="isSearch"
        src="/icons/blackList/search.svg"
        alt=""
        class="cursor-pointer" />
      <div v-if="isCreated" class="status created">
        {{ $t("mixing.created") }}
      </div>
      <div v-else style="width: 18px"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const emit = defineEmits<{
  click: [];
}>();
const localePath = useLocalePath();
const props = withDefaults(
  defineProps<{
    title: string;
    isPlus?: boolean;
    isDot?: boolean;
    isCreated?: boolean;
    isChat?: boolean;
    isSearch?: boolean;
    plusLink?: string;
    notificationCount?: number;
  }>(),
  {
    isPlus: false,
    isDot: false,
    isCreated: false,
    isChat: false,
    isSearch: false,
    plusLink: "",
    notificationCount: 3,
  }
);

const plusClick = (): void => {
  if (props.plusLink) {
    router.push(localePath(props.plusLink as string));
  } else {
    emit("click");
  }
};
</script>

<style scoped>
.new-go-back {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  position: sticky;
  top: 0;
  /* background: #0a090f; */
  background: #000;
  z-index: 99;
  cursor: pointer;
}

.new-go-back .back-title {
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0;
  color: white;
  text-decoration: none;
}

.status {
  border-radius: 8px;
  padding-right: 10px;
  padding-left: 10px;
  gap: 10px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 145%;
  letter-spacing: 0;
  color: black;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.created {
  background: #31f62a;
}
.chat_count {
  top: -8px;
  right: -8px;
  position: absolute;
  border-radius: 50%;
  background: #f64e2a;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 10px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
}
</style>
