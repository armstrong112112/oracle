<template>
  <bills-modal 
    :is-open="isVisible" 
    title="New Card"
    @close="closeModal"
    max-width="500px"
  >
    <div class="modal-content">
      <PrePaidNewCardContent :show-footer="false" />
    </div>
  </bills-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BillsModal from '~/components/bills-modal.vue'
import PrePaidNewCardContent from '~/widgets/prepaid-cards/PrePaidNewCardContent.vue'

export default defineComponent({
  name: 'NewCardModal',
  components: {
    BillsModal,
    PrePaidNewCardContent,
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
