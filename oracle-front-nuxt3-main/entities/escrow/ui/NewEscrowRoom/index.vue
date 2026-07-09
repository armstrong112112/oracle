<template>
  <div class="flex flex-col gap-24">
    <NewEscrowRoomHeader />
    <NewEscrowRoomCategory />
    <NewEscrowRoomUsers />
  </div>
</template>

<script setup lang="ts">
import NewEscrowRoomHeader from '~/entities/escrow/ui/NewEscrowRoom/NewEscrowRoomHeader/index.vue'
import NewEscrowRoomCategory from '~/entities/escrow/ui/NewEscrowRoom/NewEscrowRoomCategory/index.vue'
import NewEscrowRoomUsers from "~/entities/escrow/ui/NewEscrowRoom/NewEscrowRoomUsers/index.vue";
</script>

<style scoped></style>
