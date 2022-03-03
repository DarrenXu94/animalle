<template>
    <div class="flex" v-if="!isGameOver">
        <div v-for="(char, index) in answer">
            <Tile :tileType="TILE_STATE.none" :tileLetter="guess[index]" />
        </div>
    </div>
    <div class="invalid" v-if="invalidGuess">Invalid guess</div>
</template>

<script>
import Tile from "./Tile.vue";
import { GAME_STATE, TILE_STATE } from "../consts/consts"
export default {
    name: "InputGuess",
    created() {
        window.addEventListener('keydown', this.inputHandler);
    },
    methods: {
        inputHandler(event) {
            if (event.key == "Backspace") {
                let guess = this.guess;
                this.guess = guess.slice(0, -1)
            }

            if (event.key == "Enter") {
                // Handle submit
                if (this.guess.length == this.answer.length) {
                    // Handle submitted
                    this.$store.dispatch("makeGuess", this.guess)
                    this.guess = ""
                    return

                } else {
                    return
                }
            }

            if (this.guess.length >= this.answer.length) {
                console.log("too long")
                return;
            }

            if (event.keyCode >= 65 && event.keyCode <= 90) { // if a letter pressed
                let guess = this.guess;
                guess += event.key
                this.guess = guess

                // Remove invalid state
                this.$store.dispatch("newGuess")

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
    data() {
        return {
            guess: "",
            TILE_STATE
        }
    },
    computed: {
        isGameOver() {
            return this.gameState == GAME_STATE.complete
        },
        gameState() {
            return this.$store.getters.gameState;
        },
        answer() {
            return this.$store.getters.getCorrectWord;
        },
        invalidGuess() {
            return this.$store.getters.invalidGuess;

        }
    },
    components: { Tile }
}
</script>

<style scoped>
.flex {
    display: flex;
}
.invalid {
    text-align: center;
    font-size: 1.6rem;
}
</style>