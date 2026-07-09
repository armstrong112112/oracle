<template>
  <button class="new-oracle-button" :class="[
    backgrounColor,
    { 'big-button': icon !== '' },
    { disabled: disabled },
  ]" @click="onButtonClick" :disabled="disabled">
    <span v-if="icon != ''" class="button-icon">
      <component :is="typeof icon == 'string' ? 'img' : icon" :src="icon" alt="" />
    </span>
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { usePrepaidCardsStore } from "~/store/prepaid-cards";

// Props
interface Props {
  text?: string;
  color?: string;
  to?: string;
  icon?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  color: "black",
  to: "",
  icon: "",
  disabled: false,
});

// Emits
const emit = defineEmits<{
  click: [];
}>();

// Composables
const router = useRouter();
const prepaidCardsStore = usePrepaidCardsStore();

// Computed
const backgrounColor = computed(() => {
  return props.color;
});

// Methods
const onButtonClick = () => {
  if (props.disabled) return;
  if (props.to !== "") {
    router.push(props.to);
  } else {
    emit("click");
  }
};
</script>

<style lang="scss">
.new-oracle-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 14px;
  padding: 9px 0;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #fff;
  transition: 0.2s;

  &.big-button {
    padding: 11px 16px;
    line-height: 22px;
  }

  &.black {
    background: #1e1d28;

    &:hover {
      background: #f64e2a;
      box-shadow: 0 0 10px rgba(246, 78, 42, 0.25);
    }
  }

  &.yellow {
    background: #f64e2a;

    &:hover {
      background: #f64e2a;
      box-shadow: 0 0 10px rgba(246, 78, 42, 0.25);
    }
  }

  &.disabled {
    background: #6c6c6c !important;
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      background: #6c6c6c !important;
      box-shadow: none !important;
    }
  }

  .button-icon {
    line-height: 0;
  }
}
</style>
