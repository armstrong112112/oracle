<template>
  <div class="phones">
    <div class="phone_card">
      <div class="phone_card_title">WhiteList</div>
      <div class="phone_card_text">
        Miss the Oracle Whitelist? So did everyone else—our DMs lit up every
        single day while it was on pause. Now it's back and meaner than ever.
        <br />
        <br />
        We ditched the dead weight, kept the vendors who actually showed up, and
        smoothed out the whole experience. A tighter, cleaner lineup of top-tier
        providers for whatever you need, all in one place.
      </div>
      <img src="/images/phones/whitelist.png" alt="" />
    </div>
    <div class="phone_card">
      <div class="phone_card_title">Market</div>
      <div class="phone_card_text">
        Same old, same good—everything we ran on Telegram is back. One post a
        day, spotlighting our day-one vendors and the hottest fresh blood in the
        game.
      </div>
      <img src="/images/phones/market.png" alt="" />
    </div>
    <div class="phone_card">
      <div class="phone_card_title">Profile</div>
      <div class="phone_card_text">
        The market's top verified vendor profiles—all in one spot. Every vendor
        comes with reviews, deal history, stats, links, and hard proofs, so you
        see the full picture at a glance. Grab the best vendors and get moving.
      </div>
      <img src="/images/phones/profile.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Presentational component; no script needed
</script>

<style lang="scss">
.phones {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 48px 16px;
}

.phone_card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 38px;
  padding: 38px 24px;
  border-radius: 24px;
  background: #0e0e11;
  position: relative;
  overflow: hidden;
  height: 662px;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    box-shadow: 0px -30px 13.5px 0px #0a0a0ae5 inset;
    z-index: 10;
  }
}

.phone_card_title {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #ffffff;
  text-align: center;
  z-index: 2;
}

.phone_card_text {
  text-align: center;
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #ffffff;
  opacity: 1;
  max-width: 368px;
  margin: 0 auto;
  z-index: 1;
}

.phone_card img {
  width: 293px;
  z-index: 2;
  margin-bottom: -100px;
}
@media (max-width: 768px) {
  .phone_card_text br {
    display: none;
  }
}
@media (min-width: 768px) {
  .phones {
    padding: 48px 38px;
  }
  .phone_card img {
    width: 293px;
    z-index: 2;
    margin-bottom: -100px;
  }
}

@media (min-width: 1200px) {
  .phones {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 48px 84px;
  }

  .phone_card {
    height: 632px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .phone_card_text {
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease;
    position: absolute;
    top: 100px;
    left: 24px;
    right: 24px;
  }

  .phone_card img {
    transition: transform 0.3s ease;
    margin: 0;
  }

  .phone_card:hover {
    .phone_card_text {
      opacity: 1;
      transform: translateY(0);
    }

    img {
      transform: translateY(180px);
    }
  }
}
</style>
