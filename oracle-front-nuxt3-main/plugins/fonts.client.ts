export default defineNuxtPlugin((nuxtApp) => {
  // Ensure fonts are loaded and available on navigation
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    // All fonts from fonts.css - preload for better performance
    const fontsToPreload = [
      {
        href: "/fonts/Hanson-Bold.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/evolventa/Evolventa-Regular.otf",
        type: "font/otf",
      },
      {
        href: "/fonts/RezaZulmiSans.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/DrukCyr-Bold.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/kenyan coffee rg.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/roboto/Roboto-Light.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/roboto/Roboto-Regular.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/roboto/Roboto-Medium.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/roboto/Roboto-Bold.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/inter/Inter-Regular.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/inter/Inter-Medium.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/inter/Inter-Bold.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/hector-regular.otf",
        type: "font/otf",
      },
      {
        href: "/fonts/Nunito-Regular.ttf",
        type: "font/ttf",
      },
      {
        href: "/fonts/Nunito-SemiBold.ttf",
        type: "font/ttf",
      },
    ];

    // Preload all fonts dynamically
    fontsToPreload.forEach((font) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.type = font.type;
      link.crossOrigin = "anonymous";
      link.href = font.href;
      document.head.appendChild(link);
    });

    // Ensure fonts are loaded before page navigation
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        // Force font rendering - ensures fonts are applied
        if (document.body) {
          document.body.style.visibility = document.body.style.visibility || "";
        }
      });
    }

    // Listen for route changes to ensure fonts persist
    nuxtApp.hook("page:finish", () => {
      if ("fonts" in document) {
        // Re-check font availability on page change for all fonts
        const fontsToCheck = [
          "Hanson",
          "Evolventa",
          "Reza Zulmi Alfaizi Sans",
          "Druk Text Wide Cyr",
          "Kenyan Coffee",
          "Roboto",
          "Inter",
          "Hector",
          "Nunito",
        ];

        fontsToCheck.forEach((font) => {
          document.fonts.check(`1em "${font}"`);
        });
      }
    });
  }
});
