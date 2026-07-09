<template>
    <div class="casino-all-games-container">
        <div class="casino-all-games-title-wrapper">
            <div class="casino-all-games-title">All Games</div>
        </div>

        <div class="casino-all-games-items-wrapper">
            <div v-for="item in CASINO_ALL_GAMES_DATA" :key="item.id" class="casino-all-games-item-container">
                <CasinoAllGamesItem :title="item.title" :icon="item.icon" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CasinoAllGamesItem from './CasinoAllGamesItem/index.vue';

const CASINO_ALL_GAMES_DATA = [
    {
        id: 1,
        title: "Name",
        icon: ""
    },
    {
        id: 2,
        title: "Name",
        icon: ""
    },
    {
        id: 3,
        title: "Name",
        icon: ""
    },
    {
        id: 4,
        title: "Name",
        icon: ""
    },
    {
        id: 5,
        title: "Name",
        icon: ""
    },
    {
        id: 6,
        title: "Name",
        icon: ""
    },
    {
        id: 7,
        title: "Name",
        icon: ""
    },
    {
        id: 8,
        title: "Name",
        icon: ""
    },
    {
        id: 9,
        title: "Name",
        icon: ""
    },
    {
        id: 10,
        title: "Name",
        icon: ""
    },
    {
        id: 11,
        title: "Name",
        icon: ""
    },
]
</script>

<style lang="scss" scoped>
.casino-all-games-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 12px;
    width: 100%;
    max-width: 800px;

    .casino-all-games-title {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 24px;
        line-height: 130%;
        letter-spacing: 0;
    }

    .casino-all-games-items-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 10px;
        row-gap: 12px;
        width: 100%;
    }

    .casino-all-games-item-container {
        flex-shrink: 0;
        // height: 242px;
    }
}

// iPhone 16 Pro (393px width) - с background-image
@media (max-width: 393px) {
    .casino-all-games-container {
        padding: 0;
        width: 100%;
        max-width: 100%;
        gap: 0px;

        .casino-all-games-title-wrapper {
            display: flex;
            align-items: center;
            width: 100vw;
            height: 138px;
            background-image: url('/images/casino/Gold.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
        }

        .casino-all-games-title {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            width: 100%;
        }

        .casino-all-games-items-wrapper {
            padding: 0 12px;
            width: 100%;
            column-gap: 10px;
            row-gap: 16px;
            margin-top: -34px;
            position: relative;
            z-index: 1;
        }
    }
}

// iPhone 16 Pro Max и другие размеры (394px - 430px) - без background-image
@media (min-width: 394px) and (max-width: 430px) {
    .casino-all-games-container {
        padding: 0;
        width: 100%;
        max-width: 100%;

        .casino-all-games-title-wrapper {
            width: 100vw;
        }

        .casino-all-games-title {
            display: flex;
            align-items: center;
            height: 47px;
            width: 100%;
            padding: 8px 16px;
            // Без background-image
        }

        .casino-all-games-items-wrapper {
            padding: 0 12px;
            width: 100%;
            column-gap: 10px;
            row-gap: 16px;
        }
    }
}
</style>