<template>
  <div :class="inputClass">
    <label v-if="label" class="label">{{ label }}</label>
    <UserIcon v-if="user" class="input-user-icon" />
    <div v-if="prepaidText" class="input-prepaid-text">
      {{ prepaidText }}
    </div>
    <SearchIcon v-if="search" class="input-search" />
    <div v-if="ispin" class="input-group">
      <input
        v-for="(value, index) in values"
        :key="index"
        :data-index="index"
        v-model="values[index]"
        type="tel"
        inputmode="numeric"
        :disabled="disabled[index]"
        :class="{ error_input: error }"
        maxlength="1"
        :placeholder="placeholder"
        @input="onInputChange(index)"
        @keydown.backspace="onBackspacePress(index, $event)" />
    </div>
    <input
      v-else
      v-model="value"
      :type="computedType"
      :placeholder="placeholder"
      :style="{ paddingLeft, paddingRight }"
      :readonly="readonly"
      @input="onChildChanged" />
    <div
      v-if="type === 'password'"
      class="input-eye"
      type="button"
      @click="togglePassword">
      <EyeIcon />
    </div>
    <div v-if="appendText" class="input-append-text">
      {{ appendText }}
    </div>
    <CalendarIcon
      v-if="calendar"
      class="input-calendar-action"
      @click="$emit('openCalendar', $event)" />
    <TrashIcon v-if="trashAction" class="input-trash-action" />
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import TrashIcon from "@/assets/svg/trash.svg?component";
// @ts-ignore
import SearchIcon from "@/assets/svg/search.svg?component";
// @ts-ignore
import UserIcon from "@/assets/svg/UserCircle.svg?component";
// @ts-ignore
import CalendarIcon from "@/assets/svg/calendar.svg?component";
// @ts-ignore
import EyeIcon from "@/assets/svg/eye.svg?component";

interface Props {
  placeholder?: string;
  label?: string;
  type?: string;
  size?: string;
  v?: string;
  search?: boolean;
  readonly?: boolean;
  user?: boolean;
  calendar?: boolean;
  trashAction?: Function | null;
  ispin?: boolean;
  error?: boolean;
  appendText?: string;
  prepaidText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  label: "",
  type: "",
  size: "",
  v: "",
  search: false,
  readonly: false,
  user: false,
  calendar: false,
  trashAction: null,
  ispin: false,
  error: false,
  appendText: "",
  prepaidText: "",
});

const emit = defineEmits<{
  openPinCode: [values: string[]];
  changed: [value: string];
  openCalendar: [event: Event];
}>();

const value = ref(props.v);
const values = ref(["", "", "", "", "", ""]);
const disabled = ref([false, true, true, true, true, true]);
const isPasswordVisible = ref(false);

const computedType = computed((): string => {
  return isPasswordVisible.value ? "text" : props.type;
});

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
  console.log(isPasswordVisible.value);
};

const onInputChange = (index: number) => {
  const val = values.value[index].replace(/\D/g, "").slice(0, 1);
  values.value[index] = val;

  emit("openPinCode", values.value);

  if (val !== "" && index < values.value.length - 1) {
    disabled.value[index + 1] = false;

    nextTick(() => {
      const nextInput = document.querySelector(
        `input[data-index="${index + 1}"]`
      ) as HTMLInputElement;
      nextInput?.focus();
    });
  }
};

const onBackspacePress = (index: number, event: KeyboardEvent) => {
  if (
    event &&
    event.key === "Backspace" &&
    values.value[index] === "" &&
    index > 0
  ) {
    disabled.value[index] = true;
    nextTick(() => {
      const prevInput = document.querySelector(
        `input[data-index="${index - 1}"]`
      ) as HTMLInputElement;
      prevInput?.focus();
    });
  }
};

const onChildChanged = () => {
  emit("changed", value.value);
};

const computedValue = computed(() => {
  return value.value;
});

const inputClass = computed(() => {
  return ["input", props.size];
});

const paddingLeft = computed(() => {
  const paddingLeft = props.search || props.user ? "43px" : "12px";
  return props.prepaidText
    ? `calc(${paddingLeft} + ${props.prepaidText.length * 11}px)`
    : paddingLeft;
});

const paddingRight = computed(() => {
  return props.appendText
    ? `calc(12px + ${props.appendText.length * 11}px)`
    : "12px";
});

// Watch for prop changes
watch(
  () => props.v,
  (newValue: string) => {
    value.value = newValue;
  }
);

watch(value, () => {
  onChildChanged();
});
</script>
<style lang="scss">
.label {
  padding: 0 8px 8px 8px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #fff;
}

.input {
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  position: relative;
  &-eye {
    height: 20px;
    line-height: 0;
    position: absolute;
    cursor: pointer;
    top: 12px;
    right: 12px;
    z-index: 2;
  }
  &-search {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    path {
      stroke: #7a74ba;
    }
  }
  &-user-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
  &-calendar-action {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  &.big {
    input {
      font-size: 24px;
    }
  }

  &-trash-action {
    position: absolute;
    cursor: pointer;
    bottom: 11px;
    right: 11px;
  }

  &-append-text {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    line-height: 120%;
    color: #7a74ba;
  }

  &-prepaid-text {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    line-height: 120%;
    color: #7a74ba;
  }
  input {
    box-sizing: border-box;
    padding: 12px;
    width: 100%;
    height: 44px;
    background: #181720;
    border-radius: 12px;
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    color: #fff;
    border: 1px solid transparent;
    outline: none;
    &:focus {
      border-color: #f64e2a;
    }

    &::placeholder {
      font-family: "Nunito", sans-serif;
      font-weight: 600;
      font-size: 14px;
      line-height: 120%;
      color: #7a74ba;
    }
  }
}
.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 12px;
  input {
    width: 100%;
    height: 50px;
    background: transparent;
    border-radius: 12px;
    padding: 0;
    border: 1px solid #2b2741;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 28px;
    text-align: center;
    line-height: 135%;
    color: #fff;
    &.error_input {
      border-color: #f64e2a;
      color: #f64e2a;
      margin-bottom: 100px;
    }
    &:focus {
      border-color: #f64e2a;
    }
    &::placeholder {
      font-family: var(--font3);
      font-weight: 700;
      font-size: 24px;
      color: #464452;
    }
    &:focus {
      &::placeholder {
        opacity: 0;
      }
    }
  }
  .error-text {
    left: 50%;
    top: calc(100% - 50px);
    transform: translateX(-50%);
    font-weight: 500;
  }
}
</style>
