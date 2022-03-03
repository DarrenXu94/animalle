<template>
    <div>
        <button class="newButton" @click="initNewGame()">New Game</button>
    </div>
</template>

<script>
export default {
    name: "NewGame",

    methods: {
        initNewGame() {
            this.$store.dispatch("startGame")
        }
    }
}
</script>

<style  scoped>
.newButton {
    background-color: rgb(30 64 175);
    text-align: center;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    color: rgb(255 255 255);
    font-size: 1.125rem;
    line-height: 1.75rem;
    border: none;
    border-radius: 0.5rem;
    min-height: 40px;
    cursor: pointer;
}

@media (hover: hover) {
    .newButton:hover {
        background-color: rgb(39 84 230);
    }
}
</style>