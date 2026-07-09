<template>
  <div class="flex flex-col gap-8 w-full">
    <CustomButton
      v-if="!isP2p"
      :value="$t('whitelist.profile.oracle.buttons.openChat')"
      type="primary"
      size="sm"
      is-image="chat" />
    <div class="flex gap-8">
      <CustomButton
        v-if="isP2p"
        :value="$t('whitelist.profile.oracle.buttons.openChat')"
        type="primary"
        size="sm"
        is-image="chat" />
      <CustomButton
        :value="$t('whitelist.profile.oracle.buttons.escrowDeal')"
        type="secondary"
        size="sm"
        is-image="deal" />
      <CustomButton
        :value="$t('whitelist.profile.oracle.buttons.transferMoney')"
        type="secondary"
        size="sm"
        is-image="transfer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "~/components/ui/Button.vue";

interface Props {
  label?: string;
  isP2p?: boolean;
}

withDefaults(defineProps<Props>(), {
  label: undefined,
  isP2p: false,
});
</script>

<style scoped></style>
