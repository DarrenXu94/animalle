<template>
    <div class="invalid" v-if="invalidGuess">Invalid guess</div>
</template>

<script>

export default {
    name: "InvalidGuess",
    computed: {
        invalidGuess() {
            return this.$store.getters.invalidGuess;

        }
    }
}
</script>

<style scoped>
.invalid {
    text-align: center;
    font-size: 1.6rem;
}
</style>