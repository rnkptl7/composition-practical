import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    isLoggedIn: sessionStorage.getItem("isLoggedIn"),
    isAdmin: sessionStorage.getItem("isAdmin"),
    userApi: import.meta.env.VITE_PROD_USER_API,
  }),
  actions: {
    loginUser(formData) {
      return axios.post(`${this.userApi}//login`, formData);
    },
    addUser(formData) {
      return axios.post(`${this.userApi}/resource/users`, formData);
    },
    getUsers() {
      return axios.get(`${this.userApi}/resource/users`);
    },
    isAuthenticated() {
      const loggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
      const token = sessionStorage.getItem("token");
      this.isLoggedIn = loggedIn;
      return (
        loggedIn !== null &&
        loggedIn !== undefined &&
        loggedIn !== "" &&
        loggedIn &&
        token !== null &&
        token !== ""
      );
    },
    logout() {
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("isAdmin");
      sessionStorage.removeItem("token");
      this.isLoggedIn = false;
      this.isAdmin = false;
    },
  },
});
