<template>
  <bills-modal 
    :is-open="isVisible" 
    title="Transfer"
    @close="closeModal"
  >
    <div class="modal-content">
      <p class="modal-description">Transfer modal content will be here</p>
    </div>
  </bills-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BillsModal from '~/components/bills-modal.vue'

export default defineComponent({
  name: 'TransferModal',
  components: {
    BillsModal,
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

.modal-description {
  font-family: Roboto;
  font-size: 16px;
  line-height: 130%;
  color: #ccc;
  margin: 0;
}
</style> 