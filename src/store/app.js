import { defineStore } from "pinia";
import Pocketbase from "pocketbase";

const PBURL = import.meta.env.VITE_PB_HOST;
export const appStore = defineStore("appStore", {
  state: () => ({
    pb: new Pocketbase(PBURL),
    avatarUrl: `${PBURL}/api/files/_pb_users_auth_/`,
    assetUrl: `${PBURL}/api/files/`,
    currentUser: null,
  }),
  actions: {
    // Auth
    login(provider = "discord") {
      return new Promise((res, rej) => {
        this.pb
          .collection("users")
          .authWithOAuth2({ provider: provider })
          .then(() => {
            this.currentUser = this.pb.authStore.model;
            console.log(this.currentUser)
            res(true);
          })
          .catch((err) => {
            console.error(err);
            rej(err);
          });
      });
    },
    logout() {
      this.pb.authStore.clear();
      this.currentUser = null;
      window.location.reload();
    },
    reAuth() {
      this.currentUser = this.pb.authStore.model;
    },
    // Sanitation
    cleanDate(date) {
      let d = new Date(date);
      let month = d.toLocaleString("default", { month: "short" });
      let day = d.getDate();
      let year = d.getFullYear();
      return `${month} ${day}, ${year}`;
    },
    // Utility
    getAvatar() {
      try {
        if(this.currentUser.avatar.length > 0) {
          return `${this.avatarUrl}${this.currentUser.id}/${this.currentUser.avatar}`;
        } else {
          return "https://placehold.co/400";
        }
      } catch (err) {
        return "https://placehold.co/400";
      }
    },
    getUserAvatar(User) {
      try {
        if(User.avatar.length > 0) {
          return `${this.avatarUrl}${User.id}/${User.avatar}`;
        } else {
          return "https://placehold.co/400";
        }
      } catch (err) {
        return "https://placehold.co/400";
      }
    },
  },
});
