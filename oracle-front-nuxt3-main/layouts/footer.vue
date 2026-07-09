<template>
  <div>
    <NuxtPage />
    <div class="white-list-footer">
      <nuxt-link
        :to="localePath('/whitelist')"
        class="white-list-footer-item"
        :class="{ active: isActive(localePath('/whitelist')) }">
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.26471 5.76471H14.7353M6.26471 10H14.7353M8.38235 14.2353H12.6176M1.5 10C1.5 3.11765 3.61765 1 10.5 1C17.3824 1 19.5 3.11765 19.5 10C19.5 16.8824 17.3824 19 10.5 19C3.61765 19 1.5 16.8824 1.5 10Z"
            stroke=" #7A74BA"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <div class="white-list-footer-item-title">
          {{ $t("whitelist.footer.whitelist") }}
        </div>
      </nuxt-link>
      <nuxt-link
        :to="localePath('/market')"
        class="white-list-footer-item"
        :class="{ active: isActive(localePath('/market')) }">
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.25 7C20.2501 6.91907 20.2369 6.83868 20.211 6.762L19.123 3.5C18.809 2.55329 18.2046 1.72966 17.3957 1.14619C16.5867 0.56273 15.6144 0.249137 14.617 0.250002H6.383C5.38559 0.249137 4.41329 0.56273 3.60434 1.14619C2.79539 1.72966 2.19096 2.55329 1.877 3.5L0.789 6.763C0.763215 6.83936 0.750043 6.91941 0.75 7C0.753333 7.93908 1.11038 8.84242 1.75 9.53V16C1.75106 16.9942 2.14649 17.9475 2.84952 18.6505C3.55255 19.3535 4.50576 19.7489 5.5 19.75H9.277V16C9.277 15.6685 9.4087 15.3505 9.64312 15.1161C9.87754 14.8817 10.1955 14.75 10.527 14.75C10.8585 14.75 11.1765 14.8817 11.4109 15.1161C11.6453 15.3505 11.777 15.6685 11.777 16V19.75H15.5C16.4942 19.7489 17.4474 19.3535 18.1505 18.6505C18.8535 17.9475 19.2489 16.9942 19.25 16V9.531C19.8898 8.84317 20.2469 7.93942 20.25 7ZM3.3 3.972C3.51521 3.32464 3.9289 2.76154 4.48234 2.36267C5.03577 1.96379 5.70081 1.74942 6.383 1.75H14.617C15.2992 1.74942 15.9642 1.96379 16.5177 2.36267C17.0711 2.76154 17.4848 3.32464 17.7 3.972L18.747 7.113C18.7249 7.69006 18.4791 8.23586 18.0615 8.63476C17.6439 9.03366 17.0875 9.25432 16.51 9.25C16.0215 9.2543 15.5426 9.11423 15.1335 8.84737C14.7243 8.58052 14.403 8.19876 14.21 7.75C14.1581 7.60331 14.0619 7.47638 13.9347 7.38679C13.8075 7.29721 13.6556 7.2494 13.5 7.25C13.3442 7.25044 13.1924 7.29954 13.0658 7.39043C12.9392 7.48133 12.8442 7.60948 12.794 7.757C12.5993 8.20267 12.2789 8.58188 11.872 8.84819C11.4651 9.1145 10.9893 9.25634 10.503 9.25634C10.0167 9.25634 9.54092 9.1145 9.13399 8.84819C8.72707 8.58188 8.40666 8.20267 8.212 7.757C8.16147 7.60851 8.06553 7.47967 7.93776 7.38868C7.80999 7.2977 7.65685 7.24919 7.5 7.25C7.34475 7.24982 7.19327 7.29781 7.06646 7.38737C6.93965 7.47693 6.84375 7.60363 6.792 7.75C6.59898 8.19876 6.27772 8.58052 5.86855 8.84737C5.45937 9.11423 4.98049 9.2543 4.492 9.25C3.91419 9.25484 3.35722 9.03441 2.93922 8.63546C2.52123 8.2365 2.27508 7.69041 2.253 7.113L3.3 3.972ZM15.5 18.25H13.277V16C13.277 15.2707 12.9873 14.5712 12.4715 14.0555C11.9558 13.5397 11.2563 13.25 10.527 13.25C9.79766 13.25 9.09818 13.5397 8.58246 14.0555C8.06673 14.5712 7.777 15.2707 7.777 16V18.25H5.5C4.90343 18.2495 4.33144 18.0122 3.90959 17.5904C3.48775 17.1686 3.25053 16.5966 3.25 16V10.521C3.64706 10.6682 4.06656 10.7457 4.49 10.75C5.05586 10.7468 5.61503 10.6274 6.13282 10.3991C6.6506 10.1708 7.11596 9.8386 7.5 9.423C7.88086 9.84099 8.34475 10.1749 8.86201 10.4034C9.37928 10.6318 9.93853 10.7498 10.504 10.7498C11.0695 10.7498 11.6287 10.6318 12.146 10.4034C12.6633 10.1749 13.1271 9.84099 13.508 9.423C13.8911 9.83762 14.3552 10.1693 14.8715 10.3975C15.3878 10.6258 15.9455 10.7457 16.51 10.75C16.9334 10.7457 17.3529 10.6682 17.75 10.521V16C17.7495 16.5966 17.5122 17.1686 17.0904 17.5904C16.6686 18.0122 16.0966 18.2495 15.5 18.25Z"
            fill="#7A74BA" />
        </svg>
        <div class="white-list-footer-item-title">
          {{ $t("whitelist.footer.market") }}
        </div>
      </nuxt-link>
      <nuxt-link
        :to="localePath('/whitelist/profile')"
        class="white-list-footer-item"
        :class="{ active: isActive(localePath('/whitelist/profile')) }">
        <svg
          width="17"
          height="23"
          viewBox="0 0 17 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.5 1.5C10.9853 1.5 13 3.51471 13 6C13 8.48529 10.9853 10.5 8.5 10.5C6.01471 10.5 4 8.48529 4 6C4 3.51471 6.01471 1.5 8.5 1.5Z"
            stroke="#7A74BA"
            stroke-width="1.5" />
          <path
            d="M6.07129 13.5H10.9287C13.4533 13.5001 15.4999 15.5467 15.5 18.0713C15.5 19.9649 13.9649 21.5 12.0713 21.5H4.92871C3.03517 21.5 1.5 19.9649 1.5 18.0713C1.50006 15.5467 3.54666 13.5001 6.07129 13.5Z"
            stroke="#7A74BA"
            stroke-width="1.5" />
        </svg>
        <div class="white-list-footer-item-title">
          {{ $t("whitelist.footer.verifiedProfile") }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const localePath = useLocalePath();
const isActive = (path: string): boolean => {
  return route.path === path;
};
</script>

<style>
.white-list-footer {
  position: sticky;
  bottom: 0;
  background: #13121b;
  border-top: 1px solid #2b2741;
  padding: 12px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  max-width: 500px;
  margin: 0 auto;
  z-index: 555;
}
.white-list-footer-item {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-decoration: none !important;
  gap: 6px !important;
  text-transform: initial !important;
}
.white-list-footer-item.active .white-list-footer-item-title {
  color: white !important;
}
.white-list-footer-item:nth-child(1).active svg path,
.white-list-footer-item:nth-child(3).active svg path {
  stroke: white;
}
.white-list-footer-item:nth-child(2).active svg path {
  fill: white;
}

.white-list-footer-item-title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0;
  text-align: center;
  color: #7a74ba;
}
</style>
