import { Swiper } from "swiper";
import { register } from "swiper/element/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default defineNuxtPlugin((nuxtApp) => {
  register();

  Swiper.use([Navigation, Pagination, Autoplay]);

  nuxtApp.provide("swiper", Swiper);
});
