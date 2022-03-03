<template>
    <div class="flex" v-if="!isGameOver">
        <div v-for="(char, index) in answer">
            <Tile :tileType="TILE_STATE.none" :tileLetter="guess[index]" />
        </div>
    </div>
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
        }
    },
    components: { Tile }
}
</script>

<style scoped>
.flex {
    display: flex;
}
</style>