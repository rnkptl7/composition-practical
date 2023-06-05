import axios from "axios";
import { defineStore } from "pinia";

export const useCarStore = defineStore("carStore", {
  state: () => ({
    carsData: [],
    loading: false,
    isError: false,
    openModal: false,
    editModal: false,
    mobileView: true,
    showNav: false,
    error: "",
    car: [],
    moreCarsData: [],
    url: import.meta.env.VITE_PROD_CARDATA_URL,
  }),
  getters: {
    getCarById: (state) => (id) => {
      state.car = [];
      const car = state.carsData.find((car) => car.id == id);
      if (!car) {
        state.isError = true;
        state.error = "Car data is not available!";
      }
      state.car.push(car);
    },
    moreCars: (state) => (id) => {
      let carsFilter = state.carsData.filter((response) => response.id != id);
      state.moreCarsData = carsFilter.slice(0, 3);
    },
    isOpenModal: (state) => (val) => {
      state.openModal = val;
      window.scrollTo(0, 0);
    },
    closeModal: (state) => () => {
      state.openModal = false;
      state.editModal = false;
    },
    editButton: (state) => () => {
      state.openModal = true;
      state.editModal = true;
    },
  },
  actions: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    closeMobileMenu() {
      this.showNav = false;
    },
    async getData() {
      this.loading = true;
      try {
        const response = await axios.get(this.url);

        this.carsData = response.data.data;
        this.loading = false;
        this.isError = false;
      } catch (error) {
        this.loading = false;
        this.isError = true;
        this.error = error.response.status + " " + error.response.statusText;
      }
    },
    updateCarData(editCarId, formData) {
      return axios.put(`${this.url}/${editCarId}`, formData);
    },
    deleteCarData(id) {
      return axios.delete(`${this.url}/${id}`);
    },
    addCarData(formData) {
      return axios.post(this.url, formData);
    },
    // loginUser(formData) {
    //   return axios.post("https://testapi.io/api/dartya//login", formData);
    // },
    // addUser(formData) {
    //   return axios.post(
    //     "https://testapi.io/api/dartya/resource/users",
    //     formData
    //   );
    // },
  },
});
