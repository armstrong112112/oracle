<template>
  <div class="bills_creation">
    <div class="form-parent">
      <div class="the-input">
        <input
          v-model="dueDate"
          type="text"
          :placeholder="$t('bills.dueDate')" />
        <img src="/icons/bills/calendar.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dueDate = ref("");
</script>
<style lang="scss" scoped>
.form-parent {
  display: flex;
  flex-direction: column;
  gap: 4px;
  .form-label {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0;
    color: white;
  }
  .the-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 12px;
    gap: 10px;
    padding: 11px 12px;
    background: #13121b;
    input {
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      letter-spacing: 0;
      color: white;
      width: 100%;
      background: transparent;
      border: 0;
      outline: none;
    }
    input::placeholder {
      color: #67639a;
    }

    img {
      cursor: pointer;
    }
  }
}
</style>
