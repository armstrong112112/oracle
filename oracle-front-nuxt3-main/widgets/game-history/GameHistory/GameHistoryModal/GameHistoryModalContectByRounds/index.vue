<template>
    <div class="game-history-modal-content-by-rounds-container">
        <div class="game-history-modal-content-by-rounds-list-places-container">
            <div class="game-history-modal-content-by-rounds-list-places-container-places-persons">
                <div
                    class="game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-second">
                    <GameHistoryModalContentByRoundsPlacesPerson :place="2" :avatar="'/svg/person.jpg'" :name="'You'"
                        :money="232" />
                </div>

                <div class="game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-first">
                    <GameHistoryModalContentByRoundsPlacesPerson :place="1" :avatar="'/svg/person.jpg'"
                        :name="'Player name'" :money="432" />
                </div>

                <div class="game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-third">
                    <GameHistoryModalContentByRoundsPlacesPerson :place="3" :avatar="'/svg/person.jpg'"
                        :name="'Player name'" :money="132" />
                </div>
            </div>

            <div class="game-history-modal-content-by-rounds-list-places-container-places">
                <img src="/svg/Places.svg" alt="place" />
            </div>
        </div>

        <GameHistoryModalContentByRoundsList />
    </div>
</template>

<script setup lang="ts">
import GameHistoryModalContentByRoundsPlacesPerson from '../GameHistoryModalContentByRoundsPlacesPerson/index.vue';
import GameHistoryModalContentByRoundsList from '../GameHistoryModalContentByRoundsList/index.vue';
</script>

<style lang="scss" scoped>
.game-history-modal-content-by-rounds-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;



    .game-history-modal-content-by-rounds-list-places-container-places {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .game-history-modal-content-by-rounds-list-places-container {
        height: calc(100% - 244px);
        position: relative;
        padding-top: 110px;
        box-sizing: border-box;

        .game-history-modal-content-by-rounds-list-places-container-places-persons {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;

            .game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-second {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: flex-end;
                gap: 8px;
                height: 138px;
                width: 97px;
                position: relative;
                margin-bottom: 10px;
            }

            .game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-first {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: flex-start;
                gap: 8px;
                // height: 106px;
                height: 138px;
                width: 97px;
                position: relative;
            }

            .game-history-modal-content-by-rounds-list-places-container-places-persons-item-place-third {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: flex-end;
                gap: 8px;
                height: 160px;
                width: 97px;
                position: relative;
            }
        }

        .game-history-modal-content-by-rounds-list-places-container-places {
            position: relative;
            z-index: 0;
        }
    }

}
</style>