<template>
  <div class="navbar" id="nav">
    <router-link :to="{ name: 'Home' }">
      <div class="navbar-logo">
        <img class="logo" src="/images/logo.png" alt="apnicar logo" />
        <p>apniCar</p>
      </div>
    </router-link>
    <div class="navbar-right" v-show="!mobileView">
      <div v-if="isLoggedIn" class="mobileRightMenu">
        <div class="languageSelect">
          <img src="/images/translation-icon.png" alt="" />
          <select v-model="$i18n.locale">
            <option value="en" selected>English</option>
            <option value="ge">German</option>
          </select>
        </div>
        <router-link :to="{ name: 'Home' }" id="link">
          {{ $t("navbar.home") }}</router-link
        >
        <router-link v-if="isAdmin" :to="{ name: 'Users' }">{{
          $t("users.users")
        }}</router-link>
        <button class="btn" @click="logoutBtn">
          {{ $t("navbar.logout") }}
        </button>
      </div>
      <div v-else class="mobileRightMenu">
        <div class="languageSelect">
          <img src="/images/translation-icon.png" alt="" />
          <select v-model="$i18n.locale">
            <option value="en" selected>English</option>
            <option value="ge">German</option>
          </select>
        </div>
        <router-link :to="{ name: 'Login' }" id="loginBtn">{{
          $t("navbar.login")
        }}</router-link>
        <router-link :to="{ name: 'Register' }">{{
          $t("navbar.register")
        }}</router-link>
      </div>
    </div>
    <div v-show="mobileView" class="mobileRightMenu">
      <div class="languageSelect">
        <img src="/images/translation-icon.png" alt="" />

        <select v-model="$i18n.locale">
          <option value="en" selected>English</option>
          <option value="ge">German</option>
        </select>
      </div>
      <img
        v-show="!showNav"
        class="hamburgerMenu"
        src="/images/hamburger-menu.png"
        alt="hamburger-menu"
        @click="showNav = !showNav"
      />
      <img
        v-show="showNav"
        class="hamburgerMenu"
        src="/images/close.png"
        alt="close-menu"
        @click="showNav = !showNav"
      />
    </div>
  </div>
  <div v-show="mobileView" class="navigation-menu" :class="{ open: showNav }">
    <NavigationMobile />
  </div>
</template>

<script setup>
import NavigationMobile from "@/components/NavigationMobile.vue";
import { useCarStore } from "../stores/CarStore";
import { useUserStore } from "../stores/userStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const carStore = useCarStore();
const router = useRouter();

const { mobileView, showNav } = storeToRefs(carStore);
const { isLoggedIn, isAdmin } = storeToRefs(userStore);

function logoutBtn() {
  userStore.logout();
  router.push({ name: "Login" });
}

carStore.handleView();
window.addEventListener("resize", carStore.handleView);
window.addEventListener("scroll", carStore.closeMobileMenu);
</script>

<style scoped lang="scss">
.navbar a {
  color: #fff;
  text-decoration: none;
}
.navigation-menu {
  position: absolute;
  transform: translatex(-30rem);
  z-index: 1;
  background: #334756;
  width: 50%;
  height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.open {
  transition: 800ms transform;
  transform: translateX(0);
}
.hamburgerMenu {
  width: 2rem;
  cursor: pointer;
}
.navbar {
  background: #334756;
  height: 80px;
  color: #fff;
  display: grid;
  place-items: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 270px;

  .navbar-logo {
    display: flex;
    align-items: center;
    .logo {
      width: 50px;
      border-radius: 30%;
    }

    p {
      font-size: 40px;
      font-weight: 900;
      font-style: italic;
      margin-left: 10px;
    }
  }

  .navbar-right {
    a {
      padding: 0.8rem;
      display: inline-block;
      text-decoration: none;
      color: #fff;
      font-size: 18px;
    }

    .router-link-exact-active {
      font-weight: 600;
    }
  }

  .mobileRightMenu {
    display: flex;
    align-items: center;

    .languageSelect {
      margin-right: 10px;
      display: flex;

      img {
        width: 25px;
      }

      select {
        cursor: pointer;
        outline: none;
        border-radius: 10px;
        background-color: #334756;
        border: none;
        color: #fff;
        font-size: 17px;

        option {
          font-size: 15px;
        }
      }
    }
  }
}
@media (max-width: 1098px) {
  .navbar {
    padding: 0 100px;
  }
}

@media (max-width: 559px) {
  .navbar {
    padding: 0 30px;

    .navbar-logo p {
      font-size: 30px;
    }
  }
}

@media (max-width: 381px) {
  .navbar {
    padding: 0 10px;

    .navbar-logo {
      .logo {
        width: 40px;
      }
      p {
        font-size: 27px;
      }
    }
  }
}
</style>
