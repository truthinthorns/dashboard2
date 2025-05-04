import { defineStore } from "pinia";
import User from "../models/user";

export const useUserStore = defineStore("user", {
  state: () => ({}),
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
        const errorData = await response.json();
        throw new Error(errorData.detail || "Sign up failed");
      }
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
        throw new Error(errorData.detail || "Login failed");
      }
      console.log(await response.json())
      return true;
    },
    async logout() {
        const response = await fetch(`${import.meta.env.VITE_ROOT_API}/logout`, {
            method: 'POST',
            credentials: 'include'
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Logout failed");
          }
          console.log(await response.json())
          return true;
    }
  },
});
