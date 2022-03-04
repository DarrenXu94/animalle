import { createStore } from "vuex";
import { GAME_STATE, LIST_OF_ANIMALS, TILE_STATE } from "../consts/consts";
const matchLetters = (guess, answer) => {
  const rowState = [];
  const answerDict = {};
  // Loop through and count number of chars in answer
  for (let char of answer) {
    if (answerDict[char]) {
      answerDict[char] += 1;
    } else {
      answerDict[char] = 1;
    }
  }

  let hasLost = false;

  // Loop through and match
  for (let [idx, char] of Object.entries(guess)) {
    if (answer[idx] == char) {
      answerDict[char] -= 1;
      // Same letter same position
      rowState[idx] = { tileType: TILE_STATE.fit, tileLetter: char };
      continue;
    }
    if (answer.includes(char) && answerDict[char] >= 1) {
      answerDict[char] -= 1;

      // Same letter diff position
      rowState[idx] = { tileType: TILE_STATE.match, tileLetter: char };
      hasLost = true;
      continue;
    }
    hasLost = true;
    rowState[idx] = { tileType: TILE_STATE.none, tileLetter: char };
  }
  return { rowState, hasLost };
};

const checkIfValidGuess = (guess, options = LIST_OF_ANIMALS) => {
  return options.includes(guess);
};

const store = createStore({
  state() {
    return {
      guesses: [],
      boardRows: [],
      guessInvalid: false,
      // lettersUsed: [],
      correctWord: null,
      gameState: GAME_STATE.waiting,
      hasWon: false,
    };
  },
  getters: {
    getHasWon(state) {
      return state.hasWon;
    },
    invalidGuess(state) {
      return state.guessInvalid;
    },
    getGuesses(state) {
      return state.guesses;
    },
    // lettersUsed(state) {
    //   return state.lettersUsed;
    // },
    gameState(state) {
      return state.gameState;
    },
    getCorrectWord(state) {
      return state.correctWord;
    },
    getBoardState(state) {
      return state.boardRows;
    },
  },
  mutations: {
    UPDATE_GUESS(state, payload) {
      state.guesses = payload;
    },
    UPDATE_GUESSINVALID(state, payload) {
      state.guessInvalid = payload;
    },
    UPDATE_BOARDROWS(state, payload) {
      state.boardRows = payload;
    },
    UPDATE_GAME_STATE(state, payload) {
      state.gameState = payload;
    },
    UPDATE_WORD(state, payload) {
      state.correctWord = payload;
    },
    UPDATE_HAS_WON(state, payload) {
      state.hasWon = payload;
    },
    RESET_ALL(state) {
      state.guesses = [];
      state.boardRows = [];
      state.correctWord = null;
      state.hasWon = false;
      state.gameState = GAME_STATE.playing;
    },
  },
  actions: {
    newGuess(context) {
      context.commit("UPDATE_GUESSINVALID", false);
    },
    makeGuess(context, payload) {
      // Check if guess is legit here
      if (!checkIfValidGuess(payload)) {
        context.commit("UPDATE_GUESSINVALID", true);
        return;
      }
      // Guessing logic here
      const guesses = context.state.guesses;
      guesses.push(payload);
      context.commit("UPDATE_GUESS", guesses);

      const rows = [];
      // Why is a proxy returned?
      for (let guess of JSON.parse(JSON.stringify(guesses))) {
        const { rowState, hasLost } = matchLetters(
          guess,
          context.state.correctWord
        );

        if (!hasLost) {
          context.commit("UPDATE_GAME_STATE", GAME_STATE.complete);
          context.commit("UPDATE_HAS_WON", true);
        }
        rows.push(rowState);
      }
      console.log(rows);
      context.commit("UPDATE_BOARDROWS", rows);
      return rows;
    },
    startGame(context) {
      // Start a new game
      // context.commit("UPDATE_GAME_STATE", GAME_STATE.playing);
      context.commit("RESET_ALL");
      const animal =
        LIST_OF_ANIMALS[Math.floor(Math.random() * LIST_OF_ANIMALS.length)];
      context.commit("UPDATE_WORD", animal);
    },
  },
});

export default store;
