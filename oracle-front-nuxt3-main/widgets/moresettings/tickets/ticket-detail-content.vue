<template>
  <div class="ticket-detail">
    <div class="main-container">
      <block-nav-back
        v-if="!isModal"
        :add="true"
        :to="localePath('/moresettings/tickets')"
        :text="$t('moreSettings.ticket') + ' #' + ticket?.id"
      />
      <div class="ticket-detail__meta">
        <div class="ticket-detail__info">
          <span class="ticket-detail__label">{{
            $t('moreSettings.created')
          }}</span>
          <time class="ticket-detail__date">Apr 12, 2025</time>
        </div>

        <div class="ticket-detail__info">
          <span class="ticket-detail__label">
            {{
              ticket?.status === 'Closed'
                ? $t('moreSettings.closedOn')
                : $t('moreSettings.lastUpdate')
            }}
          </span>
          <time class="ticket-detail__date"> Apr 12, 2025 </time>
        </div>
        <span
          class="ticket-detail__status"
          :class="{
            'ticket-detail__status--active': ticket?.status === 'Active',
            'ticket-detail__status--closed': ticket?.status === 'Closed',
          }"
        >
          {{
            $t(
              ticket?.status === 'Active'
                ? 'moreSettings.active'
                : 'moreSettings.closed',
            )
          }}
        </span>
      </div>

      <div class="ticket-detail__section">
        <h3 class="ticket-detail__section-title">
          {{ $t('moreSettings.yourRequest') }}
        </h3>
        <p class="ticket-detail__section-text">
          Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt
          huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån.
          Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt.
        </p>
      </div>

      <div class="ticket-detail__section">
        <h3 class="ticket-detail__section-title">
          {{
            ticket?.status === 'Closed'
              ? $t('moreSettings.supportDecision')
              : $t('moreSettings.requiredActions')
          }}
        </h3>
        <p class="ticket-detail__section-text">
          Lörem ipsum dekagönes patesade, pys tinde. Fest virad jude pogt
          huruvida bepreliga kroheten orad. Posere mirev ifall karibel bån.
          Multirylogi pokare, oaktat prejyskap är nyling i båna lasamma abelt.
        </p>
      </div>

      <div class="ticket-detail__footer">
        <new-oracle-button
          v-if="ticket?.status === 'Closed'"
          :text="$t('moreSettings.reopenTicket')"
        />
        <new-oracle-button
          :text="$t('moreSettings.chatWithSupport')"
          color="yellow"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Ticket {
  id: string
  title: string
  time: string
  status: string
}

interface Props {
  ticket: Ticket | null
  isModal?: boolean
}

withDefaults(defineProps<Props>(), {
  isModal: false,
})
</script>

<style lang="scss">
.ticket-detail {
  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 24px;
    @media (min-width: 1024px) {
      max-width: 100%;
      padding: 0;
      min-height: auto;
    }
  }
  &__meta {
    display: flex;
    flex-wrap: wrap;
    row-gap: 12px;
    margin-bottom: 24px;
  }
  &__info {
    flex: 1 1 50%;
  }
  &__label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #7a74ba;
  }
  &__date {
    display: block;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #fff;
  }
  &__status {
    padding: 5.5px 10px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 145%;
    &--active {
      background: #31f62a;
      color: #000;
    }
    &--closed {
      background: #292929;
      color: #f2ff00;
    }
  }
  &__section {
    width: calc(100% + 32px);
    margin-left: -16px;
    border-bottom: 1px solid #2b2741;
    padding: 12px 16px;
    &:nth-child(4) {
      border-bottom: 0;
    }
    &-title {
      margin-bottom: 5px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-text {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 12px;
      line-height: 140%;
      color: #fff;
    }
  }
  &__footer {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 8px;
    padding: 0 4px;
    .new-oracle-button {
      line-height: 22px;
      padding: 11px 0;
    }
    @media (min-width: 1024px) {
      flex-direction: row;
      justify-content: space-between;
      padding-top: 24px;
    }
  }
}
</style> 