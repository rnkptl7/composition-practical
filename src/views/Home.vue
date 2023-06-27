<template>
  <div>
    <div class="menubar">
      <button class="btn" @click="isOpenModal(true)">
        {{ $t("home.addBtn") }}
      </button>
    </div>
    <GalleryCard></GalleryCard>
  </div>
</template>

<script setup>
import GalleryCard from "@/components/GalleryCard.vue";

import { useCarStore } from "../stores/CarStore";
import { storeToRefs } from "pinia";

const carStore = useCarStore();

const { isOpenModal } = storeToRefs(carStore);
</script>

<style lang="scss" scoped></style>
