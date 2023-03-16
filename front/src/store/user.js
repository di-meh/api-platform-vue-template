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
        if (response.ok && user) {
          this.setUser(user);
          await router.replace("/");
        }
      }
      return response;
    },
    async logout() {
      if (!cookies.get("token")) {
        throw new Error("Already logged out");
      }
      this.setUser(null);
      cookies.remove("token");
      cookies.remove("refreshToken");
    },
    async refreshToken() {
      const response = await fetch(`${ENTRYPOINT}/token/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          refresh_token: cookies.get("refreshToken"),
        }),
      });
      const refreshToken = await response.json();
      if (response.ok && refreshToken.token && refreshToken["refresh_token"]) {
        cookies.set("token", refreshToken.token);
        cookies.set("refreshToken", refreshToken["refresh_token"]);
        const decoded = jwtDecode(refreshToken.token);

        const response = await fetch(`${ENTRYPOINT}/users/${decoded.id}`, {
          headers: {
            Authorization: `Bearer ${refreshToken.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).catch((err) => {
          console.error(err);
        });
        const user = await response.json();
        if (response.ok && user) {
          this.setUser(user);
        }
      }
      return response;
    },
    async updateUser(values) {
      const response = await fetch(`${ENTRYPOINT}/users/${this.user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const user = await response.json();
      if (response.ok && user) {
        this.setUser(user);
      }
      return response;
    },
  },
});
