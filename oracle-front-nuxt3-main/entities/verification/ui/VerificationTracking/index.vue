<template>
  <div class="">
    <div class="notification pt-0">
      <div class="preview">
        <TrackingIndicator
          :steps="trackingSteps"
          :current-step="2"
          active-color="#FF5733" />
        <div class="tracking">
          <div class="tracking_information">
            <div class="info-row">
              <span class="tracking_info_title">Period</span>
              <span class="dots"></span>
              <span class="tracking_info_text"
                >Oracle Verification until April, 2026</span
              >
            </div>
            <div class="info-row">
              <span class="tracking_info_title">Category</span>
              <span class="dots"></span>
              <span class="tracking_info_text"
                >Design ; IT Dev ; Consulting</span
              >
            </div>
            <div class="info-row">
              <span class="tracking_info_title">Oracle Fee</span>
              <span class="dots"></span>
              <span class="tracking_info_text">200$</span>
            </div>
            <div class="info-row">
              <span class="tracking_info_title">Paid with</span>
              <span class="dots"></span>
              <span class="tracking_info_text">BTC Account ***2235</span>
            </div>
          </div>
        </div>
        <div class="tracking_title">About my business</div>
        <textarea
          v-model="verificationData.description"
          placeholder="Tell us more about your business operations..."
          class="verification-textarea"
          readonly />
        <div class="tracking_title">Attached links</div>
        <div class="preview_links">
          <div
            v-for="(link, index) in verificationData.links"
            :key="index"
            class="links">
            <TheInput
              :value="link.link"
              placeholder="Link"
              :is-read-only="true"
              :is-remove="false" />
            <TheInput
              :value="link.description"
              placeholder="Description"
              :is-read-only="true"
              :is-remove="false" />
          </div>
        </div>
        <div class="tracking_title">My Contacts</div>
        <div class="preview_links">
          <div
            v-for="([key, value], index) in Object.entries(
              verificationData.contacts
            )"
            :key="index"
            class="category">
            <TheInput
              :label="capitalize(key)"
              :value="value"
              :placeholder="key.charAt(0).toUpperCase() + key.slice(1)"
              :is-read-only="true"
              :is-remove="false"
              class="category-input" />
          </div>
        </div>
      </div>
    </div>
    <div class="tracking_footer notification flex flex-col mt-20 gap-10">
      <CustomButton
        value="Contact Support Service"
        type="outline"
        @click="update" />
      <CustomButton
        value="cancel application"
        type="outline"
        @click="openModal" />
      <VerificationTrackingDialog
        :is-open="isOpen"
        title="APPLICATION CANCELLATION"
        :description="`Are you sure you want to cancel your verification application?
  <br/><br/>
  You will receive a refund for the verification fee within minutes after cancellation is finalized. However, your verification progress will be lost.`"
        :close="closeModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FeeCard from '@/entities/verification/ui/VerificationForm/FeeCard.vue'
import UploadImages from '@/entities/verification/ui/VerificationForm/UploadImages.vue'
import CustomButton from '~/components/ui/Button.vue'
import TheInput from '~/components/ui/TheInput.vue'
import TrackingIndicator from '@/widgets/verification/VerificationTracking/index.vue'
import VerificationTrackingDialog from '@/widgets/verification/VerificationTrackingDialog/index.vue'
import { useVerificationStore } from '@/store/verification'

// Composables
const verificationStore = useVerificationStore()

// Reactive state
const isOpen = ref(false)
const trackingSteps = ref([
  { title: "Created", date: "25 Mar 09:30 PM", status: "completed" },
  { title: "Paid", date: "25 Mar 09:30 PM", status: "active" },
  { title: "Delivered", date: "25 Mar 09:30 PM", status: "pending" },
])

// Computed properties
const verificationData = computed(() => verificationStore.verificationData)

// Methods
const update = () => {
  verificationStore.UpdateData()
}

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  flex-direction: column;
  margin-top: 0;
  gap: 8px;
}
.preview_links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.preview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.categories {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  grid-template-rows: auto;
}
.tracking_title {
  font-family: Kenyan Coffee, sans-serif;
  font-weight: 700;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0%;
  color: white;
}
.month_title {
  font-family: "Reza Zulmi Alfaizi Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  color: white;
}
</style>
