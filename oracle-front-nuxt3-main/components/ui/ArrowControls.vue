<template>
    <div class="arrow-controls" :class="[containerClass, direction]">
        <ArrowButton direction="up" :color="color" :button-class="buttonClass" :button-width="buttonWidth"
            :button-height="buttonHeight" :svg-width="svgWidth" :svg-height="svgHeight" @click="$emit('up')" />
        <ArrowButton direction="down" :color="color" :button-class="buttonClass" :button-width="buttonWidth"
            :button-height="buttonHeight" :svg-width="svgWidth" :svg-height="svgHeight" @click="$emit('down')" />
    </div>
</template>

<script setup lang="ts">
import ArrowButton from './ArrowButton.vue'

interface Props {
    color?: string
    buttonClass?: string
    containerClass?: string
    gap?: number
    direction?: 'column' | 'row'
    buttonWidth?: number
    buttonHeight?: number
    svgWidth?: number
    svgHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
    color: '#F64E2A',
    gap: 2,
    direction: 'column',
    svgWidth: 13,
    svgHeight: 8,
})

const emit = defineEmits<{
    up: []
    down: []
}>()
</script>

<style lang="scss" scoped>
.arrow-controls {
    display: flex;
    gap: v-bind('`${props.gap}px`');

    &.column {
        flex-direction: column;
    }

    &.row {
        flex-direction: row;
    }
}
</style>
