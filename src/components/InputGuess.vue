<template>
    <div class="flex">
        <div v-for="(char, index) in answer">
            <!-- <div v-if="guess[index]">{{ guess[index] }}</div> -->
            <Tile :tileType="TILE_STATE.none" :tileLetter="guess[index]" />
        </div>
    </div>
</template>

<script>
import Tile from "./Tile.vue";
import { TILE_STATE } from "../consts/consts"
export default {
    name: "InputGuess",
    created() {
        window.addEventListener('keydown', (event) => {

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
        });
    },
    data() {
        return {
            guess: "",
            TILE_STATE
        }
    },
    computed: {
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