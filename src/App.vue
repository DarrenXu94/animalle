
<template>
  <div class="body">
    <h1>Animalle</h1>
    <div v-if="gameState == GAME_STATE.waiting">
      <NewGame />
    </div>
    <div v-else>
      <Board />
    </div>
    <!-- <div v-else>Game over</div> -->
  </div>
</template>
<script >
import { GAME_STATE } from "./consts/consts"
import NewGame from "./components/NewGame.vue"
import Board from "./components/Board.vue"

export default {
  data() {
    return {
      GAME_STATE
    }
  },
  components: { NewGame, Board },
  computed: {
    gameState() {
      return this.$store.getters.gameState
    }
  }
}
</script>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
}
</style>
