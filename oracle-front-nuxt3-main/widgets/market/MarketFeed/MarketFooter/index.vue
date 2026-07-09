<template>
  <footer class="footer">
    <CustomButton :value="buttonText" type="secondary" class="w-full" />
  </footer>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";

interface Props {
  buttonText?: string;
}

withDefaults(defineProps<Props>(), {
  buttonText: "",
});
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100%;
  }
}
</style>
