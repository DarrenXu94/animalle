<template>
    <!-- Display previous guesses -->
    <div>
        <div class="flex victoryMessage" v-if="isVictory">
            You guessed it in {{ getGuesses.length }} guess(es)!
            <NewGame />
        </div>
        <InvalidGuess />

        <div v-if="!isVictory" class="flex victoryMessage">Remaining Guesses {{ remainingGuesses }}</div>
        <div v-for="(_, idx) of new Array(allowedGuesses)">
            <!-- If guesses has index then show that, otherwise show blanks -->
            <!-- Existing guesses -->
            <div class="flex" v-if="board[idx]">
                <div v-for="item in board[idx]">
                    <Tile :tileType="item.tileType" :tileLetter="item.tileLetter" />
                </div>
            </div>
            <!-- Input row -->
            <div class="flex" v-else-if="board.length == idx">
                <div v-for="(_, idx) in new Array(correctWord.length)">
                    <Tile :tileLetter="currentGuess[idx]" />
                </div>
            </div>
            <!-- Future guesses -->
            <div class="flex" v-else>
                <div v-for="char in new Array(correctWord.length)">
                    <Tile :tileType="TILE_STATE.none" />
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
</style>