<template>
  <div class="prepaid-card-tutorial">
    <div class="prepaid-card-tutorial_title">
      <h3>Tutorials ></h3>
    </div>
    <Stories :enableSwiper="false" />
  </div>
</template>

<script setup lang="ts">
import Stories from "~/entities/oracle-pay/ui/stories/stories.vue";
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Composables
const prepaidCardsStore = usePrepaidCardsStore();
</script>

<style lang="scss">
.stories-wrapper-inner {
  @media (min-width: 1440px) {
    flex-wrap: wrap;
  }
}
.prepaid-card-tutorial_title {
  h3 {
    color: #fff;
    font-family: Roboto;
    font-weight: 600;
    font-size: 18px;
    line-height: 130%;
  }
}
@media (max-width: 1024px) {
  .prepaid-card-tutorial {
    width: 804px;
  }
}
</style>
