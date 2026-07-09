<template>
  <div class="dispute-page__wrapper">
    <Header />
    <div>
      <DisputeStepOne v-if="$route.query.status === 'created-1'" />
      <DisputeStepTwo v-if="$route.query.status === 'created-2'" />
      <DisputeStatusWon v-if="$route.query.status === 'won'" />
      <DisputeStatusLose v-if="$route.query.status === 'lose'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DisputeStatusLose from "~/features/shop/dispute/status-lose.vue";
import DisputeStatusWon from "~/features/shop/dispute/status-won.vue";
import DisputeStepOne from "~/features/shop/dispute/step-one.vue";
import DisputeStepTwo from "~/features/shop/dispute/step-two.vue";
import Header from "~/widgets/shop/header/index.vue";

definePageMeta({
  layout: "sidebar",
});

const route = useRoute();
const router = useRouter();

// Handle redirect if no status query param
if (!route.query.status) {
  router.replace({
    path: route.path,
    query: { ...route.query, status: "created-1" },
  });
}
</script>

<style lang="scss">
@media screen and (max-width: 750px) {
  .dispute-page__wrapper {
    .shop-header-container {
      display: none;
    }
  }
}
</style>
