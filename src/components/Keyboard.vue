<template>
    <div id="keyboard-cont">
        <div class="first-row">
            <button @click="onKeyPress('q')" class="keyboard-button">q</button>
            <button @click="onKeyPress('w')" class="keyboard-button">w</button>
            <button @click="onKeyPress('e')" class="keyboard-button">e</button>
            <button @click="onKeyPress('r')" class="keyboard-button">r</button>
            <button @click="onKeyPress('t')" class="keyboard-button">t</button>
            <button @click="onKeyPress('y')" class="keyboard-button">y</button>
            <button @click="onKeyPress('u')" class="keyboard-button">u</button>
            <button @click="onKeyPress('i')" class="keyboard-button">i</button>
            <button @click="onKeyPress('o')" class="keyboard-button">o</button>
            <button @click="onKeyPress('p')" class="keyboard-button">p</button>
        </div>
        <div class="second-row">
            <button @click="onKeyPress('a')" class="keyboard-button">a</button>
            <button @click="onKeyPress('s')" class="keyboard-button">s</button>
            <button @click="onKeyPress('d')" class="keyboard-button">d</button>
            <button @click="onKeyPress('f')" class="keyboard-button">f</button>
            <button @click="onKeyPress('g')" class="keyboard-button">g</button>
            <button @click="onKeyPress('h')" class="keyboard-button">h</button>
            <button @click="onKeyPress('j')" class="keyboard-button">j</button>
            <button @click="onKeyPress('k')" class="keyboard-button">k</button>
            <button @click="onKeyPress('l')" class="keyboard-button">l</button>
        </div>
        <div class="third-row">
            <button @click="onKeyPress('Backspace')" class="keyboard-button">Del</button>
            <button @click="onKeyPress('z')" class="keyboard-button">z</button>
            <button @click="onKeyPress('x')" class="keyboard-button">x</button>
            <button @click="onKeyPress('c')" class="keyboard-button">c</button>
            <button @click="onKeyPress('v')" class="keyboard-button">v</button>
            <button @click="onKeyPress('b')" class="keyboard-button">b</button>
            <button @click="onKeyPress('n')" class="keyboard-button">n</button>
            <button @click="onKeyPress('m')" class="keyboard-button">m</button>
            <button @click="onKeyPress('Enter')" class="keyboard-button">Enter</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "Keyboard",
    methods: {
        onKeyPress(key) {
            this.$store.dispatch("currentGuessCharInput", key)
        }
    }

}
</script>

<style scoped>
#keyboard-cont {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#keyboard-cont div {
    display: flex;
}

.second-row {
    margin: 0.5rem 0;
}

.keyboard-button {
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem;
    margin: 0 2px;
    cursor: pointer;
    text-transform: uppercase;
}
</style>