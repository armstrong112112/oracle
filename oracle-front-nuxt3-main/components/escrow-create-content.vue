<template>
  <div class="escrow-create-content">
    <div class="escrow-create-form">
      <NewEscrowRoom />
    </div>
    <div v-if="showFooter" class="escrow-footer">
      <CustomButton
        class="w-full"
        :value="$t('escrow.continue')"
        :type="buttonType"
        @click="handleContinue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewEscrowRoom from "~/entities/escrow/ui/NewEscrowRoom/index.vue";
import CustomButton from "~/components/ui/Button.vue";
import { storeToRefs } from "pinia";
import { useEscrowStore } from "~/store/escrow";

const props = withDefaults(defineProps<{ showFooter?: boolean; isModal?: boolean }>(), {
  showFooter: true,
  isModal: false,
});

const escrowStore = useEscrowStore();
const { profile } = storeToRefs(escrowStore);

const router = useRouter();
const localePath = useLocalePath();

const buttonType = computed(() => {
  const { role, categories, selectedUser } = profile.value;
  const isDataFilled = role !== "" && categories.length > 0 && selectedUser !== null;
  return isDataFilled ? "primary" : "confirm";
});

function handleContinue() {
  if (buttonType.value === "primary") {
    if (props.isModal) {
      // Если это модальное окно, эмитим событие для перехода к следующему попапу
      emit("close");
    } else {
      // Если это отдельная страница, просто переходим
      router.push(localePath("/escrow/creating"));
    }
  }
}

const emit = defineEmits<{ (e: "close"): void }>();
</script>

<style lang="scss" scoped>
.escrow-create-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.escrow-create-form {
  flex: 1;
  padding: 16px 0;
}

.escrow-footer {
  padding: 12px 20px 24px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  z-index: 999;
  border-top: 1px solid #2b2741;
  @media (min-width: 1024px) {
    border: none;
    padding-bottom: 0;
  }
}
</style>
