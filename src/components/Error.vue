<template>
  <div>
    <img src="/images/error_icon.png" alt="" />
    <p>{{ error }}</p>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useCarStore } from "../stores/CarStore";
export default {
  computed: {
    ...mapState(useCarStore, ["error"]),
  },
};
</script>

<style lang="scss"></style>
