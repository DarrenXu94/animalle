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

const ALLOWED_GUESSES = 5;

const store = createStore({
  state() {
    return {
      currentGuess: "",
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
    getCurrentGuess(state) {
      return state.currentGuess;
    },
    getRemainingGuesses(state) {
      return ALLOWED_GUESSES - state.guesses.length;
    },
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
    UPDATE_CURRENT_GUESS(state, payload) {
      state.currentGuess = payload;
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
    currentGuessCharInput(context, payload) {
      // Logic about current guess input here
      console.log(payload);

      let guess = context.state.currentGuess;

      // Handle backspace
      if (payload == "Backspace") {
        const backSpacedGuess = guess.slice(0, -1);
        context.commit("UPDATE_CURRENT_GUESS", backSpacedGuess);
        return;
      }

      // Handle enter
      if (payload == "Enter") {
        if (
          context.state.currentGuess.length == context.state.correctWord.length
        ) {
          this.dispatch("makeGuess", context.state.currentGuess);
          return;
        } else {
          return;
        }
      }

      // Handle exceeding length
      if (
        context.state.currentGuess.length >= context.state.correctWord.length
      ) {
        console.log("Too many chars");
        return;
      }

      // Else handle character input
      const newGuess = (guess += payload);
      this.dispatch("newGuess");
      context.commit("UPDATE_CURRENT_GUESS", newGuess);
    },
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
      context.commit("UPDATE_CURRENT_GUESS", "");

      // Check if any guesses remaining
      if (context.state.guesses.length == ALLOWED_GUESSES) {
        console.log("Game over?");
        context.commit("UPDATE_GAME_STATE", GAME_STATE.complete);
      }

      return rows;
    },
    startGame(context) {
      // Start a new game
      context.commit("RESET_ALL");
      const animal =
        LIST_OF_ANIMALS[Math.floor(Math.random() * LIST_OF_ANIMALS.length)];
      context.commit("UPDATE_WORD", animal);
    },
  },
});

export default store;
