<template>
  <div id="navigation-mobile">
    <ul>
      <div v-if="isLoggedIn">
        <li>
          <router-link to="/">{{ $t("navbar.home") }}</router-link>
        </li>
        <li>
          <router-link v-if="isAdmin" :to="{ name: 'Users' }">{{
            $t("users.users")
          }}</router-link>
        </li>
        <button class="btn" @click="logoutBtn">
          {{ $t("navbar.logout") }}
        </button>
      </div>
      <div v-else>
        <li>
          <router-link to="/login">{{ $t("navbar.login") }}</router-link>
        </li>
        <li>
          <router-link to="/register">{{ $t("navbar.register") }}</router-link>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore";
import { useCarStore } from "../stores/CarStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const carStore = useCarStore();
const router = useRouter();

const { isLoggedIn, isAdmin } = storeToRefs(userStore);
const { showNav } = storeToRefs(carStore);

function logoutBtn() {
  userStore.logout();
  router.push({ name: "Login" });
}

if (showNav.value === true) {
  document.onclick = function (e) {
    console.log(e.target.classList[0] === "navigation-menu");
    if (e.target.classList[0] !== "navigation-menu") {
      showNav.value = false;
    }
  };
}
</script>

<style lang="scss" scoped>
#navigation-mobile {
  padding: 20px 0 0 0;

  ul {
    list-style: none;
    width: 200px;
    padding-left: 6rem;

    li {
      margin: 1rem 1rem;
      a {
        color: #fff;
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 20px;
        cursor: pointer;
        text-decoration: none;
      }

      &:hover {
        color: #111;
      }
    }
  }
}

@media (max-width: 520px) {
  #navigation-mobile {
    ul {
      padding-left: 1.3rem;
    }
  }
}
</style>
