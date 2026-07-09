<template>
  <div class="crypto-offer-card">
    <!-- Header section with user info and stats -->
    <div class="crypto-offer-card__header">
      <div v-if="!props.isMyOffer" class="crypto-offer-card__user-info">
        <Badge
          dot
          bg-color="#31F62A"
          location="bottom-end"
          :offset-x="-1"
          :offset-y="-1"
          bordered
          border-color="#000"
          border-size="1px"
        >
          <custom-avatar
            :avatar="props.offer.user.avatar"
            class="crypto-offer-card__avatar"
            :size="28"
            :is-name-visible="false"
            :name="props.offer.user.name"
          />
        </Badge>
        <div class="crypto-offer-card__user-details">
          <span class="crypto-offer-card__username">{{
            props.offer.user.username
          }}</span>
          <span v-if="props.offer.verified" class="crypto-offer-card__verified"
            >Verified</span
          >
        </div>
      </div>
      <div
        v-else
        class="crypto-offer-card__user-info crypto-offer-card__user-info--my-offer"
      >
        {{ props.offer.fiat }} TO {{ props.offer.crypto }}
      </div>

      <div v-if="!props.isMyOffer" class="crypto-offer-card__stats">
        <span class="crypto-offer-card__trade-count"
          >Trade(s) {{ props.offer.tradeCounts }}</span
        >
        <div class="crypto-offer-card__separator"></div>
        <div class="crypto-offer-card__rating">
          <likeIcon class="crypto-offer-card__rating-icon" />
          <span>{{ props.offer.likePercentage }}%</span>
          <StarIcon
            v-if="props.offer.isFavorite"
            class="crypto-offer-card__favorite-icon"
          />
        </div>
      </div>
      <div
        v-else
        class="crypto-offer-card__user-info crypto-offer-card__stats--my-offer"
      >
        <div class="crypto-offer-card__user-info-edit">
          <editIcon class="crypto-offer-card__edit-icon" @click="handleEdit" />
        </div>
      </div>
    </div>

    <!-- Offer details section -->
    <div class="crypto-offer-card__offer-details">
      <div class="crypto-offer-card__price">
        $ {{ formatPrice(offer.limitFiat / offer.limit) }}
        <span class="crypto-offer-card__currency">/ {{ offer.crypto }}</span>
      </div>

      <div class="crypto-offer-card__limit">
        Limit {{ formatCurrency(offer.limitFiat) }} -
        {{ formatCurrency(offer.limitFiat * 33) }} {{ offer.fiat }}
      </div>

      <div class="crypto-offer-card__available">
        Available
        <span class="crypto-offer-card__available-amount"
          >{{ formatCrypto(offer.available) }} {{ offer.crypto }}</span
        >
      </div>
    </div>

    <!-- Footer section with payment methods and action button -->
    <div class="crypto-offer-card__footer">
      <div class="crypto-offer-card__payment-methods">
        <span
          v-for="method in props.offer.paymentMethods"
          :key="method.value"
          class="crypto-offer-card__payment-method"
        >
          {{ method.title }}
        </span>
      </div>

      <new-oracle-button
        v-if="!props.isMyOffer"
        :text="props.offer.type === 'buy' ? 'Buy Crypto' : 'Sell Crypto'"
        color="yellow"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import editIcon from '~/assets/svg/edit.svg?component'
import likeIcon from '~/assets/svg/like.svg?component'
import StarIcon from '~/assets/svg/Star.svg?component'
import CustomAvatar from '~/components/custom-avatar.vue'
import type { CryptoOffer } from '~/entities/p2p/model/cryptoOffer'
import Badge from '~/components/ui/Badge.vue'

interface Props {
  offer: CryptoOffer;
  isMyOffer: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [offer: CryptoOffer];
  edit: [offer: CryptoOffer];
}>();

// Methods
const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatCrypto = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
};

const handleClick = (): void => {
  emit('click', props.offer);
};

const handleEdit = (): void => {
  emit('edit', props.offer);
};
</script>

<style lang="scss" scoped>
.crypto-offer-card {
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__user-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &__user-info--my-offer {
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    width: 100%;
  }

  &__stats--my-offer {
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    width: 100%;
    justify-content: end;
  }

  &__user-info-edit {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #201f27;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background: #33323a;
    }
  }
  &__edit-icon {
    width: 12px;
    height: 12px;
  }

  &__avatar {
    flex-shrink: 0;
    min-width: 0;
  }

  &__user-details {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  &__username {
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
  }

  &__verified {
    color: #f64e2a;
    font-size: 12px;
    font-weight: 500;
  }

  &__stats {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #8780cf;
    font-size: 14px;
  }

  &__separator {
    width: 1px;
    height: 16px;
    background: #8780cf;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #8780cf;
  }

  &__rating-icon {
    width: 16px;
    height: 16px;
    margin: 0 -4px;
  }

  &__favorite-icon {
    width: 16px;
    height: 16px;
    margin: 0 0 0 4px;
  }

  &__offer-details {
    margin-bottom: 20px;
  }

  &__price {
    color: #ffffff;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 1.2;
  }
  &__currency {
    color: #8780cf;
    font-size: 14px;
    margin-bottom: 4px;
  }

  &__limit,
  &__available {
    color: #8780cf;
    font-size: 14px;
    margin-bottom: 4px;
  }

  &__available-amount {
    color: #ffffff;
    font-weight: 500;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__payment-methods {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 60%;
  }

  &__payment-method {
    color: #bfb7ff;
    font-size: 12px;
    font-weight: 500;
  }

  :deep(.user-item) {
    gap: 8px;

    &.horizontal {
      flex-direction: row;
      align-items: center;
    }
  }

  :deep(.user-name) {
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    margin: 0;

    &.name-right {
      margin-left: 8px;
    }
  }

  :deep(.new-oracle-button) {
    min-width: 120px;
    max-width: 150px;
    font-size: 14px;
    padding: 10px 16px;
  }
}
</style>
