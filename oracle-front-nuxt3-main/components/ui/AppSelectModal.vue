<template>
  <div
    class="selects-container"
    :class="[
      `selects-container--${props.variant}`,
      `selects-container--${props.size}`,
      { 'selects-container--multiple': props.multiple },
    ]"
    :style="{
        '--color': hexToRgb(props.color) || '',
        '--text-color': hexToRgb(props.textColor) || '',
        '--active-text-color': hexToRgb(props.activeTextColor) || '',
      } as any">
    <div @click="isOpen = !isOpen" class="selects-container__body">
      <template
        v-if="
          props.multiple &&
          Array.isArray(props.modelValue) &&
          props.modelValue.length > 0
        ">
        <div class="selects-container__body-item">
          <div
            class="selects-container__body-item-titles"
            :title="getMultipleTitles">
            <slot :item="props.modelValue" name="item">
              <div
                class="selects-container__body-item-title active-text-color"
                v-for="(item, index) in (props.modelValue as selectItem[])"
                :key="item.value">
                <img
                  v-if="item.icon"
                  :src="item.icon"
                  alt="icon"
                  class="selects-container__body-item-icon-img" />
                <span class="selects-container__body-item-text">
                  {{ item.title
                  }}<template
                    v-if="index !== (props.modelValue as selectItem[]).length - 1"
                    >,&nbsp;</template
                  >
                </span>
              </div>
            </slot>
          </div>
          <div class="selects-container__body-item-icon">
            <slot name="appendIcon">
              <SelectIcon />
            </slot>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="selects-container__body-item">
          <div
            class="selects-container__body-item-title"
            :class="{
              'active-text-color':
                (typeof props.modelValue === 'object' &&
                  props.modelValue !== null &&
                  'title' in props.modelValue &&
                  props.modelValue.title) ||
                (typeof props.modelValue === 'string' &&
                  props.modelValue !== ''),
            }">
            <slot :item="props.modelValue" name="item">
              <img
                v-if="
                  typeof props.modelValue === 'object' &&
                  props.modelValue !== null &&
                  'icon' in props.modelValue &&
                  props.modelValue.icon
                "
                :src="props.modelValue.icon as string"
                alt="icon"
                class="selects-container__body-item-icon-img" />
              <span
                :title="typeof props.modelValue === 'object' && props.modelValue !== null && 'title' in props.modelValue ? props.modelValue.title as string : undefined"
                class="selects-container__body-item-text">
                {{
                  typeof props.modelValue === "object" &&
                  props.modelValue !== null &&
                  "title" in props.modelValue &&
                  props.modelValue.title
                    ? props.modelValue.title
                    : typeof props.modelValue === "string" &&
                      props.modelValue !== ""
                    ? props.modelValue
                    : props.defaultTitle
                }}
              </span>
            </slot>
          </div>
          <div class="selects-container__body-item-icon">
            <slot name="appendIcon">
              <SelectIcon />
            </slot>
          </div>
        </div>
      </template>
    </div>
    <template v-if="props.modalType == 'draggable'">
      <DraggableModal
        class="selects-container__modal"
        :isOpen="isOpen"
        @close="closeModal">
        <div class="modal-title">
          {{ props.modalTitle }}
        </div>
        <slot name="modalContent" />
        <div class="selects-container__close" v-if="props.isCloseButton">
          <new-oracle-button
            class="selects-container__close-btn"
            @click="closeModal"
            text="Close"
            color="yellow" />
        </div>
      </DraggableModal>
    </template>
    <template v-else>
      <BillsModal
        :title="props.modalTitle"
        :isOpen="isOpen"
        :maxWidth="props.modalMaxWidth + 'px'"
        @close="closeModal">
        <slot name="modalContent" />
        <div class="selects-container__close" v-if="props.isCloseButton">
          <new-oracle-button
            class="selects-container__close-btn mt-10"
            @click="closeModal"
            text="Close"
            color="yellow" />
        </div>
      </BillsModal>
    </template>
  </div>
</template>

<script setup lang="ts">
import SelectIcon from "assets/svg/select-icon.svg?component";
import { hexToRgb } from "~/composables/formatter";
import { computed, ref, watch } from "vue";
import BillsModal from "~/components/bills-modal.vue";
import DraggableModal from "~/components/draggable-modal.vue";

export interface selectItem {
  title?: string;
  value: string;
  prepaidIcon?: string;
  appendIcon?: string;
  icon?: string;
  [key: string]: string | number | boolean | undefined;
}

interface Props {
  color?: string;
  textColor?: string;
  activeTextColor?: string;
  multiple?: boolean;
  modelValue?: selectItem | selectItem[] | string | null;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "outline" | "text";
  modalType?: "draggable" | "default";
  modalTitle?: string;
  defaultTitle?: string;
  isCloseButton?: boolean;
  modalMaxWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  color: "#1B1A24",
  textColor: "#ffffff",
  activeTextColor: "#ffffff",
  multiple: false,
  modelValue: undefined,
  size: "md",
  variant: "default",
  modalType: "draggable",
  modalTitle: "",
  defaultTitle: "",
  isCloseButton: false,
  modalMaxWidth: 500,
});

const isOpen = ref(false);

const getMultipleTitles = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.map((item) => item.title).join(", ");
  }
  return "";
});

function closeModal() {
  isOpen.value = false;
}

watch(isOpen, (newVal) => {
  if (typeof window !== "undefined") {
    const nuxtApp = useNuxtApp();
    const emit = nuxtApp.$emit;
    if (typeof emit === "function") {
      if (newVal) {
        emit("open-modal");
      } else {
        emit("close-modal");
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.selects-container {
  min-width: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 16px;

  // Размеры
  &--sm {
    min-width: 40px;
    border-radius: 14px;

    .selects-container__body-item {
      padding: 6px 8px;
    }

    .selects-container__body-item-title {
      font-size: 12px;
    }

    .selects-container__body-item-icon {
      width: 12px;
      height: 12px;
      margin-left: 6px;

      svg {
        width: 12px;
        height: 12px;
      }
    }
  }

  &--md {
    min-width: 50px;

    border-radius: 16px;
    .selects-container__body-item {
      padding: 10px;
    }

    .selects-container__body-item-title {
      font-size: 14px;
    }

    .selects-container__body-item-icon {
      width: 14px;
      height: 14px;
      margin-left: 10px;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }

  &--lg {
    min-width: 60px;
    border-radius: 18px;

    .selects-container__body-item {
      padding: 12px 14px;
    }

    .selects-container__body-item-title {
      font-size: 16px;
    }

    .selects-container__body-item-icon {
      width: 16px;
      height: 16px;
      margin-left: 12px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  &--xl {
    min-width: 70px;
    border-radius: 20px;
    .selects-container__body-item {
      padding: 16px 18px;
    }

    .selects-container__body-item-title {
      font-size: 18px;
    }

    .selects-container__body-item-icon {
      width: 18px;
      height: 18px;
      margin-left: 14px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  &--default {
    background-color: rgba(var(--color));
    color: rgba(var(--text-color));
    &:hover {
      background-color: rgba(var(--color), 0.8);
      color: rgba(var(--text-color), 0.8);
    }
  }
  &--outline {
    color: rgba(var(--text-color));
    border: 1px solid rgba(var(--color));
    &:hover {
      border-color: rgba(var(--color), 0.8);
      color: rgba(var(--text-color), 0.8);
    }
  }
  &--text {
    color: rgba(var(--text-color));
    &:hover {
      color: rgba(var(--text-color), 0.8);
    }
  }
  &:hover {
    .selects-container__body-item-icon {
      svg {
        path {
          stroke: rgba(var(--text-color), 0.8);
        }
      }
    }
  }
  &__body-item {
    color: rgba(var(--text-color));
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__body-item-titles {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__body-item-title {
    font-weight: 400;
    color: var(--text-color);
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active-text-color .selects-container__body-item-text {
      color: rgba(var(--active-text-color));
    }
  }
  &__body-item-icon-img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
  }
  &__body-item-text {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__body-item-icon {
    border-radius: 50%;
    color: rgba(var(--text-color));
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      path {
        transition: all 0.2s ease;
        stroke: rgba(var(--text-color));
      }
    }
  }
}
</style>

<style lang="scss">
.selects-container__modal {
  display: flex;
  flex-direction: column;
  justify-content: end;
  .draggable-modal-content {
    width: 100%;
    height: auto;
  }
  .modal-title {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 10px;
  }
}
</style>
