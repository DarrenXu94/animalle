<template>
    <div :class="'tile ' + tileType">
        <div class="letter" v-if="tileLetter">{{ tileLetter }}</div>
    </div>
</template>

<script>
import { TILE_STATE } from "../consts/consts"

export default {
    name: "Tile",
    data() {
        return {
            TILE_STATE
        }
    },
    props: {
        tileType: {
            type: String
        },
        tileLetter: {
            type: String
        }
    }

}
</script>

<style scoped>
.tile {
    background-color: #86888a;
    min-width: 5px;
    height: 50px;

    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    max-width: 50px;
    /* width: 50px;
    height: 50px;
    padding: 50px; */
    transition: background-color 0.5s ease;
}
.letter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-transform: uppercase;
    color: white;
    font-weight: bold;
    /* font-size: 3.2rem; */
}

.fit {
    background-color: #6aaa64;
}

.match {
    background-color: #c9b458;
}
</style>