<template>
    <div :class="place === 1 ? 'first-place' : place === 2 ? 'second-place' : 'third-place'"
        class="game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-avatar">
        <img :src="avatar" alt="avatar" />
    </div>

    <div class="game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-name">
        {{ name }}
    </div>

    <div class="game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-money">
        <div class="positive-money">{{ money > 0 ? '+' : '' }}{{ money }} $</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    place: number;
    avatar: string;
    name: string;
    money: number;
}>()
</script>

<style lang="scss" scoped>
.game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-avatar {
    width: 38px;
    height: 38px;
    background-color: #8780CF;
    border-radius: 100px;
    border: 1px solid #ADADAD;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &.first-place {
        border: 1px solid #FFCE54;
    }

    &.second-place {
        border: 1px solid #ADADAD;
    }

    &.third-place {
        border: 1px solid #744005;
    }
}

.game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-name {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 145%;
}

.game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-money {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;
    background-color: #1B1A24;
    border-radius: 20px;
    border: 1px solid #2B2741;
    gap: 10px;

    .positive-money {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 145%;
        color: #31F62A;
    }
}
</style>
