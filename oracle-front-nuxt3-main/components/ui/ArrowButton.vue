<template>
    <button 
        class="arrow-button" 
        :class="buttonClass"
        :style="buttonStyle"
        @click="$emit('click')"
    >
        <svg :width="svgWidth" :height="svgHeight" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                :d="direction === 'up' ? upPath : downPath"
                :stroke="color" 
                stroke-width="2" 
                stroke-linecap="round" 
            />
        </svg>
    </button>
</template>

<script setup lang="ts">
interface Props {
    direction?: 'up' | 'down'
    color?: string
    buttonClass?: string
    buttonWidth?: number
    buttonHeight?: number
    svgWidth?: number
    svgHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
    direction: 'up',
    color: '#F64E2A',
    svgWidth: 13,
    svgHeight: 8,
})

const emit = defineEmits<{
    click: []
}>()

const upPath = 'M1.84375 6.3125L5.88171 1.82588C6.27895 1.3845 6.97105 1.3845 7.36829 1.82588L11.4063 6.3125'
const downPath = 'M11.4062 1.6875L7.36829 6.17412C6.97105 6.6155 6.27895 6.6155 5.88171 6.17412L1.84375 1.6875'

const buttonStyle = computed(() => {
    const style: Record<string, string> = {}
    if (props.buttonWidth) style.width = `${props.buttonWidth}px`
    if (props.buttonHeight) style.height = `${props.buttonHeight}px`
    return style
})
</script>

<style lang="scss" scoped>
.arrow-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.7;
    }

    svg {
        display: block;
    }
}
</style>

