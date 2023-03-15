import { defineStore } from "pinia";
import { ENTRYPOINT } from "../../config/entrypoint";
import { useCookies } from "@vueuse/integrations/useCookies";
import jwtDecode from "jwt-decode";
import router from "@/router";

const cookies = useCookies();

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "{}"),
  }),
  actions: {
    setUser(user) {
      this.user = user;
      if (user === null) {
        localStorage.removeItem("user");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
    },
    async signUp(values) {
      return await fetch(`${ENTRYPOINT}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });
    },
    async login(values) {
      const response = await fetch(`${ENTRYPOINT}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });
      const userToken = await response.json();
      if (userToken.token) {
        cookies.set("token", userToken.token);
        cookies.set("refreshToken", userToken["refresh_token"]);
        const decoded = jwtDecode(userToken.token);

        const response = await fetch(`${ENTRYPOINT}/users/${decoded.id}`, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const user = await response.json();
        if (user) {
          this.setUser(user);
          await router.replace("/");
        }
      }
      return response;
    },
    async logout() {
      this.setUser(null);
      cookies.remove("token");
      await router.replace("/login");
      // TODO : refresh page
    },
  },
});
