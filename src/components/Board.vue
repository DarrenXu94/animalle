<template>
    <!-- Display previous guesses -->
    <div>
        <div class="flex" v-for="row in board">
            <div v-for="item in row">
                <Tile :tileType="item.tileType" :tileLetter="item.tileLetter" />
            </div>
        </div>
    </div>
    <!-- Display new guess -->
    <div>
        <InputGuess />
    </div>
</template>

<script>
import Tile from "./Tile.vue"
import InputGuess from "./InputGuess.vue"
export default {
    name: "Board",
    computed: {
        board() {
            return this.$store.getters.getBoardState;
        }
    },
    components: { Tile, InputGuess }
}
</script>

<style scoped>
.flex {
    display: flex;
}
</style>