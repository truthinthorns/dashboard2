import { defineStore } from "pinia";
import User from "../models/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    signedIn: false,
    currentUser: null as User | null
  }),
  actions: {
    async signup(user: User) {
      const response = await fetch(`${import.meta.env.VITE_ROOT_API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        return false;
      }
      const responseUser = await response.json();
      if (await this.login(responseUser.username, responseUser.password) === true)
        return true;
    },
    async login(username: string, password: string) {
      const response = await fetch(`${import.meta.env.VITE_ROOT_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: 'include',
        body: new URLSearchParams({
          username,
          password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail === "Incorrect username or password")
          return "Incorrect username or password";
        else
          return false;
      }
      const responseJson = await response.json();
      this.signedIn = true;
      this.currentUser = responseJson["user"];
      return true;
    },
    async logout() {
      const response = await fetch(`${import.meta.env.VITE_ROOT_API}/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        return false;
      }
      this.signedIn = false;
      this.currentUser = null;
      return true;
    }
  },
});
