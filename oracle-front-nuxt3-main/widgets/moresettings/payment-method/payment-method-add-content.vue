<template>
  <div class="payment-methods__add">
    <div class="main-container">
      <block-nav-back
        v-if="!isModal"
        :to="localePath('/moresettings/payment-methods')"
        :text="$t('moreSettings.paymentMethods')"
      />
      <div class="payment-methods__add-search">
        <input-oracle
          :v="searchQuery"
          :search="true"
          :placeholder="$t('moreSettings.search')"
          @changed="onUpdatedVal($event)"
        />
        <div class="dropdown">
          <button class="arrow-sort__btn" @click="toggleSortOrder">
            <ArrowSortIcon />
          </button>
        </div>
      </div>

      <ul class="payment-methods__add-list">
        <li
          v-for="item of filteredAndSortedData"
          :key="item.id"
          class="payment-methods__add-item"
          @click="selectPaymentMethod(item)"
        >
          <span class="payment-methods__add-item-label">{{ item.name }}</span>
        </li>
      </ul>


    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowSortIcon from '@/assets/svg/filter-icon.svg?component'

interface Props {
  isModal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isModal: false,
})

const emit = defineEmits<{
  'open-bank-info': [item: any]
}>()

const localePath = useLocalePath()
const router = useRouter()

const searchQuery = ref<string>('')
const dropdown = ref<boolean>(false)
const sortAsc = ref<boolean>(true)
const windowWidth = ref<number>(0)

const data = [
  {
    id: 1,
    name: 'Litecoin',
  },
  {
    id: 2,
    name: 'XRP',
  },
  {
    id: 3,
    name: 'Bitcoin',
  },
  {
    id: 4,
    name: 'Etherium',
  },
  {
    id: 5,
    name: 'USDT',
  },
  {
    id: 6,
    name: 'BNB',
  },
]

const isMobile = computed(() => windowWidth.value < 1024)

const filteredAndSortedData = computed(() => {
  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )

  return filtered.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()

    if (sortAsc.value) {
      return nameA.localeCompare(nameB)
    } else {
      return nameB.localeCompare(nameA)
    }
  })
})

const handleResize = () => {
  if (import.meta.client) {
    windowWidth.value = window.innerWidth
  }
}

const ClickOutside = (event: MouseEvent) => {
  if (import.meta.client) {
    const dropdownEl = document.querySelector('.dropdown')
    if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
      dropdown.value = false
    }
  }
}

const onUpdatedVal = (val: string) => {
  searchQuery.value = val
}

const toggleSortOrder = () => {
  sortAsc.value = !sortAsc.value
}

const selectPaymentMethod = (item: any) => {
  if (isMobile.value) {
    // На мобильных устройствах переходим на страницу bank-info
    router.push(localePath('/moresettings/payment-methods/bank-info'))
  } else {
    // На ПК эмитим событие для открытия модального окна
    emit('open-bank-info', item)
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', ClickOutside)
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener('click', ClickOutside)
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss">
.payment-methods__add {
  .main-container {
    @media (min-width: 1024px) {
      min-height: auto;
      max-width: 100%;
    }
  }
  &-search {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    .input {
      width: 100%;
    }
  }
  .dropdown {
    position: relative;
    .arrow-sort__btn {
      width: 44px;
      height: 44px;
      background: #181720;
      border: 1px solid #2b2741;
      border-radius: 12px;
      cursor: pointer;
    }
    .dropdown-menu {
      min-width: 100px;
      border-radius: 5px;
      position: absolute;
      top: calc(100% + 15px);
      right: 0;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transition: 0.2s;
      &.show {
        opacity: 1;
        visibility: visible;
        top: calc(100% + 5px);
      }
      .dropdown-item {
        .sort-btn {
          width: 100%;
          padding: 5px 10px;
          background: #13121b;
          white-space: nowrap;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 140%;
          text-align: left;
          color: #fff;
          transition: 0.2s;
          &.active {
            background: #181720;
          }
        }
      }
    }
  }
  &-item {
    margin-right: -16px;
    padding: 16px 16px 16px 4px;
    border-bottom: 1px solid #2b2741;
    cursor: pointer;
    transition: 0.2s;
    &-label {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
  }
}
</style> 