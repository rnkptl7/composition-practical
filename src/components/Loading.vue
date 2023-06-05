<template>
  <div>
    <ScalingSquaresSpinner :animation-duration="1000" :size="60" color="#fff" />
    <h2>Loading...</h2>
  </div>
</template>

<script>
import { ScalingSquaresSpinner } from "epic-spinners";

export default {
  components: {
    ScalingSquaresSpinner,
  },
};
</script>

<style lang="scss" scoped></style>
