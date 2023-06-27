import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "../../stores/userStore";
import axios from "axios";

vi.mock("axios");

describe("userStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("login user", async () => {
    const store = useUserStore();

    const formData = {
      email: "rnk@gmail.com",
      password: "Rnk@1234",
    };

    axios.post.mockResolvedValue({
      data: formData,
    });

    expect(store.isLoggedIn).not.toBe(true);
    let data = await store.loginUser(formData);
    console.log(data);
    expect(store.isLoggedIn).toBe(null);
  });
});
