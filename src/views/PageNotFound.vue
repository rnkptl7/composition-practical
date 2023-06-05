<template>
  <div class="notFound">
    <img src="/images/not.png" alt="" srcset="" />
    <h1>Page Not Found!</h1>
    <router-link :to="{ name: 'Home' }">
      <button class="btn">Go To Home</button>
    </router-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;

  h1 {
    color: #cccc;
    font-size: 3rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 650px) {
  img {
    width: 100%;
  }
  .notFound h1 {
    font-size: 2rem;
  }
}
</style>
