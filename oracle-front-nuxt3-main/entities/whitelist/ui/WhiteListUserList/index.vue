<template>
  <div class="flex gap-12 flex-col">
    <div class="user_list_title py-16">
      {{ $t("whitelist.userList.design") }}
    </div>
    <div v-for="item in 10" :key="item">
      <nuxt-link :to="localePath('/whitelist/profile')">
        <WhiteListUserCard />
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import WhiteListUserCard from "~/widgets/whitelist/WhiteListUserCard/index.vue";

const localePath = useLocalePath();
</script>
<style lang="scss">
.user_list_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0;
  color: white;
}
</style>
