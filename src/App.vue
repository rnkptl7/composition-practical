<template>
  <Navbar></Navbar>
  <Suspense>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in" appear>
        <component :is="Component"></component>
      </transition>
    </router-view>
  </Suspense>
</template>

<script setup>
import "sweetalert2/src/sweetalert2.scss";
import Navbar from "./components/Navbar.vue";
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
