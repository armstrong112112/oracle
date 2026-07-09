<template>
  <button
    :class="buttonClasses"
    :disabled="props.disabled"
    @click="handleClick">
    <img
      v-if="props.isImage && !props.rightPosition"
      :src="`/icons/bills/${props.isImage}.svg`"
      alt="" />

    {{ props.value }}
    <img
      v-if="props.isImage && props.rightPosition"
      :src="`/icons/bills/${props.isImage}.svg`"
      alt="" />
  </button>
</template>

<script setup lang="ts">
type ButtonType =
  | "primary"
  | "outline"
  | "secondary"
  | "confirm"
  | "grey"
  | "transparent"
  | "blur";

type ButtonSize = "sm" | "md" | "lg";

interface Props {
  value: string;
  disabled?: boolean;
  rightPosition?: boolean;
  isImage?: string;
  size?: ButtonSize;
  type?: ButtonType;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  rightPosition: false,
  type: "primary",
  size: undefined,
});

const emit = defineEmits<{
  click: [];
}>();

const buttonClasses = computed(() => {
  const classes = ["custom-button", `custom-button--${props.type}`];

  if (props.size) {
    classes.push(`custom-button--${props.size}`);
  }

  return classes;
});

const handleClick = (): void => {
  emit("click");
};
</script>

<style lang="scss" scoped>
.custom-button {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 14px;
  transition: all 0.3s ease;
  text-decoration: none;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  &--primary {
    background-color: #f64e2a;
    color: white;
    border: 2px solid transparent;
    box-shadow: 0px 0px 10px 2px rgba(246, 78, 42, 0.25);

    &:hover {
      background-color: #d63e1f;
    }
  }

  &--outline {
    background-color: transparent;
    color: white;
    border: 2px solid transparent;

    //box-shadow: 0px 0px 10px 2px rgba(246, 78, 42, 0.25);

    box-shadow: none;
    &:hover {
      background-color: rgba(237, 124, 99, 0.1);
    }
  }
  &--secondary {
    background-color: #1e1d28;
    color: white;
    //border: 1px solid #f64e2a;
    //box-shadow: 0px 0px 10px 2px rgba(246, 78, 42, 0.25);
    border: 2px solid transparent;

    box-shadow: none;
    &:hover {
      background-color: #2a2938;
    }
  }
  &--grey {
    background-color: #3f3d54;
    color: white;
    //border: 1px solid #f64e2a;
    //box-shadow: 0px 0px 10px 2px rgba(246, 78, 42, 0.25);
    border: 2px solid transparent;

    box-shadow: none;
    &:hover {
      background-color: #56546f;
    }
  }
  &--blur {
    color: white;
    border: 2px solid transparent;
    box-shadow: none;
    background: #61616133;
  }
  &--blur:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &--transparent {
    background-color: transparent;
    color: white;
    border: 2px solid transparent;

    box-shadow: none;
    &:hover {
      background-color: transparent;
    }
  }
  &--confirm {
    background-color: #13121b;
    color: #67639a;
    //border: 1px solid #f64e2a;
    //box-shadow: 0px 0px 10px 2px rgba(246, 78, 42, 0.25);
    box-shadow: none;
    border: 2px solid #2b2741;
    &:hover {
      background-color: #2a2938;
    }
  }
}
.custom-button--sm {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  vertical-align: middle;
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border-radius: 12px;
}
</style>
