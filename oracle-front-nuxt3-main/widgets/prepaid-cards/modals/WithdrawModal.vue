<template>
  <bills-modal 
    :is-open="isVisible" 
    title="Withdraw"
    @close="closeModal"
  >
    <div class="modal-content">
      <PrePaidWithdrawalContent :show-footer="false" />
    </div>
  </bills-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BillsModal from '~/components/bills-modal.vue'
import PrePaidWithdrawalContent from '~/widgets/prepaid-cards/PrePaidWithdrawalContent.vue'

export default defineComponent({
  name: 'WithdrawModal',
  components: {
    BillsModal,
    PrePaidWithdrawalContent,
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