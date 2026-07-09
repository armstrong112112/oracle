<template>
  <div class="shop-calendar-wrapper" ref="shop-calendar">
    <div class="calendar__content">
      <div class="flatpickr-line-button">
        <img :src="'/svg/shop/icons/close-line.svg'" alt="close" />
      </div>
      <div ref="calendarInput" class="calendar-oracle calendar"></div>
      <div class="calendar-action">
        <button class="save__action" @click="closeCalendar">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import type { Instance as FlatpickrInstance } from "flatpickr/dist/types/instance";
import type { Options as FlatpickrOptions } from "flatpickr/dist/types/options";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    value?: string;
  }>(),
  {
    value: "",
  }
);

const emit = defineEmits<{
  close: [];
  input: [value: string];
}>();

const shopCalendar = ref<HTMLElement | null>(null);
const calendarInput = ref<HTMLElement | null>(null);
const isCalendarOpen = ref(false);
const calendarInstance = ref<FlatpickrInstance | null>(null);
const selectedDates = ref("");

const addOutsideClickListener = (): void => {
  if (!isCalendarOpen.value) {
    document.addEventListener("click", handleOutsideClick);
    isCalendarOpen.value = true;
  }
};

const handleOutsideClick = (event: Event): void => {
  if (
    shopCalendar.value &&
    !shopCalendar.value.contains(event.target as Node)
  ) {
    closeCalendar();
  }
};

const removeOutsideClickListener = (): void => {
  if (isCalendarOpen.value) {
    document.removeEventListener("click", handleOutsideClick);
    isCalendarOpen.value = false;
  }
};

const closeCalendar = (): void => {
  if (calendarInstance.value) {
    calendarInstance.value.close();
  }
  removeOutsideClickListener();
  emit("close");
};

const adjustDayCells = (): void => {
  nextTick(() => {
    document.querySelectorAll(".flatpickr-day").forEach((e) => {
      const el = e as HTMLElement;
      el.style.height = el.offsetWidth + "px";
    });
  });
};

const onDateSelect = (selectedDatesArray: Date[], dateStr: string): void => {
  selectedDates.value = dateStr;
  emit("input", dateStr);
};

const applyCustomYearButtons = (): void => {
  setTimeout(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth <= 500;
    const instance: FlatpickrInstance | null = calendarInstance.value;
    if (!instance) return;
    if (isMobile) {
      instance.calendarContainer.classList.add("flatpickr-mobile-drawer");
    }
    // CUSTOM YEAR
    const yearWrapper = instance.calendarContainer.querySelector(
      ".flatpickr-current-month .numInputWrapper"
    ) as HTMLSelectElement;

    if (yearWrapper) {
      const yearHeader = document.createElement("div");
      yearHeader.classList.add("year-header");

      const yearWithControls = document.createElement("div");
      yearWithControls.classList.add("year-with-controls");

      yearWrapper.parentNode?.insertBefore(yearHeader, yearWrapper);
      yearWithControls.appendChild(yearWrapper);

      const customControls = document.createElement("div");
      customControls.classList.add("custom-year-controls");

      const customUp = document.createElement("span");
      customUp.classList.add("custom-year-up");
      customUp.innerHTML = `<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.84375 6.3125L5.88171 1.82588C6.27895 1.3845 6.97105 1.3845 7.36829 1.82588L11.4063 6.3125" stroke="#F64E2A" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

      const customDown = document.createElement("span");
      customDown.classList.add("custom-year-down");
      customDown.innerHTML = `<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4062 1.6875L7.36829 6.17412C6.97105 6.6155 6.27895 6.6155 5.88171 6.17412L1.84375 1.6875" stroke="#F64E2A" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

      customControls.appendChild(customUp);
      customControls.appendChild(customDown);

      yearWithControls.appendChild(customControls);
      yearHeader.appendChild(yearWithControls);

      const closeBtn = document.createElement("button");
      closeBtn.classList.add("calendar-close");
      closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2006_5452)">
<rect x="4.72754" y="6.54547" width="2.57143" height="18" rx="1.28571" transform="rotate(-45 4.72754 6.54547)" fill="white"/>
<rect x="6.54492" y="19.2729" width="2.57143" height="18" rx="1.28571" transform="rotate(-135 6.54492 19.2729)" fill="white"/>
</g>
<defs>
<clipPath id="clip0_2006_5452">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`;
      closeBtn.addEventListener("click", () => {
        instance.close();
        emit("close");
      });

      yearHeader.appendChild(closeBtn);

      const currentMonthEl = instance.calendarContainer.querySelector(
        ".flatpickr-current-month"
      );

      if (currentMonthEl) {
        currentMonthEl.appendChild(yearHeader);
      }

      customUp.addEventListener("click", () => {
        instance.changeYear(instance.currentYear + 1);
      });
      customDown.addEventListener("click", () => {
        instance.changeYear(instance.currentYear - 1);
      });
    }

    // CUSTOM MONTH
    const monthSelect = instance.calendarContainer.querySelector(
      ".flatpickr-monthDropdown-months"
    ) as HTMLSelectElement;

    if (monthSelect) {
      const wrapper: HTMLDivElement = document.createElement("div");
      wrapper.classList.add("month-with-controls");

      monthSelect.parentNode?.insertBefore(wrapper, monthSelect);
      wrapper.appendChild(monthSelect);

      const customControls: HTMLDivElement = document.createElement("div");
      customControls.classList.add("custom-month-controls");
      customControls.innerHTML = `
       <button type="button" class="custom-month-prev">
         <svg width="13" height="8" viewBox="0 0 13 8" fill="none">
           <path d="M1.84375 6.3125L5.88171 1.82588C6.27895 1.3845 6.97105 1.3845 7.36829 1.82588L11.4063 6.3125"
                 stroke="#7A74BA" stroke-width="2" stroke-linecap="round"/>
         </svg>
       </button>
       <button type="button" class="custom-month-next">
         <svg width="13" height="8" viewBox="0 0 13 8" fill="none">
           <path d="M11.4062 1.6875L7.36829 6.17412C6.97105 6.6155 6.27895 6.6155 5.88171 6.17412L1.84375 1.6875"
                 stroke="#7A74BA" stroke-width="2" stroke-linecap="round"/>
         </svg>
       </button>
     `;
      wrapper.appendChild(customControls);

      const adjustWidth = () => {
        const tempSpan: HTMLSpanElement = document.createElement("span");
        tempSpan.style.visibility = "hidden";
        tempSpan.style.position = "absolute";
        tempSpan.style.whiteSpace = "nowrap";
        tempSpan.style.font = getComputedStyle(monthSelect).font;
        tempSpan.textContent =
          monthSelect.options[monthSelect.selectedIndex].text;
        document.body.appendChild(tempSpan);

        monthSelect.style.setProperty(
          "width",
          `${tempSpan.offsetWidth + 8}px`,
          "important"
        );
        tempSpan.remove();
      };

      const prev = customControls.querySelector(".custom-month-prev");
      if (prev) {
        prev.addEventListener("click", () => {
          instance.changeMonth(-1);
          adjustWidth();
        });
      }

      const next = customControls.querySelector(".custom-month-next");
      if (next) {
        next.addEventListener("click", () => {
          instance.changeMonth(1);
          adjustWidth();
        });
      }

      monthSelect.addEventListener("change", adjustWidth);

      adjustWidth();
    }
  }, 100);
};

const initCalendar = (): void => {
  const config: Partial<FlatpickrOptions> = {
    locale: Russian,
    mode: "range",
    dateFormat: "Y-m-d",
    closeOnSelect: false,
    defaultDate: props.value || undefined,
    onOpen: () => {
      addOutsideClickListener();
    },
    onClose: (selectedDatesArray: Date[], dateStr: string) => {
      onDateSelect(selectedDatesArray, dateStr);
      removeOutsideClickListener();
    },
    appendTo: calendarInput.value as HTMLElement,
  };

  calendarInstance.value = flatpickr(
    calendarInput.value as HTMLInputElement,
    config
  );
  applyCustomYearButtons();
};

onMounted(() => {
  initCalendar();
  window.addEventListener("resize", adjustDayCells);
  adjustDayCells();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", adjustDayCells);
  removeOutsideClickListener();
  if (calendarInstance.value) {
    calendarInstance.value.destroy();
  }
});

defineExpose({
  closeCalendar,
  openCalendar: () => {
    if (calendarInstance.value) {
      calendarInstance.value.open();
      addOutsideClickListener();
      adjustDayCells();
    }
  },
});
</script>

<style lang="scss">
@use "calendar" as *;
</style>
