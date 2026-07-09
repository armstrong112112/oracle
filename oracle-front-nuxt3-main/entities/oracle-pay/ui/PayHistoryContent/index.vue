<template>
  <div class="pay_history_content">
    <h3>{{ $t("pay.depositsHistory") }}</h3>
    <div class="history_list">
      <!-- Здесь будет список истории депозитов -->
      <div class="history_item">
        <div class="history_info">
          <div class="history_amount">+$1,250.00</div>
          <div class="history_date">2024-01-15 14:30</div>
        </div>
        <div class="history_status success">Успешно</div>
      </div>
      <div class="history_item">
        <div class="history_info">
          <div class="history_amount">+$850.00</div>
          <div class="history_date">2024-01-14 09:15</div>
        </div>
        <div class="history_status success">Успешно</div>
      </div>
      <div class="history_item">
        <div class="history_info">
          <div class="history_amount">+$2,100.00</div>
          <div class="history_date">2024-01-13 16:45</div>
        </div>
        <div class="history_status success">Успешно</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.pay_history_content {
  h3 {
    font-family: Hector, sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 120%;
    color: white;
    margin-bottom: 20px;
  }
}

.history_list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #13121b;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
}

.history_info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.history_amount {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: white;
}

.history_date {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #7a74ba;
}

.history_status {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  padding: 4px 8px;
  border-radius: 6px;

  &.success {
    color: #10b981;
    background: rgba(16, 185, 129, 0.1);
  }
}
</style>
