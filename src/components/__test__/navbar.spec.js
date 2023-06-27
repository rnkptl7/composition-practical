import Navbar from "@/components/Navbar.vue";
import { RouterLinkStub, mount } from "@vue/test-utils";
import i18n from "../../includes/i18n.js";
import { createPinia, setActivePinia } from "pinia";
import App from "../../App.vue";

import { createRouter, createWebHistory } from "vue-router";
import Login from "../../views/Login.vue";

describe("Navbar.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Render inner text", async () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [i18n],
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });
    const expectedText = "apniCar";
    const navbarText = wrapper.find(".navbar-logo p").text();
    expect(navbarText).toContain(expectedText);

    const a = wrapper.findAll("a");
    expect(a.length).toBe(5);
  });

  it("Route Login", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/login",
          name: "Login",
          component: Login,
        },
      ],
    });

    router.push("/login");

    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [i18n, router],
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    expect(wrapper.findComponent(Login).exists()).toBe(true);
  });
});
