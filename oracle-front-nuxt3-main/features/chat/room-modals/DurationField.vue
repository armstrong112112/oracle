<template>
  <div class="duration">
    <p class="duration__label">{{ label }}</p>
    <div class="duration__row">
      <input
        class="duration__number"
        type="number"
        min="1"
        inputmode="numeric"
        :disabled="unit === 'forever'"
        :value="amount"
        @input="onAmount"
      />
      <div class="duration__unit">
        <button class="duration__chip" type="button" @click="open = !open">
          {{ unitLabel }}
        </button>
        <ul v-if="open" class="duration__menu">
          <li v-for="option in units" :key="option.value">
            <button type="button" @click="pick(option.value)">{{ option.label }}</button>
          </li>
        </ul>
      </div>
    </div>
    <p v-if="caption" class="duration__caption">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
import type { DurationUnit } from "~/features/chat/room-modals/types";

const props = defineProps<{
  amount: number;
  unit: DurationUnit;
  label: string;
  caption?: string;
}>();

const emit = defineEmits<{
  "update:amount": [value: number];
  "update:unit": [value: DurationUnit];
}>();

const { t } = useI18n();
const open = ref(false);

const units = computed(() => [
  { value: "minutes" as const, label: t("chat.card.unitMinutes") },
  { value: "hours" as const, label: t("chat.card.unitHours") },
  { value: "months" as const, label: t("chat.card.unitMonths") },
  { value: "years" as const, label: t("chat.card.unitYears") },
  { value: "forever" as const, label: t("chat.card.unitForever") },
]);

const unitLabel = computed(() => units.value.find((option) => option.value === props.unit)?.label ?? "");

const onAmount = (event: Event): void => {
  const next = Number((event.target as HTMLInputElement).value);
  emit("update:amount", Number.isFinite(next) && next > 0 ? Math.floor(next) : 1);
};

const pick = (value: DurationUnit): void => {
  emit("update:unit", value);
  open.value = false;
};
</script>

<style lang="scss" scoped>
.duration__label,
.duration__caption {
  margin: 0;
  color: #8780cf;
  font-size: 12px;
}

.duration__label {
  margin-bottom: 8px;
  font-size: 14px;
}

.duration__row {
  display: flex;
  gap: 8px;
}

.duration__number,
.duration__chip {
  height: 44px;
  border: 0;
  border-radius: 12px;
  background: #1b1a24;
  color: #fff;
  font-family: Inter, Roboto, sans-serif;
  font-size: 14px;
}

.duration__number {
  flex: 1;
  min-width: 0;
  padding: 0 12px;
  outline: none;
}

.duration__number:disabled {
  opacity: 0.45;
}

.duration__unit {
  position: relative;
}

.duration__chip {
  min-width: 96px;
  padding: 0 14px;
  cursor: pointer;
}

.duration__menu {
  position: absolute;
  z-index: 3;
  top: calc(100% + 4px);
  right: 0;
  min-width: 140px;
  margin: 0;
  padding: 4px;
  list-style: none;
  border-radius: 12px;
  background: #1b1a24;
}

.duration__menu button {
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}

.duration__menu button:hover {
  background: #2b2741;
}

.duration__caption {
  margin-top: 8px;
}
</style>
