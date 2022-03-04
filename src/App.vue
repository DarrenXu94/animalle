
<template>
  <div class="body">
    <h1>Animal-le</h1>
    <div v-if="gameState == GAME_STATE.waiting">
      <NewGame />
    </div>
    <div v-else>
      <Board />
    </div>
    <!-- <div v-else>Game over</div> -->
  </div>
  <div v-if="isVictory">
    <Picture />
  </div>
</template>
<script >
import { GAME_STATE } from "./consts/consts"
import NewGame from "./components/NewGame.vue"
import Board from "./components/Board.vue"
import Picture from "./components/Picture.vue"

export default {
  data() {
    return {
      GAME_STATE
    }
  },
  components: { NewGame, Board, Picture },
  computed: {
    gameState() {
      return this.$store.getters.gameState
    },
    isVictory() {
      return this.$store.getters.getHasWon
    },
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

a {
  text-decoration: none;
  color: #878a8c;
}

.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1024px) {
}
</style>
