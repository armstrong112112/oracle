<template>
    <button class="close-button" :class="buttonClass" @click="$emit('click')">
        <img :src="iconSrc" :alt="alt" :style="iconStyle" />
    </button>
</template>

<script setup lang="ts">
interface Props {
    iconSrc?: string
    alt?: string
    buttonClass?: string
    iconWidth?: number
    iconHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
    iconSrc: '/svg/close.svg',
    alt: 'close',
    iconWidth: 20,
    iconHeight: 20,
})

const emit = defineEmits<{
    click: []
}>()

const iconStyle = computed(() => ({
    width: `${props.iconWidth}px`,
    height: `${props.iconHeight}px`,
}))
</script>

<style lang="scss" scoped>
.close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &:hover {
        background: #2b2741;
    }

    img {
        display: block;
    }
}
</style>
