<template>
  <bills-modal 
    :is-open="isVisible" 
    title="Top Up"
    @close="closeModal"
  >
    <div class="modal-content">
      <PrePaidDepositContent :show-footer="false" />
    </div>
  </bills-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BillsModal from '~/components/bills-modal.vue'
import PrePaidDepositContent from '~/widgets/prepaid-cards/PrePaidDepositContent.vue'

export default defineComponent({
  name: 'TopUpModal',
  components: {
    BillsModal,
    PrePaidDepositContent,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal(): void {
      this.$emit('close')
    }
  }
})
</script>

<style lang="scss" scoped>
.modal-content {
  padding: 20px 0;
}
</style> 