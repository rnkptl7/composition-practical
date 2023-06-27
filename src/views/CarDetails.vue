<template>
  <div v-if="loading" class="loader"><Loading /></div>
  <div v-else class="carCard">
    <div v-if="isError" class="errorDiv">
      <Error />
    </div>
    <div v-else class="navigationBar">
      <div class="backBtn" @click="$router.push({ name: 'Home' })">
        <img src="/images/back.png" alt="Back Image" />
        <p>{{ $t("details.back") }}</p>
      </div>
    </div>
    <div v-if="!isError" class="carDetails" v-for="car in car">
      <div class="carImage">
        <img :src="car?.image" :alt="car?.id" srcset="" />
      </div>
      <div class="carDesc">
        <div>
          <h1>{{ car?.name }}</h1>
          <p class="details">{{ car?.details }}</p>
        </div>
        <div class="carInfo">
          <button class="btn">{{ $t("details.buynow") }}</button>
          <p>₹{{ car?.price }}</p>
        </div>
      </div>
    </div>

    <div class="card-container">
      <div class="card cardHeight" v-for="car in moreCarsData">
        <div class="card-image">
          <img :src="car.image" alt="" />
        </div>
        <div class="cardDetails">
          <p class="text-title">{{ car.name }}</p>
          <div class="cardBtn">
            <div>
              <router-link
                v-if="car.price"
                class="card-button"
                :to="{ name: 'Details', params: { id: car.id } }"
                >Info</router-link
              >
              <button disabled v-else class="card-button">
                Available Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCarStore } from "../stores/CarStore";

import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { watch } from "vue";

const carStore = useCarStore();
const route = useRoute();

const { loading, isError, error, car, moreCarsData } = storeToRefs(carStore);

function initData() {
  try {
    loading.value = true;
    isError.value = false;

    carStore.getCarById(route.params.id);

    carStore.moreCars(route.params.id);

    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
    isError.value = true;
    error.value = error.response.status + " " + error.response.statusText;
  }
}

await carStore.getData();

await initData();

watch(() => route.params.id, initData);
</script>

<style lang="scss">
.carCard {
  display: flex;
  align-items: center;
  flex-direction: column;

  .navigationBar {
    width: 70%;
    margin: 3rem 0 0;

    .backBtn {
      display: flex;
      align-items: center;
      cursor: pointer;
      width: fit-content;
      img {
        width: 35px;
      }
      p {
        font-size: 1.5rem;
        font-weight: 800;
        color: #ffffffd1;
      }
    }
  }

  .cardHeight {
    height: auto;
  }

  .carDetails {
    display: flex;
    background: #334756;
    width: 72rem;
    height: 25rem;
    margin: 5rem 0;
    padding: 2rem;
    border-radius: 10px;

    .carImage {
      width: 60%;
      height: 100%;
      border-radius: 5px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .carDesc {
      width: 40%;
      padding: 2rem;

      h1 {
        color: #fff;
        margin: 1rem 0;
      }
      p {
        color: rgba(255, 255, 255, 0.73);
        font-size: 18px;
      }
      .details {
        height: 10rem;
      }

      .carInfo {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-weight: 800;
          letter-spacing: 1px;
        }
      }
    }
  }
}

.cardDetails {
  display: flex;
  padding: 2rem;
  justify-content: space-around;
  align-items: center;

  p {
    color: #ffffffd1;
    font-size: 1.5rem;
    font-weight: 800;
  }

  a {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    text-decoration: none;
  }
}
@media only screen and (min-width: 851px) and (max-width: 1207px) {
  .carCard {
    .carDetails {
      width: 80%;

      .carDesc {
        padding: 1.3rem;

        .details {
          height: 12rem;
          overflow: hidden;
        }

        .carInfo {
          width: 100%;
        }
      }
    }
  }
}

@media (max-width: 850px) {
  .carCard {
    .carDetails {
      width: 80%;
      height: auto;
      flex-direction: column;

      .carDesc {
        width: 100%;

        .details {
          height: 7rem;
          overflow: hidden;
        }
      }
      .carImage {
        width: 100%;
        height: 20rem;
      }
    }
  }
}

@media (max-width: 500px) {
  .carCard {
    .carDetails {
      width: 90%;
      padding: 0.8rem;

      .carImage {
        width: 100%;
        height: 230px;
      }

      .carDesc {
        padding: 1rem;
        padding-bottom: 1.5rem;
        width: 100%;

        .details {
          height: 7rem;
          overflow: hidden;
        }
        .carInfo {
          width: 100%;
        }
      }
    }
  }
}
</style>
