<template>
  <div ref="selectRef" class="form-select form__select">
    <button
      class="select-btn"
      :class="{ active: isOpen }"
      @click="isOpen = !isOpen"
    >
      <div class="select-value">
        <span v-if="selectedItems.length == 0" class="default-value">
          {{ label }}
        </span>
        <template v-else>
          <span
            v-for="(name, i) in selectedItems"
            :key="i"
            class="selected-values"
          >
            {{ name }},
          </span>
        </template>
      </div>
      <span class="arrown-icon">
        <img :src="'/svg/arrow-back.svg'" alt="" />
      </span>
    </button>
    <div class="select-menu" :class="{ show: isOpen }">
      <div v-for="option in data" :key="option.id" class="select-option">
        <button class="option-button" @click="addSelected(option.name)">
          <div class="icon">
            <img :src="option.img" alt="" />
          </div>
          <p class="option-text">
            {{ option.name }}
          </p>
          <div class="form-control">
            <checkbox-oracle :checked="option.selected" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  id: number
  img: string
  name: string
  selected: boolean
}

interface Props {
  data?: Item[]
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  label: '',
})

const emit = defineEmits<{
  update: [value: Item[]]
}>()

// Reactive state
const isOpen = ref(false)
const selectedItems = ref<string[]>([])
const localData = ref<Item[]>([...props.data])
const selectRef = ref<HTMLElement | null>(null)

// Watch for prop changes
watch(() => props.data, (newVal) => {
  localData.value = [...newVal]
}, { deep: true })

// Methods
const addSelected = (name: string) => {
  localData.value.forEach((item) => {
    if (item.name === name) {
      item.selected = !item.selected
    }
  })
  const index = selectedItems.value.indexOf(name)
  if (index !== -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(name)
  }

  emit('update', localData.value)
}

const ClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  const selectEl = selectRef.value

  if (selectEl && !selectEl.contains(target)) {
    isOpen.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', ClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', ClickOutside)
})
</script>

<style lang="scss">
.form__select {
  width: 100%;
  position: relative;
  z-index: 2;
  .select-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-bottom: 1px solid #2d2b3b;
    padding: 5px 0;
    cursor: pointer;
    transition: 0.2s;
    &.active {
      border-color: #f64e2a;
      .arrown-icon {
        img {
          transform: rotate(-270deg);
        }
      }
    }
    .left-block {
      display: flex;
      align-items: center;
      gap: 8px;
      .coin-img {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .coin-info {
        &-head {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 5px;
          .coin-name {
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 130%;
            color: #fff;
          }
          .coin-price {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            text-transform: uppercase;
            color: #67639a;
          }
        }
      }
    }
    .arrown-icon {
      width: 16px;
      img {
        filter: brightness(0) saturate(100%) invert(98%) sepia(1%)
          saturate(572%) hue-rotate(194deg) brightness(117%) contrast(100%);
        transform: rotate(-90deg);
        transition: 0.3s;
      }
    }
  }
  .select-menu {
    width: calc(100% + 32px);
    padding: 0 16px 3px;
    background: #13121b;
    box-shadow:
      0 10px 20px rgba(0, 0, 0, 0.19),
      0 6px 6px rgba(0, 0, 0, 0.23);
    border-radius: 0 0 8px 8px;
    position: absolute;
    top: calc(100% + 30px);
    left: -16px;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s;
    z-index: -1;
    &.show {
      top: calc(100%);
      visibility: visible;
      opacity: 1;
    }
    .menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 0;
      border-bottom: 1px solid #f64e2a;
      cursor: pointer;
      &:last-child {
        border: 0;
      }
      .coin-img {
        width: 28px;
        height: 28px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .coin-info {
        &-head {
          display: flex;
          flex-direction: column;
          gap: 5px;
          .coin-name {
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            font-size: 12px;
            text-transform: uppercase;
            color: #fff;
          }
          .coin-price {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 12px;
            text-transform: uppercase;
            color: #67639a;
          }
        }
      }
    }
  }
}
</style>
