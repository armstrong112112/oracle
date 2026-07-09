<template>
  <div class="form-checkbox">
    <input type="checkbox" :checked="checked" @change="handleChange" />
    <span @click="toggleChecked">
      <CheckIcon v-if="checked"  />
    </span>
  </div>
</template>

<script setup lang="ts">
import CheckIcon from "@/assets/svg/arrow-checked.svg?component";

// Props
interface Props {
  checked?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
});

// Emits
const emit = defineEmits<{
  "update:checked": [value: boolean];
}>();

// Methods
const toggleChecked = () => {
  emit("update:checked", !props.checked);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:checked", target.checked);
};
</script>

<style lang="scss">
.form-checkbox {
  display: flex;
  gap: 10px;
  padding: 0 38px;
  align-items: center;
  cursor: pointer;
  input {
    display: none;
  }

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    min-width: 20px;
    height: 20px;
    background: #343242;
    border-radius: 3px;
    cursor: pointer;

    .check-icon {
      width: 10px;
      height: 10px;
    }
  }
}
</style>
