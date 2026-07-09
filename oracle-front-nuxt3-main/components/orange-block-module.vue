<template>
    <div class="orange-block-module">
        <div class="orange-block-module-child">
            <p v-if="title" class="orange-block-module-title">{{ title }}</p>
            <ButtonOracle v-if="btnText" :text="btnText" color="orange" />
            <LinkOracle v-if="linkText" :text="linkText" arrow="right" />
            <span v-if="text" class="orange-block-module-text">{{ text }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title?: string
    btnText?: string
    linkText?: string
    text?: string
}

withDefaults(defineProps<Props>(), {
    title: '',
    btnText: '',
    linkText: '',
    text: '',
})
</script>

<style lang="scss">
.orange-block-module {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    background: #121119;
    border-radius: 12px;
    padding: 1px;
    background-image: linear-gradient(to right bottom, #EB4B2A, #232130, #232130);
    background-clip: padding-box, border-box;

    &-child {
        background-color: #121119;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        background-image: linear-gradient(to right bottom, rgba(235, 75, 42, 0.2), rgba(35, 33, 48, 0.2), rgba(35, 33, 48, 0.2));

    }

    &-title {
        margin: 0;
        font-family: 'Druk Text Wide Cyr';
        font-style: normal;
        font-weight: 500;
        font-size: 27px;
        line-height: 100%;
        letter-spacing: 1.5px;
        text-align: center;
        text-transform: uppercase;
        background: linear-gradient(125.57deg, #FFFFFF 26.72%, #EB6323 83.64%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    &-text {
        font-family: 'Reza Zulmi Alfaizi Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
      
    }
}
</style>