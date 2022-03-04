<template>
    <!-- Display previous guesses -->
    <div>
        <div class="flex victoryMessage" v-if="isVictory">
            You guessed it in {{ getGuesses.length }} guess(es)!
            <NewGame />
        </div>
        <div v-else class="flex victoryMessage">Remaining Guesses {{ remainingGuesses }}</div>
        <div class="boardRow">
            <div class="flex" v-for="row in board">
                <div v-for="item in row">
                    <Tile :tileType="item.tileType" :tileLetter="item.tileLetter" />
                </div>
            </div>
        </div>
    </div>
    <!-- Display new guess -->
    <div>
        <InputGuess />
    </div>
    <div class="flex victoryMessage" v-if="remainingGuesses == 0">
        Game Over.
        <p>
            The answer was:
            <span class="answerBold">{{ correctWord.toUpperCase() }}</span>
        </p>
        <NewGame />
    </div>
</template>

<script>
import Tile from "./Tile.vue"
import InputGuess from "./InputGuess.vue"
import NewGame from "./NewGame.vue";
export default {
    name: "Board",
    computed: {
        board() {
            return this.$store.getters.getBoardState;
        },
        isGameOver() {
            return this.gameState == GAME_STATE.complete
        },
        isVictory() {
            return this.$store.getters.getHasWon
        },
        getGuesses() {
            return this.$store.getters.getGuesses
        },
        correctWord() {
            return this.$store.getters.getCorrectWord;


        },
        gameState() {
            return this.$store.getters.gameState;
        },
        remainingGuesses() {
            return this.$store.getters.getRemainingGuesses;
        },
    },
    components: { Tile, InputGuess, NewGame }
}
</script>

<style scoped>
.flex {
    display: flex;
}
.victoryMessage {
    justify-content: center;
    font-size: 1.6rem;
    flex-direction: column;
    align-items: center;
}
.boardRow {
    margin-top: 3vh;
}
.answerBold {
    font-weight: bold;
}
</style>