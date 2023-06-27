import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import VeeValidatePlugin from "./includes/validation";
import router from "./router";
import i18n from "./includes/i18n";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "./assets/main.scss";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(vuetify);
app.use(pinia);
app.use(i18n);
app.use(VeeValidatePlugin);
app.mount("#app");
