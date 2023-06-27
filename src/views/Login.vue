<template>
  <div class="container">
    <vee-form class="form" :validation-schema="schema" @submit="submitForm">
      <div class="heading">
        <h1 class="heading">{{ $t("navbar.login") }}</h1>
      </div>
      <div class="fields">
        <div class="inputDiv">
          <label>Email:</label>
          <vee-field
            type="email"
            v-model="form.email"
            placeholder="Enter Your Email"
            name="email"
          />
          <ErrorMessage name="email" class="error" />
        </div>
        <div class="inputDiv">
          <label>Password:</label
          ><vee-field
            type="password"
            v-model="form.password"
            placeholder="Enter Your Password"
            name="password"
          />
          <ErrorMessage name="password" class="error" />
          <em>(All fields are required unless specified optional)</em>
        </div>
      </div>
      <div class="buttons block">
        <button type="submit" class="btn">{{ $t("navbar.login") }}</button>
      </div>
    </vee-form>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";
import { useCarStore } from "../stores/CarStore";

import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ErrorMessage } from "vee-validate";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();
const userStore = useUserStore();
const carStore = useCarStore();
const router = useRouter();

const { getUsers } = userStore;
const { loading } = storeToRefs(carStore);
const { isAdmin } = storeToRefs(userStore);

const schema = {
  email: "required|email",
  password:
    "required|passwordmin:8|passwordmax:12|regex:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).*$",
};

const form = reactive({
  email: "",
  password: "",
});

const submitForm = async () => {
  try {
    loading.value = true;
    const response = await getUsers();
    const users = response.data.data;

    const isAvailable = users.find(
      (user) => user.email === form.email && user.password === form.password
    );

    if (isAvailable) {
      $toast.success("Login successfully", {
        position: "top-right",
        duration: 3000,
      });
      console.log(isAvailable);
      if (isAvailable.role === "admin") {
        sessionStorage.setItem("isAdmin", true);
        isAdmin.value = true;
      }
      let token = Math.random().toString(36).substr(2);
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("token", token);
      loading.value = false;
      router.replace({ name: "Home" });
    } else {
      loading.value = false;
      throw new Error("Incorrect email or password");
    }
  } catch (error) {
    loading.value = false;
    alert("Incorrect email or password!");
  }
};
</script>

<style lang="scss" scoped></style>
