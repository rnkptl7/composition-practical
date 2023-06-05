<template>
  <div class="container">
    <vee-form class="form" :validation-schema="schema" @submit="submitForm">
      <div class="heading">
        <h1 class="heading">Login</h1>
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
        </div>
      </div>
      <div class="buttons block">
        <button type="submit" class="btn">Login</button>
      </div>
    </vee-form>
  </div>
</template>

<script>
import { ErrorMessage } from "vee-validate";
import { useUserStore } from "../stores/userStore";
import { useCarStore } from "../stores/CarStore";
import { mapActions, mapWritableState } from "pinia";

export default {
  components: {
    ErrorMessage,
  },
  data() {
    return {
      schema: {
        email: "required|email",
        password:
          "required|passwordmin:8|passwordmax:12|regex:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).*$",
      },
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapWritableState(useCarStore, ["loading"]),
  },
  methods: {
    ...mapActions(useUserStore, ["loginUser", "getUsers"]),
    async submitForm() {
      try {
        this.loading = true;
        // const response = await this.loginUser(this.form);

        const response = await this.getUsers();
        const users = response.data.data;

        const isAvailable = users.find(
          (user) =>
            user.email === this.form.email &&
            user.password === this.form.password
        );

        // console.log(isAvailable);
        if (isAvailable) {
          this.$toast.success("Login successfully", {
            position: "top-right",
            duration: 3000,
          });
          let token = Math.random().toString(36).substr(2);
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("token", token);
          this.loading = false;
          this.$router.replace({ name: "Home" });
        } else {
          this.loading = false;
          throw new Error("Incorrect email or password");
        }
      } catch (error) {
        this.loading = false;
        alert("Incorrect email or password!");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
