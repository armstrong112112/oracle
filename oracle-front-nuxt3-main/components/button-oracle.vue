<template>
  <button
    class="button_oracle"
    :class="backgrounColor"
    @click="handleClick"
  >
    <TelegramIcon v-if="icon == 'telegram'" />
    <MessageIcon v-if="icon == 'message'" />
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import TelegramIcon from '@/assets/svg/telegram.svg?component'
import MessageIcon from '@/assets/svg/message.svg?component'

// Props
interface Props {
  text?: string
  icon?: string
  color?: string
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  icon: '',
  color: 'black',
  to: '',
})

// Use localePath if needed
const localePath = useLocalePath()
const router = useRouter()

// Computed properties
const backgrounColor = computed(() => props.color)

// Methods
const handleClick = () => {
  if (props.to) {
    router.push(props.to)
  }
}
</script>

<style lang="scss">
.button_oracle {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  gap: 10px;
  width: 100%;
  height: 52px;
  border: 2px solid #f64e2a;
  box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.25);
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  span {
    font-family: 'Hanson';
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    color: #ffffff;
  }

  &.black {
    background-color: #0a090f;
    border-color: #e70303;
  }
  &.orange {
    background-color: #f64e2a;
  }
  &.gray {
    background-color: #1f1e27;
  }
}
</style>
