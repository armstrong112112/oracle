<template>
  <div class="phone-wrapper">
    <div class="form-select__phone">
      <label class="form-select__label" :class="{ float: selectedCountry }"
        >Country</label
      >
      <button class="select-btn" @click="selectCountry = !selectCountry">
        <span class="countr-name" :class="{ show: selectedCountry }">{{
          selectedCountry?.name
        }}</span>
        <span class="arrow-icon" :class="{ active: selectCountry }"></span>
      </button>
      <div class="select-menu" :class="{ show: selectCountry }">
        <input-oracle
          :v="searchTerm"
          :search="true"
          placeholder="Search..."
          @changed="filterCountries" />
        <div
          v-for="(country, i) in filteredCountries"
          :key="i"
          class="select-option"
          @click="onCountrySelect(country)">
          <div class="left-block">
            <span class="flag">
              <img :src="country.flag" alt="" />
            </span>
            <p class="select-option__name">
              {{ country.name }}
            </p>
          </div>
          <p class="select-option__code">
            {{ country.code }}
          </p>
        </div>
      </div>
    </div>

    <div class="form-group">
      <input
        ref="codeInputRef"
        v-model="codeInput"
        class="form-input code-input"
        type="tel"
        inputmode="tel"
        pattern="^\+?[0-9]*$"
        placeholder="+7"
        @input="onCodeRestrictedInput" />

      <input
        ref="phoneInput"
        v-model="phoneNumberRaw"
        class="form-input"
        type="tel"
        inputmode="tel"
        pattern="^\+?[0-9]*$"
        :placeholder="phonePlaceholder"
        :maxlength="phoneInputMaxLength"
        @input="onPhoneNumberInput"
        @keydown="onPhoneKeyDown" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CountryCode } from "libphonenumber-js";
import { AsYouType, getExampleNumber } from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";
import { nextTick, onMounted, ref, watch } from "vue";
import rawCountries from "assets/phone-countries";

interface Country {
  name: string;
  code: string;
  flag: string;
  iso2: string;
  region: string;
}

const emit = defineEmits<{
  "country-selected": [country: Country];
  "phone-changed": [phone: string];
  "country-changed": [country: Country];
  "phone-input-max-length": [length: number];
}>();

const phoneNumberRaw = ref("");
const phoneInputMaxLength = ref(9);
const phonePlaceholder = ref("00 000 00 00");
const codeInput = ref("");
const searchTerm = ref("");
const selectCountry = ref(false);
const filteredCountries = ref<Country[]>([]);
const selectedCountry = ref<Country | null>(null);
const countries = ref<Country[]>([]);
const phoneInput = ref<HTMLInputElement>();
const codeInputRef = ref<HTMLInputElement>();

onMounted(() => {
  countries.value = rawCountries.map((entry: any[]) => {
    const [name, mass, iso2, dialCode] = entry;
    return {
      name,
      code: `+${dialCode}`,
      flag: `https://flagcdn.com/256x192/${iso2}.png`,
      iso2,
      region: mass?.[0] || "",
    };
  });
  filteredCountries.value = countries.value;
});

function filterCountries(val: string) {
  searchTerm.value = val;
  const term = searchTerm.value.toLowerCase();
  filteredCountries.value = countries.value.filter(
    (c) => c.name.toLowerCase().includes(term) || c.code.includes(term)
  );

  if (!searchTerm.value) {
    filteredCountries.value = countries.value;
  }
}

function onCountrySelect(country: Country) {
  selectCountry.value = false;
  selectedCountry.value = country;
  codeInput.value = country.code;
  emit("country-selected", country);
  nextTick(() => {
    phoneInput.value?.focus();
  });
}

function onCodeRestrictedInput(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/[^\d+]/g, "");

  if (value.includes("+")) {
    value = "+" + value.replace(/\+/g, "");
  }

  codeInput.value = value;
  onCodeInput();
}

function onCodeInput() {
  if (!codeInput.value.startsWith("+")) {
    codeInput.value = "+" + codeInput.value.replace(/[^0-9]/g, "");
  }

  const matches = countries.value.filter((c) => c.code === codeInput.value);
  const found =
    matches.find((c) => c.name === "Russia" || c.name === "United States") ||
    matches[0] ||
    null;

  selectedCountry.value = found;

  if (found) {
    phonePlaceholder.value = getExamplePlaceholder(found.iso2);
    emit("country-selected", found);
    nextTick(() => {
      phoneInput.value?.focus();
    });
  }
}

function onPhoneNumberInput(event: Event) {
  if (!selectedCountry.value) return;

  const input = event.target as HTMLInputElement;
  const digitsOnly = input.value.replace(/\D/g, "");
  const formatter = new AsYouType(
    selectedCountry.value.iso2.toUpperCase() as CountryCode
  );

  phoneNumberRaw.value = formatter.input(digitsOnly);
  emit("phone-changed", phoneNumberRaw.value);

  nextTick(() => {
    input.value = phoneNumberRaw.value;
  });
}

function onPhoneKeyDown(event: KeyboardEvent) {
  if (event.key === "Backspace") {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value;
    const digitsOnly = rawValue.replace(/\D/g, "");

    if (digitsOnly.length === 0) {
      setTimeout(() => {
        const stillRaw = input.value.replace(/\D/g, "");
        if (stillRaw.length === 0) {
          codeInputRef.value?.focus({ preventScroll: true });
        }
      }, 0);
    }
  }
  if (event.key !== "Backspace") return;

  const input = event.target as HTMLInputElement;
  const raw = input.value;
  const cursor = input.selectionStart || 0;
  const chars = raw.split("");
  const isDigit = (ch: string) => /\d/.test(ch);

  let deleteIndex = cursor - 1;
  while (deleteIndex >= 0 && !isDigit(chars[deleteIndex])) {
    deleteIndex--;
  }

  if (deleteIndex >= 0) {
    event.preventDefault();
    chars.splice(deleteIndex, 1);
    const digitsOnly = chars.join("").replace(/\D/g, "");
    const formatter = new AsYouType(
      selectedCountry.value?.iso2.toUpperCase() as CountryCode
    );
    const formatted = formatter.input(digitsOnly);
    phoneNumberRaw.value = formatted;
    emit("phone-changed", formatted);

    nextTick(() => {
      input.value = formatted;
      const newCursor = Math.min(deleteIndex, formatted.length);
      input.setSelectionRange(newCursor, newCursor);
    });
  }
}

function getExamplePlaceholder(iso2: string): string {
  try {
    const countryCode = iso2.toUpperCase() as CountryCode;
    const example = getExampleNumber(countryCode, examples);
    if (!example) return "";
    return example.formatNational().replace(/\d/g, "0");
  } catch (error) {
    return "";
  }
}

function formatRussianPhone(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 10);
  const parts = [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 8),
    digits.slice(8, 10),
  ];

  let formatted = "";
  if (parts[0]) formatted += `(${parts[0]}`;
  if (parts[0].length === 3) formatted += `)`;
  if (parts[1]) formatted += ` ${parts[1]}`;
  if (parts[2]) formatted += `-${parts[2]}`;
  if (parts[3]) formatted += `-${parts[3]}`;

  return formatted;
}

watch(selectedCountry, (newCountry) => {
  if (!newCountry) return;
  emit("country-changed", newCountry);

  const iso2 = newCountry.iso2.toUpperCase();
  if (iso2 === "RU") {
    phoneNumberRaw.value = formatRussianPhone(phoneNumberRaw.value);
    phonePlaceholder.value = "000 000-00-00";
    phoneInputMaxLength.value = 13;
  } else {
    const formatter = new AsYouType(iso2 as CountryCode);
    phoneNumberRaw.value = formatter.input(phoneNumberRaw.value);
    phonePlaceholder.value = getExamplePlaceholder(newCountry.iso2);
    phoneInputMaxLength.value = phonePlaceholder.value.length;
  }
  emit("phone-input-max-length", phoneInputMaxLength.value);
});
</script>

<style lang="scss" scoped>
@use "assets/styles/shared/phone-input" as *;
</style>
