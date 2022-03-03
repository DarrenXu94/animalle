<template>
    <div>
        <button @click="initNewGame()">New Game</button>
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

<style lang="scss" scoped>
</style>