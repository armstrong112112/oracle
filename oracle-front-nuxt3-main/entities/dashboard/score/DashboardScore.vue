<template>
  <div class="flex flex-col items-start justify-between h-full">
    <div class="flex flex-col gap-16">
      <div class="your-transactions__head">
        <nuxt-link to="#" class="your-transactions__link">
          Score
          <div class="icon">
            <ArrowIcon />
          </div>
        </nuxt-link>
      </div>
      <div class="score_body flex flex-col gap-12">
        <!-- <img src="/icons/dashboard/monkey.svg" style="width: 76px" alt="" /> -->
        <img src="/svg/CrestInitiate.svg" alt="crest initiate" class="score_body_image" />
        <div class="score_body_title">
          <div>Crest Initiate</div>
        </div>
        <!-- <div class="flex flex-col gap-4">
          <div class="score_body_title">Sparkle monkey</div>
          <div class="score_body_description">
            Flashing your shine, swinging to the top.
          </div>
        </div> -->
      </div>
    </div>
    <div class="flex flex-col gap-8 w-full items-start">
      <div class="score_counter flex items-start justify-center gap-4">
        <div class="score_number">1,000</div>
        <div class="score_text">more XP to Next LVL</div>
        <!-- <div class="score_number">595</div>
        <div class="score_text">score</div>
        <div class="score_number">/</div>
        <div class="score_number">595</div>
        <div class="score_text">score</div> -->
      </div>
      <div class="score_range w-full">
        <div class="score_range_indicator"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from "@/assets/svg/arrow-left.svg?component";

const localePath = useLocalePath();
</script>

<style lang="scss" scoped>
.score_body_title {
  font-family: Hector;
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  color: #ffffff;
}

.score_body_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: #ffffff;
}

.score_number {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: white;
}

.score_text {
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: #8780cf;
}

.score_range {
  height: 4px;
  border-radius: 10px;
  background: #2C2A3D;
  position: relative;
}

.score_range_indicator {
  position: absolute;
  background: #FFFFFF;
  border-radius: 10px;
  width: 90%;
  left: 0;
  top: 0;
  bottom: 0;
}

.score_body_title {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 145%;
}

.score_body_image {
  max-width: 55px;
  width: 100%;
  height: 77px;
}
</style>
