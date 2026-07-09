<template>
    <div class="game-history-page">

        <div class="game-history-header">
            <PageHeaderLeft title="Game History" :back-route="'/casino'" />

            <div class="game-history-header-center">
                <SearchInput />
            </div>

            <div></div>
        </div>
        <div class="game-history-container">
            <div class="game-history-container-navbar">
                <GameHistoryNavbar />
                <GameHistoryNavbarGames />
            </div>
            <GameHistory />
        </div>
    </div>
</template>

<script setup lang="ts">
import GameHistoryNavbar from '~/widgets/game-history/GameHistoryNavbar/index.vue';
import GameHistory from '~/widgets/game-history/GameHistory/index.vue';
import GameHistoryNavbarGames from '~/widgets/game-history/GameHistoryNavbarGames/index.vue';
import SearchInput from '~/components/ui/SearchInput.vue';
import PageHeaderLeft from '~/components/ui/PageHeaderLeft.vue';

definePageMeta({
    layout: "sidebar",
});
</script>

<style lang="scss" scoped>
.game-history-page {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.game-history-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding: 0 8px;

    .game-history-header-center {
        display: flex;
        justify-content: center;
    }
}

.game-history-container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 24px;
    width: 800px;

    .game-history-container-navbar {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}
</style>