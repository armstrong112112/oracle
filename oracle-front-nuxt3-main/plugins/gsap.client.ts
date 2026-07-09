import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  nuxtApp.provide("gsap", gsap);
  nuxtApp.provide("ScrollTrigger", ScrollTrigger);
});
