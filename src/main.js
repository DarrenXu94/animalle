import { createApp } from "vue";
import App from "./App.vue";
import store from "./stores/GameStore";

createApp(App).use(store).mount("#app");
