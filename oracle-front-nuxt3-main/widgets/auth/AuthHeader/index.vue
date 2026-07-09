<template>
  <div class="auth_header">
    <img src="/avatars/logo.svg" alt="" />
    <div class="auth_header_title">Oracle</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.auth_header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  height: 224px;
  position: relative;
}
.auth_header_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
  text-align: center;
}
.auth_header_left_radial {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 206px;
  height: 147px;
  top: 0;
  left: -72px;
}
.auth_header_right_radial {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 206px;
  height: 147px;
  bottom: 0;
  right: -72px;
}
</style>
