<template>
  <div class="language-switcher">
    <div ref="dropdownRef" class="dropdown" @click="toggleDropdown">
      <div class="dropdown-button">
        <img
          v-if="currentLanguage?.flag"
          :src="currentLanguage.flag"
          :alt="currentLanguage.name"
          class="flag-icon" />
        <span>{{ currentLanguage?.name || "EN" }}</span>
        <svg
          class="dropdown-arrow"
          :class="{ rotate: isOpen }"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none">
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>

      <div v-show="isOpen" class="dropdown-menu">
        <div
          v-for="localeItem in availableLocales"
          :key="localeItem.code"
          class="dropdown-item"
          :class="{ active: localeItem.code === currentLocale }"
          @click.stop="changeLanguage(localeItem.code)">
          <img
            v-if="localeItem.flag"
            :src="localeItem.flag"
            :alt="localeItem.name"
            class="flag-icon" />
          <span>{{ localeItem.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const languages = {
  en: {
    code: "en",
    name: "English",
    flag: "/flags/en.svg",
  },
  ru: {
    code: "ru",
    name: "Русский",
    flag: "/flags/ru.svg",
  },
} as const;

// Use a safer computed that works on both server and client
const currentLocale = computed(() => locale.value || "en");

const currentLanguage = computed(() => {
  const lang = currentLocale.value as keyof typeof languages;
  return languages[lang] || languages.en;
});

const availableLocales = computed(() => {
  return Object.values(languages);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLanguage = (code: "en" | "ru") => {
  setLocale(code as "en" | "ru");
  isOpen.value = false;

  // Use nextTick to ensure state is updated
  nextTick(() => {
    const currentRoute = router.currentRoute.value;
    // Ensure we're passing a proper route object to localePath
    const path = localePath({
      name: currentRoute.name,
      params: currentRoute.params,
      query: currentRoute.query,
    });

    if (path && typeof path === "string" && path !== currentRoute.path) {
      router.push(path);
    }
  });
};

// Close dropdown when clicking outside - only on client
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// Only attach event listeners on client
if (import.meta.client) {
  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
}
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
  font-family: Inter;
}

/* Dropdown Styles */
.dropdown {
  position: relative;
}

.dropdown-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #f64e2a;
  border-radius: 8px;
  background: rgba(73, 2, 2, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  color: white;
}

.dropdown-arrow {
  transition: transform 0.2s ease;
  margin-left: auto;
}

.dropdown-arrow.rotate {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: black;
  color: white;
  border: 1px solid #f64e2a;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 4px;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: rgba(246, 78, 42, 0.1);
}

.dropdown-item.active {
  background-color: #f64e2a;
  color: white;
}

.flag-icon {
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
  object-fit: cover;
  border-radius: 50%;
}

/* Button Style (alternativ) */
.button-style {
  display: flex;
  gap: 8px;
}

.lang-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #f64e2a;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.lang-button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* Responsive */
@media (max-width: 768px) {
  .dropdown-button {
    min-width: 100px;
    padding: 6px 10px;
  }

  .flag-icon {
    width: 18px;
    height: 13px;
  }
}
</style>
