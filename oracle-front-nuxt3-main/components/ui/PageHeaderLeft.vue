<template>
    <div class="page-header-left" :class="{ 'mobile-centered': mobileCentered }">
        <button class="back-button" @click="handleBackClick">
            <img src="/svg/arrow-back.svg" alt="back" />
        </button>
        <div>
            <slot>{{ title }}</slot>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title?: string;
    backRoute?: string;
    mobileCentered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    title: '',
    backRoute: undefined,
    mobileCentered: false,
});

const emit = defineEmits<{
    back: [];
}>();

const router = useRouter();

const handleBackClick = () => {
    emit('back');
    if (props.backRoute) {
        router.push(props.backRoute);
    } else {
        router.go(-1);
    }
};
</script>

<style lang="scss" scoped>
.page-header-left {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 18px;
    font-weight: 500;
    font-family: Roboto, sans-serif;

    .back-button {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        justify-content: center;
        width: 24px;
        height: 24px;
        transition: opacity 0.2s ease;

        &:hover {
            opacity: 0.8;
        }

        img {
            width: 24px;
            height: 24px;
        }
    }

    &.mobile-centered {
        @media (max-width: 1023px) {
            gap: 0;
            position: relative;

            .back-button {
                position: relative;
                z-index: 1;
            }

            >div {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
                pointer-events: none;
            }
        }
    }
}
</style>
