<template>
  <div class="auth_tg_form">
    <div class="country" @click="toggleDropdown">
      <div class="selected_country">{{ selectedCountry.name }}</div>
      <img
        src="/icons/verification/down.svg"
        :class="{ 'rotate-180': isOpen }"
        alt="down" />
    </div>
    <div v-if="isOpen" class="country-dropdown">
      <div class="country-search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search country"
          @input="filterCountries" />
      </div>
      <div class="country-list">
        <div
          v-for="country in filteredCountries"
          :key="country.code"
          class="country-item"
          @click="selectCountry(country)">
          <img
            v-if="country.flag"
            :src="country.flag"
            class="country-flag"
            alt="country flag" />
          <span>{{ country.name }}</span>
          <span class="country-code">{{ country.dial_code }}</span>
        </div>
      </div>
    </div>
    <div class="phone_line">
      <div class="country_code">{{ selectedCountry.dial_code }}</div>
      <input
        ref="phoneInput"
        type="tel"
        class="phone_number"
        :value="maskedPhoneNumber"
        placeholder="00 000 00 00"
        @input="onPhoneInput" />
    </div>
    <!--    <div v-if="phoneError" class="error-message">{{ phoneError }}</div>-->
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/namespace,import/default,import/no-named-as-default,import/no-named-as-default-member
import IMask from "imask";
// eslint-disable-next-line import/namespace
import type { InputMask } from "imask";
import rawCountries from "~/assets/phone-countries.js";

// Types
interface Country {
  name: string;
  dial_code: string;
  code: string;
  flag?: string;
}

interface PhoneData {
  countryCode: string;
  phoneNumber: string;
  isValid: boolean;
  fullNumber: string;
}

// Emits
const emit = defineEmits<{
  "country-changed": [country: Country];
  "phone-changed": [data: PhoneData];
}>();

// State
const isOpen = ref<boolean>(false);
const countries = ref<Country[]>([]);
const filteredCountries = ref<Country[]>([]);
const selectedCountry = ref<Country>({
  name: "Russia",
  dial_code: "+7",
  code: "RU",
  flag: "",
});

const searchQuery = ref<string>("");
const phoneNumber = ref<string>("");
const maskedPhoneNumber = ref<string>("");
const phoneError = ref<string>("");
const phoneMask = ref<InputMask<any> | null>(null);

// Template refs
const phoneInput = ref<HTMLInputElement | null>(null);

// Lifecycle
onMounted(() => {
  fetchCountries();
  document.addEventListener("click", closeDropdown);

  nextTick(() => {
    initMask();
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
  destroyMask();
});

// Methods
const initMask = () => {
  if (!phoneInput.value) return;

  phoneMask.value = IMask(phoneInput.value, {
    mask: getPhoneMaskByDialCode(selectedCountry.value.dial_code),
    lazy: false,
  });
};

const updateMask = () => {
  if (phoneMask.value) {
    phoneMask.value.updateOptions({
      mask: getPhoneMaskByDialCode(selectedCountry.value.dial_code),
    });
    phoneMask.value.value = "";
  }
};

const destroyMask = () => {
  if (phoneMask.value) {
    phoneMask.value.destroy();
    phoneMask.value = null;
  }
};

const getPhoneMaskByDialCode = (code: string): string => {
  switch (code) {
    case "+998": // Uzbekistan
      return "00 000 00 00";
    case "+7": // Russia
      return "000 000-00-00";
    case "+1": // US
      return "(000) 000-0000";
    case "+44": // UK
      return "0000 000000";
    default:
      return "000000000000000"; // fallback mask
  }
};

const getDialInfo = (name: string) => {
  const found = rawCountries.find((c: any[]) => c[0] === name);
  if (!found) return { dialCode: "", code: "" };
  return {
    dialCode: "+" + found[3],
    code: typeof found[2] === "string" ? found[2].toUpperCase() : "",
  };
};

const fetchCountries = async () => {
   try {
     const response = await $fetch<any[]>(
       "https://restcountries.com/v3.1/all?fields=name,flags"
     );
     const priority = [
       "Russia",
       "United States",
       "United Kingdom",
       "Uzbekistan",
     ];
     countries.value = response
       .map((country: any) => {
         const { dialCode, code } = getDialInfo(country.name.common);
         return {
           name: country.name.common,
           dial_code: dialCode,
           code,
           flag: country.flags.svg,
         };
       })
       .sort((a: any, b: any) => {
         const aIndex = priority.indexOf(a.name);
         const bIndex = priority.indexOf(b.name);
         if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
         if (aIndex !== -1) return -1;
         if (bIndex !== -1) return 1;
         return a.name.localeCompare(b.name);
       });

     filteredCountries.value = [...countries.value];
   } catch {
     // fallback
   }
 };

const toggleDropdown = (event: Event) => {
  event.stopPropagation();
  isOpen.value = !isOpen.value;
};

const closeDropdown = (event: Event) => {
  const target = event.target as HTMLElement;
  const dropdown = document.querySelector(".country-dropdown");
  const selector = document.querySelector(".country");
  if (!dropdown?.contains(target) && !selector?.contains(target)) {
    isOpen.value = false;
  }
};

const filterCountries = () => {
  const query = searchQuery.value.toLowerCase();
  filteredCountries.value = countries.value.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.dial_code.includes(query) ||
      c.code.toLowerCase().includes(query)
  );
};

const selectCountry = (country: Country) => {
  selectedCountry.value = country;
  isOpen.value = false;
  searchQuery.value = "";
  filteredCountries.value = [...countries.value];
  phoneNumber.value = "";
  maskedPhoneNumber.value = "";
  updateMask();
  emit("country-changed", country);
};

const onPhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const unmaskedValue = input.value.replace(/\D/g, "");
  phoneNumber.value = unmaskedValue;

  emit("phone-changed", {
    countryCode: selectedCountry.value.dial_code,
    phoneNumber: unmaskedValue,
    isValid: unmaskedValue.length >= 7 && unmaskedValue.length <= 15,
    fullNumber: selectedCountry.value.dial_code + unmaskedValue,
  });
};
</script>

<style scoped>
.auth_tg_form {
  width: 100%;
  position: relative;
}

.country {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #2b2741;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.selected_country {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #7a74ba;
  display: flex;
  align-items: center;
  gap: 8px;
}

.country-flag {
  width: 20px;
  height: 15px;
  object-fit: cover;
}

.phone_line {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
}

.country_code {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #f64e2a;
  padding: 16px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #2b2741;
}

.phone_number {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #7a74ba;
  padding: 16px;
  width: 100%;
  background: transparent;
  outline: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #2b2741;
}

.country-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 255px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #21212d;
  z-index: 100;
  border-radius: 12px;
}

.country-search {
  padding: 8px;
  border-bottom: 1px solid #2b2741;
}

.country-search input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #2b2741;
  border-radius: 4px;
  background-color: #1e1c2e;
  color: #7a74ba;
  outline: none;
}

.country-list {
  padding: 4px 0;
}

.country-item {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  color: #7a74ba;
}

.country-item:hover {
  background-color: #2b2741;
}

.country-code {
  margin-left: auto;
  color: #f64e2a;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
}

.error-message {
  color: #f64e2a;
  font-size: 12px;
  margin-top: 4px;
  padding: 0 16px;
  font-family: Roboto, sans-serif;
  font-weight: 400;

  line-height: 130%;
  letter-spacing: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
