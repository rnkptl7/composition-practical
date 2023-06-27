import { mount } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import i18n from "../../includes/i18n.js";
import validation from "../../includes/validation.js";
import { beforeEach, describe } from "vitest";
import { useUserStore } from "../../stores/userStore";
import { createPinia, setActivePinia } from "pinia";

describe("Login Form", async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Renders the input value", async () => {
    const userStore = useUserStore();
    const wrapper = mount(Login, {
      global: {
        plugins: [i18n, validation],
      },
    });
   
    expect(userStore.isLoggedIn).not.toBe(true);

    const input = wrapper.find("input");
    expect(input.text()).toContain("");
    await input.setValue("ronak@gmail.com");
    expect(input.element.value).toEqual("ronak@gmail.com");
  });
});
