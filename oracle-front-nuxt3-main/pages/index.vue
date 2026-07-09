<template>
  <div>
    <div class="notification">
      <div style="
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 12px;
          align-items: flex-start;
          justify-content: flex-start;
        ">
        <NuxtLink class="notification-title" :to="localePath('/casino/game-history')">Game History ✅</NuxtLink>
        <NuxtLink class="notification-title" :to="localePath('/casino/statistics')">Statistics ✅</NuxtLink>
        <NuxtLink class="notification-title" :to="localePath('/casino/achievments')">Achievments ✅</NuxtLink>
        <NuxtLink class="notification-title" :to="localePath('/casino')">Casino ✅</NuxtLink>


        <NuxtLink class="notification-title" :to="localePath('/notifications')">notifications ✅</NuxtLink>
        <NuxtLink class="notification-title pages_href_title" :to="localePath('/market')">Oracle’s market</NuxtLink>
        <NuxtLink class="notification-title pages_href_title" :to="localePath('/whitelist/verification')">whitelist
          verification ✅</NuxtLink>
        <NuxtLink class="notification-title pages_href_title" :to="localePath('/whitelist/tracking')">Verification
          Tracking</NuxtLink>

        <NuxtLink class="notification-title pages_href_title" :to="localePath('/whitelist/verdict')">VERIFICATION
          VERDICT ✅</NuxtLink>

        <NuxtLink class="notification-title pages_href_title" :to="localePath('/oracle-pay')">oracle pay ✅</NuxtLink>

        <NuxtLink class="notification-title" :to="localePath('/whitelist/creation')">New listing creation ✅</NuxtLink>

        <NuxtLink class="notification-title" :to="localePath('/whitelist/profile')">WhiteList Profile ✅</NuxtLink>

        <nuxt-link class="notification-title pages_href_title" :to="localePath('/whitelist')">WhiteList ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/auth/sign-in')">
          Sign In ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/mixing')">Mixing ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/prepaid-cards')">
          Mixing Prepaid Cards ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/prepaid-cards')">
          Mixing Add Cards ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/bills')">
          Bills ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/oracle/my-profile')">
          my profile ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/oracle/user-profile')">
          user profile ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/oracle/blocked-user')">
          Blocked User ✅
        </nuxt-link>

        <nuxt-link class="notification-title pages_href_title" :to="localePath('/escrow/create')">
          Escrow Create ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/escrow/dispute')">
          Escrow Dispute ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/escrow/dispute/creation')">
          Escrow Dispute Creation ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/escrow/dispute/creation')">
          Escrow Dispute Creation ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/escrow/deal/12')">
          Escrow Deal #23232132 ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/escrow/active-deals')">
          Active Deals ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/escrow/modals')">
          Modals UI KIT✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/landing')">
          Landing
        </nuxt-link>

        <nuxt-link class="notification-title pages_href_title" :to="localePath('/p2p/profile')">
          P2P Profile
        </nuxt-link>

        <nuxt-link class="notification-title pages_href_title" :to="localePath('/p2p/dispute/creation')">
          P2P Dispute creation
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/p2p/dispute')">
          P2P Dispute
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/blackList')">
          Black List
        </nuxt-link>

        <div class="notification-title pages_href_title">
          ============= BEKXXON =======
        </div>
        <!-- <nuxt-link
          class="notification-title pages_href_title"
          :to="localePath('/chat-settings')">
          Chat Settings ✅
        </nuxt-link> -->
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/dashboard/payment')">
          Dashboard payment ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/history')">
          History ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/swap')">
          SWAP ✅
        </nuxt-link>
        <div class="notification-title pages_href_title">
          ============= BOTIR =======
        </div>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/checks')">
          CHECKS ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/transfer/external-transfer')">
          TRANSFER ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/moresettings')">
          MORE SETTINGS ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/dashboard/')">
          Dashboard ✅
        </nuxt-link>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/dashboard/oracle-profile')">
          Dashboard oracle profile ✅
        </nuxt-link>
        <div class="notification-title pages_href_title">
          ============= MUKHAMMADAMIN =======
        </div>
        <nuxt-link class="notification-title pages_href_title" :to="localePath('/shops')">
          SHOPS ✅
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
definePageMeta({
  layout: "sidebar",
});
</script>

<style lang="scss">
.pages_href_title {
  text-align: left !important;
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
}
</style>
