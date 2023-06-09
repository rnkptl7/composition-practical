import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import VeeValidatePlugin from "./includes/validation";
import router from "./router";

import "./assets/main.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(VeeValidatePlugin);
app.mount("#app");
