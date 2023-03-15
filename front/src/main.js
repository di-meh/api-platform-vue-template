import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/style.css";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();
const app = createApp(App);
const toastOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};

app.use(router);
app.use(pinia);
app.use(plugin, defaultConfig);
app.use(Toast, toastOptions);

app.mount("#app");
