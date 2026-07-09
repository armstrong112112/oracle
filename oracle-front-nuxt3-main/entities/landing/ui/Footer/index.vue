<template>
  <footer class="footer flex flex-col">
    <nuxt-link to="/" class="landing_header_logo flex items-center gap-12">
      <img src="/avatars/logo.svg" alt="" />
      <p class="logo_text">Oracle</p>
    </nuxt-link>
    <div class="footer_bottom">
      <div class="footer_links">
        <div class="footer_link">
          <img src="/images/landing/fb.svg" alt="" />
        </div>
        <div class="footer_link">
          <img src="/images/landing/ig.svg" alt="" />
        </div>
        <div class="footer_link">
          <img src="/images/landing/x.svg" alt="" />
        </div>
      </div>
      <div class="copy_texts">
        <span>© 2025 ORACLE</span>
        <br />
        <span>All Rights Reserved</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script logic required
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 32px;
  padding-left: 24px;
}
.footer_bottom {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.footer_links {
  display: flex;
  gap: 15px;
}
.footer_link {
  cursor: pointer;
}
.landing_header_logo img {
  width: 42px;
  height: 42px;
}
.copy_texts {
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0%;
  color: #a7a7a7;
  text-align: start;
}
.logo_text {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 24px;
  line-height: 125%;
  letter-spacing: 3%;
  text-align: center;
  color: #ffffff;
}
.landing_header_button {
  width: 140px;
  height: 44px;
  border-radius: 14px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #f64e2a;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
@media (min-width: 768px) {
  .footer {
    gap: 10px;
    padding-top: 24px;
    padding-right: 38px;
    padding-bottom: 48px;
    padding-left: 38px;
  }
  .footer_bottom {
    margin-top: 69px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .copy_texts {
    text-align: right;
  }
}

@media (min-width: 1200px) {
  .footer {
    padding-top: 24px;
    padding-right: 84px;
    padding-bottom: 252px;
    padding-left: 84px;
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: center;
  }
  .footer_bottom {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .copy_texts {
    text-align: right;
  }
}
</style>
