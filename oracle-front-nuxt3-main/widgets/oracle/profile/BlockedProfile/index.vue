<template>
  <div class="blocked_profile">
    <img src="/avatars/user.svg" alt="User" class="user_avatar" />
    <div class="flex flex-col items-center justify-center gap-4">
      <div class="blocked_user_profile_title">@UserUser</div>
      <div class="blocked_user_profile_description">ID: 321321321</div>
    </div>
    <div class="blocked_body">
      <img
        src="/icons/profile/user-blocked.svg"
        style="width: 64px; margin: 0 auto"
        alt="user" />
      <div class="flex flex-col justify-center items-center gap-12">
        <div class="blocked_body_title">
          {{ $t("whitelist.profile.oracle.blocked.reason") }}
        </div>
        <div class="blocked_body_description">
          {{ $t("whitelist.profile.oracle.blocked.warning") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This component doesn't require any props or logic
</script>

<style scoped>
.blocked_profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-top: 24px;
}
.user_avatar {
  width: 74px;
  height: 74px;
  border-radius: 50%;
  object-fit: contain;
  border: 3px solid black;
}
.blocked_user_profile_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0%;
  color: white;
  text-align: center;
}
.blocked_user_profile_title {
  font-family: Roboto;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
  text-align: center;
}
.blocked_body {
  gap: 24px;
  padding: 80px 16px;
  display: flex;
  flex-direction: column;
}
.blocked_body_title {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
.blocked_body_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  text-align: center;
  color: white;
}
</style>
