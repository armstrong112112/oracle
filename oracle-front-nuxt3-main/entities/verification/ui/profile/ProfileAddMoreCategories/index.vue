<template>
  <div class="profile_deposit_card">
    <div class="profile_card_title">
      {{ $t('whitelist.profile.addMoreCategories.title') }}
    </div>
    <CustomButton
      :value="$t('whitelist.profile.addMoreCategories.contactSupport')"
      class="w-full"
      type="primary"
    />
  </div>
</template>

<script setup lang="ts">
import CustomButton from '~/components/ui/Button.vue'

// Props
interface Props {
  price?: string
}

withDefaults(defineProps<Props>(), {
  price: ''
})
</script>

<style scoped>
.profile_deposit_card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px 20px;
  background: #13121b;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: #2b2741;
}
.profile_card_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0;
  color: #ffffff;
}
</style>
