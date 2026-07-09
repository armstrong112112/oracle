<template>
  <div class="pay_fees_content">
    <h3>{{ $t("pay.tosFees") }}</h3>
    <div class="fees_list">
      <div class="fee_item">
        <div class="fee_info">
          <div class="fee_title">Комиссия за транзакцию</div>
          <div class="fee_description">
            Базовая комиссия за каждую транзакцию
          </div>
        </div>
        <div class="fee_value">2.5%</div>
      </div>
      <div class="fee_item">
        <div class="fee_info">
          <div class="fee_title">Комиссия за вывод</div>
          <div class="fee_description">Комиссия при выводе средств</div>
        </div>
        <div class="fee_value">$0.30</div>
      </div>
      <div class="fee_item">
        <div class="fee_info">
          <div class="fee_title">Минимальная сумма</div>
          <div class="fee_description">Минимальная сумма для транзакции</div>
        </div>
        <div class="fee_value">$1.00</div>
      </div>
      <div class="fee_item">
        <div class="fee_info">
          <div class="fee_title">Максимальная сумма</div>
          <div class="fee_description">Максимальная сумма за транзакцию</div>
        </div>
        <div class="fee_value">$10,000</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or state needed for this component
</script>

<style lang="scss" scoped>
.pay_fees_content {
  h3 {
    font-family: Hector, sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 120%;
    color: white;
    margin-bottom: 20px;
  }
}

.fees_list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fee_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #13121b;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
}

.fee_info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fee_title {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: white;
}

.fee_description {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #7a74ba;
}

.fee_value {
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  color: #7a74ba;
}
</style>
