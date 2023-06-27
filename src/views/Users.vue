<template>
  <div v-if="loading" class="loader">
    <!-- <Loading/> -->
    <h1 class="text-white">Loaifdbndhb</h1>
  </div>
  <div v-else class="userDiv">
    <div>
      <div class="text-white text-center text-h4 font-weight-bold userHeading">
        {{ $t("users.users") }}
      </div>
      <v-table>
        <thead class="bg-blue-grey-darken-1">
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Role</th>
            <th class="text-left">Gender</th>
            <th class="text-left">DOB</th>
            <th class="text-left">Age</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users.data.data" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.role }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.dob }}</td>
            <td>{{ item.age }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script setup>
import Loading from "../components/Loading.vue";
import { storeToRefs } from "pinia";

import { useUserStore } from "../stores/userStore";
import { useCarStore } from "../stores/CarStore";

const userStore = useUserStore();
const carStore = useCarStore();

const { loading } = storeToRefs(carStore);

async function getUser() {
  loading.value = true;
  const users = await userStore.getUsers();
  loading.value = false;
  return users;
}

const users = await getUser();
</script>

<style lang="scss" scoped>
.userDiv {
  width: 75%;
  margin: auto;
  margin-bottom: 20px;

  table {
    border-radius: 5px;
  }

  tr:nth-child(even) {
    background: #546e7a22;
  }

  thead tr th {
    font-size: 18px;
    font-weight: 600 !important;
    color: #fff !important;
  }

  tbody {
    background: #f4f4f4;
  }

  .userHeading {
    margin: 20px 0;
    margin-top: 40px;
  }
}

@media screen and (max-width: "900px") {
  .userDiv {
    width: 95%;
  }
}
</style>
