<template>
  <div ref="modalRef" class="draggable-modal" :class="{ show: isOpen }">
    <div ref="modalContentRef" class="draggable-modal-content">
      <div ref="handleRef" class="drag-handle-container">
        <div class="drag-handle"></div>
      </div>
      <div ref="modalContentInRef" class="draggable-modal-content__in">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
})

const emit = defineEmits<{
  close: []
}>()

// Reactive state
const modalRef = ref<HTMLElement | null>(null)
const modalContentRef = ref<HTMLElement | null>(null)
const modalContentInRef = ref<HTMLElement | null>(null)
const handleRef = ref<HTMLElement | null>(null)
const startY = ref(0)
const moveY = ref(0)

// Methods
const ClickOutside = (event: Event): void => {
  const target = event.target as Node
  const modalWrapper = modalRef.value
  if (
    modalWrapper &&
    modalWrapper.contains(target) &&
    modalContentRef.value &&
    !modalContentRef.value.contains(target)
  ) {
    emit('close')

    setTimeout(() => {
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = '0'
    }, 200)
  }
}

const openModal = () => {
  if (!modalContentInRef.value || !modalRef.value || !modalContentRef.value) return
  modalContentInRef.value.style.opacity = '1'
  modalRef.value.style.backgroundColor = `rgba(0, 0, 0, 0.8)`
  modalContentRef.value.style.transform = `translateY(0%)`
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = '15px'
}

const closeModal = () => {
  if (!modalContentInRef.value || !modalRef.value || !modalContentRef.value) return
  modalContentInRef.value.style.opacity = '0'
  modalRef.value.style.backgroundColor = `rgba(0, 0, 0, 0)`
  modalContentRef.value.style.transform = `translateY(100%)`
  document.body.style.overflow = 'auto'
  document.body.style.paddingRight = '0'
}

const handleTouchStart = (e: TouchEvent) => {
  startY.value = e.touches[0].clientY
}

const handleTouchMove = (e: TouchEvent) => {
  simulateDrag(e.touches[0].clientY, e.target as HTMLElement | null)
}

const handleTouchEnd = () => {
  endDrag()
}

const handleMouseDown = (e: MouseEvent) => {
  startY.value = e.clientY
}

const handleMouseMove = (e: MouseEvent) => {
  if (e.buttons !== 1) return
  simulateDrag(e.clientY, e.target as HTMLElement | null)
}

const handleMouseUp = () => {
  endDrag()
}

const simulateDrag = (currentY: number, target: HTMLElement | null) => {
  if (
    modalContentInRef.value &&
    target &&
    !target.closest('.draggable-modal-content__in')
  ) {
    if (!modalRef.value || !modalContentRef.value) return

    moveY.value = currentY
    const deltaY = moveY.value - startY.value
    const modalHeight = modalContentRef.value.clientHeight
    const newOpacity = Math.max(1 - deltaY / modalHeight, 0)
    const newBgOpacity = Math.max(0.8 - deltaY / modalHeight, 0)

    if (deltaY > 0) {
      if (newOpacity < 1) {
        modalRef.value.style.transition = '0s'
        modalRef.value.style.backgroundColor = `rgba(0, 0, 0, ${newBgOpacity})`
        modalContentInRef.value.style.opacity =
          deltaY < modalHeight / 1.6 ? `${newOpacity}` : '0'
      }

      if (deltaY > modalHeight / 1.6) {
        emit('close')
        modalContentInRef.value.style.opacity = '0'
        modalRef.value.style.backgroundColor = `rgba(0, 0, 0, 0)`
        modalContentRef.value.style.setProperty(
          'transform',
          `translateY(100%)`,
          'important',
        )
        modalContentRef.value.style.transition = '0.2s'
        modalRef.value.style.transition = '0.2s'
        setTimeout(() => {
          document.body.style.overflow = 'auto'
          document.body.style.paddingRight = '0'
        }, 200)
      } else {
        modalContentRef.value.style.setProperty(
          'transform',
          `translateY(${deltaY}px)`,
          'important',
        )
        modalContentRef.value.style.transition = '0.2s, transform 0s'
      }
    } else {
      modalContentInRef.value.style.opacity = '1'
    }
  }
}

const endDrag = () => {
  if (!modalRef.value || !modalContentRef.value || !modalContentInRef.value) return

  const deltaY = moveY.value - startY.value
  modalRef.value.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
  modalContentInRef.value.style.opacity = '1'
  modalContentRef.value.style.transition = '0.2s, transform 0.2s'
  modalRef.value.style.transition = '0.2s'

  if (deltaY > modalContentRef.value.clientHeight / 1.6) {
    emit('close')
    modalContentInRef.value.style.opacity = '0'
    modalRef.value.style.backgroundColor = `rgba(0, 0, 0, 0)`
    modalContentRef.value.style.transform = `translateY(100%)`
    modalContentRef.value.style.transition = '0.2s'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = '0'
    }, 200)
  } else {
    modalContentRef.value.style.transform = 'translateY(0)'
  }
}

// Lifecycle hooks
onMounted(() => {
  if (modalContentRef.value) {
    // Touch (mobil)
    modalContentRef.value.addEventListener('touchstart', handleTouchStart)
    modalContentRef.value.addEventListener('touchmove', handleTouchMove)
    modalContentRef.value.addEventListener('touchend', handleTouchEnd)

    // Mouse (desktop)
    modalContentRef.value.addEventListener('mousedown', handleMouseDown)
    modalContentRef.value.addEventListener('mousemove', handleMouseMove)
    modalContentRef.value.addEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('click', ClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', ClickOutside)

  if (modalContentRef.value) {
    modalContentRef.value.removeEventListener('touchstart', handleTouchStart)
    modalContentRef.value.removeEventListener('touchmove', handleTouchMove)
    modalContentRef.value.removeEventListener('touchend', handleTouchEnd)

    modalContentRef.value.removeEventListener('mousedown', handleMouseDown)
    modalContentRef.value.removeEventListener('mousemove', handleMouseMove)
    modalContentRef.value.removeEventListener('mouseup', handleMouseUp)
  }
})
</script>

<style lang="scss">
@use "@/assets/styles/components/_draggable-modal.scss" as *;
</style>
