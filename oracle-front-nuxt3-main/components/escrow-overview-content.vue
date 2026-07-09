<template>
  <div class="escrow-overview-content">
    <div class="escrow-overview-form">
      <NewEscrowOverview />
    </div>
    <div v-if="showFooter" class="escrow-overview-footer">
      <div class="flex items-center justify-between w-full">
        <div class="escrow-overview-footer-fee">{{ $t("escrow.fees") }}</div>
        <div class="escrow-overview-footer-price">0.05 USDT</div>
      </div>
      <CustomButton
        class="w-full"
        :value="$t('escrow.confirm')"
        type="primary"
        @click="handleConfirm" />

      <NewEscrowPopUp
        type="success"
        button-type="secondary"
        :button-text="$t('escrow.checkDealPage')"
        :title="
          $t('escrow.escrowDealOfferSent', {
            name: profile?.selectedUser?.name,
          })
        "
        :reminder-text="$t('escrow.roleNotAcceptedYet', { role: profile.role })"
        :description="$t('escrow.youWillBeNotified')"
        :is-open="isOpen"
        :username="`${profile?.selectedUser?.name}`"
        :cancel-text="$t('escrow.close')"
        :close="() => closeModal()"
        :confirm="() => handleDealPage()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewEscrowOverview from "~/entities/escrow/ui/NewEscrowOverview/index.vue";
import NewEscrowPopUp from "~/entities/escrow/ui/NewEscrowPopUp/index.vue";
import CustomButton from "~/components/ui/Button.vue";
import { storeToRefs } from "pinia";
import { useEscrowStore } from "~/store/escrow";

const props = withDefaults(defineProps<{ showFooter?: boolean; isModal?: boolean }>(), {
  showFooter: true,
  isModal: false,
});

const escrowStore = useEscrowStore();
const { profile } = storeToRefs(escrowStore);

const isOpen = ref(false);
const router = useRouter();
const localePath = useLocalePath();

function handleConfirm() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

function handleDealPage() {
  if (props.isModal) {
    // Если это модальное окно, закрываем его и переходим на страницу сделки
    emit("close");
    router.push(localePath("/escrow/deal/12"));
  } else {
    // Если это отдельная страница, просто переходим
    router.push(localePath("/escrow/deal/12"));
  }
}

const emit = defineEmits<{ (e: "close"): void }>();
</script>

<style lang="scss" scoped>
.escrow-overview-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.escrow-overview-form {
  flex: 1;
  padding: 16px 0;
}

.escrow-overview-footer {
  padding: 12px 20px 24px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  z-index: 222;
  border-top: 1px solid #2b2741;
  @media (min-width: 1024px) {
    border: none;
  }
}

.escrow-overview-footer-fee {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: #bfb7ff;
}

.escrow-overview-footer-price {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: #ffffff;
}
</style>
