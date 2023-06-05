<template>
  <Navbar></Navbar>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in" appear>
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
import "sweetalert2/src/sweetalert2.scss";

import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.2s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
