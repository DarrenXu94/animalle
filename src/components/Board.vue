<template>
    <!-- Display previous guesses -->
    <div>
        <div class="flex victoryMessage" v-if="isVictory">
            You guessed it in {{ getGuesses.length }} guess(es)!
            <NewGame />
        </div>
        <InvalidGuess />

        <div v-if="!isVictory" class="flex victoryMessage">Remaining Guesses {{ remainingGuesses }}</div>
        <div class="flex just-cent" v-for="(_, row) of new Array(allowedGuesses)">
            <div class="tileRow">
                <div v-for="(_, idx) in new Array(correctWord.length)">
                    <Tile :tileLetter="getTileLetter(row, idx)" :tileType="getTileType(row, idx)" />
                </div>
            </div>
        </div>
    </div>

    <!-- Keyboard -->
    <div v-if="remainingGuesses > 0 && !isVictory">
        <Keyboard />
    </div>

    <!-- Extra guesses -->
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
import { TILE_STATE, GAME_STATE } from "../consts/consts"

import Tile from "./Tile.vue"
import NewGame from "./NewGame.vue";
import Keyboard from "./Keyboard.vue";
import InvalidGuess from "./InvalidGuess.vue";
export default {
    name: "Board",
    data() {
        return {
            TILE_STATE
        }
    },
    created() {
        window.addEventListener('keydown', this.inputHandler);
    },
    methods: {
        getTileType(row, idx) {
            if (this.board[row]) {
                return this.board[row][idx].tileType
            }
        },
        getTileLetter(row, idx) {
            if (this.board[row]) {
                return this.board[row][idx].tileLetter
            }
            if (this.currentGuess && row == this.board.length) {
                return this.currentGuess[idx]
            }

        },
        inputHandler(event) {
            if (event.key == "Backspace" || event.key == "Enter") {
                this.$store.dispatch("currentGuessCharInput", event.key)
            }

            if (event.keyCode >= 65 && event.keyCode <= 90) { // if a letter pressed
                this.$store.dispatch("currentGuessCharInput", event.key)
            }
        }
    },
    watch: {
        gameState(old, newv) {
            if (old == GAME_STATE.complete) {
                window.removeEventListener('keydown', this.inputHandler)
            } else {
                window.addEventListener('keydown', this.inputHandler);

            }
        }
    },
    computed: {
        currentGuess() {
            return this.$store.getters.getCurrentGuess;
        },
        allowedGuesses() {
            return this.$store.getters.getAllowedGuessed;
        },
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
        }

    },
    components: { Tile, NewGame, Keyboard, InvalidGuess }
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
    flex-direction: column;
    align-items: center;
}
.answerBold {
    font-weight: bold;
}
.just-cent {
    justify-content: center;
}

.tileRow {
    display: grid;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    width: 100%;
    column-gap: 5px;
}
</style>