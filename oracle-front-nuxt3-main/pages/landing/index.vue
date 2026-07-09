<template>
  <div class="home" style="overflow-x: hidden">
    <Hero />
    <Finance />
    <Slides />
    <Phones />
    <OracleGram />
    <OracleShop />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Finance from '~/entities/landing/ui/Finance/index.vue'
import Hero from '~/entities/landing/ui/Hero/index.vue'
import OracleGram from '~/entities/landing/ui/OracleGram/index.vue'
import OracleShop from '~/entities/landing/ui/OracleShop/index.vue'
import Phones from '~/entities/landing/ui/Phones/index.vue'
import Slides from '~/entities/landing/ui/Slides/index.vue'
import Footer from '~/entities/landing/ui/Footer/index.vue'

// No state or lifecycle logic needed here. Components are imported and used in the template.
</script>
<style>
.finance {
  padding: 0 16px;
  gap: 32px;
  display: flex;
  flex-direction: column-reverse;
}
.finance_reverse {
  flex-direction: column;
}

.finance_right img {
  /* max-width: 343px; */
  width: 100%;
}

.finance_left {
  display: flex;
  flex-direction: column;

  gap: 48px;
  max-width: 534px;
}
.finance_title {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #ffffff;
}
.finance_text {
  font-family: Roboto;
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #ffffff;
}
.finance_status {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}
.finance_status_text {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #ffffff;
}
.next_steps {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 18px;
  line-height: 125%;
  letter-spacing: 0%;
  vertical-align: middle;
  text-transform: uppercase;
  color: #ffffff;
}
.next_steps_text {
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: white;
}
@media (min-width: 768px) {
  .finance {
    display: flex;
    flex-direction: column-reverse;
    padding: 0 38px;
  }
  .finance_reverse {
    flex-direction: column;
  }
  .finance_right img {
    max-width: 682px;
  }
}

@media (min-width: 1200px) {
  .finance {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-right: 84px;
    padding-left: 84px;
  }
  .finance_left {
    padding-top: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
  }
}
</style>
