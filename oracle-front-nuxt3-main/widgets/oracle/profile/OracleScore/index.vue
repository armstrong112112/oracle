<template>
  <div class="flex flex-col gap-12 py-16">
    <div class="oracle_profile_title">
      {{ $t("whitelist.profile.oracle.score.title") }}
    </div>
    <div class="oracle_profile_card">
      <img src="/icons/oracle-profile/score.png" alt="" />
      <div class="flex flex-col gap-8">
        <div class="oracle_profile_card_title">
          {{ $t("whitelist.profile.oracle.score.card", { score: 123 }) }}
        </div>
        <div class="flex flex-col">
          <div class="oracle_profile_card_description">
            {{
              $t("whitelist.profile.oracle.score.gained", { points: "+ 15" })
            }}
          </div>
          <div class="oracle_profile_card_description">
            {{ $t("whitelist.profile.oracle.score.lost", { points: "- 15" }) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: undefined,
});
</script>

<style scoped>
.oracle_profile_title {
  font-family: Hector, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0;
  color: white;
}
.oracle_profile_card {
  border: 1px solid #1a1728;
  gap: 24px;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.oracle_profile_card img {
  width: 76px;
  height: 76px;
  border-right: 6px;
}
.oracle_profile_card_title {
  font-family: Hector, Roboto;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  color: white;
}
.oracle_profile_card_description {
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0%;
  color: white;
}
</style>
