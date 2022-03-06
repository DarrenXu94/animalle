<template>
    <div class="flex just-cent" v-if="!isGameOver">
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
    data() {
        return {
            TILE_STATE
        }
    },
    computed: {
        guess() {
            return this.$store.getters.getCurrentGuess;
        },
        isGameOver() {
            return this.gameState == GAME_STATE.complete
        },
        gameState() {
            return this.$store.getters.gameState;
        },
        answer() {
            return this.$store.getters.getCorrectWord;
        },

    },
    components: { Tile }
}
</script>

<style scoped>
.flex {
    display: flex;
}

.just-cent {
    justify-content: center;
}
</style>