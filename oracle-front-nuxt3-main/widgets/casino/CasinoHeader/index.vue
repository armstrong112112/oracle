<template>
    <div class="casino-header">
        <div>{{ title }}</div>
        <div class="casino-header-cyrcly-wrapper">
            <div class="casino-header-cyrcly" :class="{ active: activeIndex === 1 }"></div>
            <div class="casino-header-cyrcly" :class="{ active: activeIndex === 2 }"></div>
            <div class="casino-header-cyrcly" :class="{ active: activeIndex === 3 }"></div>
            <div class="casino-header-cyrcly" :class="{ active: activeIndex === 4 }"></div>
            <div class="casino-header-cyrcly" :class="{ active: activeIndex === 5 }"></div>
            <div class="casino-header-cyrcly" :class="{ active: activeIndex === 6 }"></div>
            <div class="casino-header-cyrcly" :class="{ active: activeIndex === 7 }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    activeIndex: number;
}>();

</script>

<style lang="scss" scoped>
.casino-header {
    display: flex;
    flex-direction: column;
    justify-content: end;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    border: 1px solid #2B2741;
    padding: 24px;
    gap: 10px;
    background-image: url('/images/casino/casino.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    font-family: Hector, sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 135%;
    letter-spacing: 0;

    .casino-header-cyrcly-wrapper {
        display: flex;
        align-items: center;
        gap: 5px;

        .casino-header-cyrcly {
            width: 5px;
            height: 5px;
            border-radius: 100%;
            background-color: #FFFFFF66;

            &.active {
                background-color: #FFFFFF;
            }
        }
    }
}

@media (max-width: 1023px) {
    .casino-header {
        border-radius: 0;
        border: none;
        width: 100vw;
        height: 205px;
    }
}
</style>