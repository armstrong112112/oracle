<template>
  <div class="block-nav-back">
    <nuxt-link :to="to" class="back-button" @click.stop="$emit('prev')">
      <arrowBackIcon />
    </nuxt-link>
    <span class="block-nav-back__text">
      {{ text }}
    </span>
    <button v-if="more" class="more-btn">
      <MoreIcon />
    </button>
    <nuxt-link v-if="add && addto" :to="addto" class="add-btn">
      <AddIcon />
    </nuxt-link>
    <button v-if="add && !addto" class="add-btn" @click="$emit('add')">
      <AddIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import arrowBackIcon from "@/assets/svg/oracle-back.svg?component";
// @ts-ignore
import MoreIcon from "@/assets/svg/more-horizontal.svg?component";
// @ts-ignore
import AddIcon from "@/assets/svg/add-icon.svg?component";

// Props
interface Props {
  text?: string;
  to?: string;
  addto?: string;
  more?: boolean;
  add?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  to: "",
  addto: "",
  more: false,
  add: false,
});

// Emits
const emit = defineEmits<{
  prev: [];
  add: [];
}>();
</script>
<style lang="scss" scoped>
.block-nav-back {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 11px 0;
  margin-bottom: 16px;
  position: relative;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: #fff;
  .back-button {
    min-width: 22px;
    min-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    box-shadow: none;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    z-index: 3;
    svg {
      path {
        stroke: #fff;
      }
    }
  }
  .more-btn,
  .add-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    z-index: 3;
  }
  &__text {
    width: 100%;
    text-align: center;
  }
}
</style>
