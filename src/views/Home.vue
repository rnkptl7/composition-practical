<template>
  <div>
    <div class="menubar">
      <button class="btn" @click="isOpenModal(true)">Add Car</button>
    </div>
    <GalleryCard></GalleryCard>
  </div>
</template>

<script>
import GalleryCard from "@/components/GalleryCard.vue";

import { useCarStore } from "../stores/CarStore";
import { mapState } from "pinia";

export default {
  components: {
    GalleryCard,
  },
  computed: {
    ...mapState(useCarStore, ["isOpenModal"]),
  },
};
</script>

<style lang="scss" scoped></style>
