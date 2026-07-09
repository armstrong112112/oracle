<template>
  <history-modal
    :class="modalClasses"
    :is-visible="isVisible"
    @close="closeModal">
    <div class="modal-head">
      <button class="close-btn" @click="closeModal">
        <CloseIcon />
      </button>
      <div class="coin-icon" v-if="coinIcon">
        <img :src="coinIcon" :alt="coinName || 'Coin'" />
      </div>
      <h3 class="modal-title">{{ title }}</h3>
      <div class="border-bottom">
        <svg
          width="290"
          height="1"
          viewBox="0 0 290 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0.5H290" stroke="#60578E" stroke-dasharray="8 8" />
        </svg>
      </div>
    </div>

    <div class="user-info">
      <ul class="user-info__list">
        <template v-for="(group, index) in data" :key="index">
          <li class="list-item">
            <div class="info-head">
              <h5
                class="info-top__text"
                v-for="(item, i) in group"
                :key="`title-${i}`">
                {{ item.title }}
              </h5>
            </div>
            <div
              class="info-bottom"
              :style="
                hasIconRight(group)
                  ? 'flex-direction: row-reverse; justify-content: space-between;'
                  : ''
              ">
              <template v-for="(item, i) in group" :key="`value-${i}`">
                <div class="coin-icon" v-if="item.icon">
                  <img :src="item.icon" :alt="item.title" />
                </div>
                <h5
                  class="info-bottom__text"
                  :class="{
                    'total-bottom__text': item.type === 'total',
                    'issuance-bottom__text': item.type === 'issuance',
                  }">
                  <template v-if="typeof item.value === 'object'">
                    {{ item.value.value }} {{ item.value.currency }}
                    <span v-if="item.value.usdEquivalent">
                      ≈ {{ item.value.usdEquivalent }}
                    </span>
                  </template>
                  <template v-else>
                    {{ item.value }}
                  </template>

                  <button
                    class="copy-btn"
                    v-if="item.copy"
                    @click="copyValue(item.value)">
                    <CopyIcon />
                  </button>
                </h5>
              </template>
            </div>
          </li>
        </template>
      </ul>
    </div>

    <button v-if="showActionButton" class="more-btn" @click="handleAction">
      {{ actionButtonText || $t("history.viewDetails") }}
    </button>
  </history-modal>
</template>

<script setup lang="ts">
import CloseIcon from "@/assets/svg/close.svg?component";
import CopyIcon from "@/assets/svg/copy.svg?component";

interface Amount {
  value: string;
  currency: string;
  usdEquivalent?: string;
}

interface DataItem {
  title: string;
  value: string | Amount;
  icon?: string;
  type?: "total" | "issuance";
  copy?: boolean;
  iconRight?: boolean;
}

interface Props {
  isVisible?: boolean;
  data: DataItem[][];
  title?: string;
  coinIcon?: string;
  coinName?: string;
  showActionButton?: boolean;
  actionButtonText?: string;
  onAction?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  data: () => [],
  title: "",
  coinIcon: "",
  coinName: "",
  showActionButton: true,
  actionButtonText: "",
  onAction: undefined,
});

const emit = defineEmits<{
  close: [];
  action: [];
}>();

// Computed
const modalClasses = computed((): string[] => {
  return ["history-successfully__modal", "transfers-external__history"];
});

// Methods
const hasIconRight = (group: DataItem[]): boolean => {
  return group.some((item) => item.iconRight);
};

const closeModal = () => {
  emit("close");
};

const copyValue = (value: string | Amount) => {
  let textToCopy = "";
  if (typeof value === "object") {
    textToCopy = `${value.value} ${value.currency}`;
    if (value.usdEquivalent) {
      textToCopy += ` ≈ ${value.usdEquivalent}`;
    }
  } else {
    textToCopy = value;
  }

  navigator.clipboard.writeText(textToCopy);
  // Можно добавить уведомление об успешном копировании
};

const handleAction = () => {
  if (props.onAction) {
    props.onAction();
  } else {
    emit("action");
  }
};
</script>
