<template>
  <div class="service_card_parent">
    <div class="service_card" v-for="item in items" :key="item.id">
      <div class="flex items-center justify-start gap-10">
        <img :src="item.img" alt="Service Icon" class="service-icon" />
        <h3 class="service-name">{{ item.title }}</h3>
      </div>
      <nuxt-link :to="localePath(item.link)" class="more-link">
        {{ $t("dashboard.seeMore") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ServiceItem {
  id: number;
  img: string;
  title: string;
  link: string;
}

interface Props {
  items: ServiceItem[];
}

defineProps<Props>();

const localePath = useLocalePath();
</script>

<style lang="scss">
.service_card_parent {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.service_card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 20px;
  border: 1px solid #2b2741;
  border-radius: 16px;
  gap: 30px;
}

.service-name {
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 145%;
  color: #ffffff;
}

.more-link {
  background: #1e1d28;
  padding: 12px 14px;
  border-radius: 12px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  vertical-align: middle;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s linear;
}

.more-link:hover {
  background: #f64e2a;
}
</style>
