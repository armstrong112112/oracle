<template>
  <div class="prepaid-cards-container">
    <PrepaidCardsMobile class="mobile-layout" />
    <PrepaidCardsDesktop class="desktop-layout" />
  </div>
</template>

<script setup lang="ts">
import PrepaidCardsDesktop from "@/entities/pre-paid/ui/PrepaidCardsDesktop.vue";
import PrepaidCardsMobile from "@/entities/pre-paid/ui/PrepaidCardsMobile.vue";

// Layout
definePageMeta({
  layout: "sidebar",
});
</script>

<style lang="scss" scoped>
.prepaid-cards-container {
  width: 100%;
  height: 100%;
}

.mobile-layout {
  display: block;
}

.desktop-layout {
  display: none;
}

// Desktop layout (1024px and above)
@media (min-width: 1024px) {
  .mobile-layout {
    display: none;
  }

  .desktop-layout {
    display: block;
  }
}

// Mobile layout (below 1024px)
@media (max-width: 1023px) {
  .mobile-layout {
    display: block;
  }

  .desktop-layout {
    display: none;
  }
}
</style>
