<template>
    <div class="search-input" ref="searchInputRef">
        <img :src="searchIcon" alt="search" />
        <input type="text" :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" @focus="$emit('focus')"
            @blur="$emit('blur')" />
    </div>
</template>

<script setup lang="ts">
const searchIcon = '/svg/shop/icons/search.svg';

interface Props {
    placeholder?: string;
    modelValue?: string;
}

withDefaults(defineProps<Props>(), {
    modelValue: '',
});

defineEmits<{
    'update:modelValue': [value: string];
    'focus': [];
    'blur': [];
}>();

const searchInputRef = ref<HTMLElement | null>(null);

defineExpose({
    searchInputRef,
});
</script>

<style lang="scss" scoped>
.search-input {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 13px 14px;
    background-color: #1b1a24;
    border: 1px solid transparent;
    border-radius: 12px;
    width: 391px;
    height: 36px;
    transition: border-color 0.3s ease;
    box-sizing: border-box;

    &:focus-within {
        border-color: #f64e2a;
    }

    img {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
    }

    input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: 400;

        &::placeholder {
            color: #7873B4;
        }

        &:focus::placeholder {
            color: #fff;
        }
    }
}
</style>
