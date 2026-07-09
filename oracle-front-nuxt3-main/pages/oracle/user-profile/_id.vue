<template>
  <div>
    <div class="profile">
      <div class="profile-nav">
        <div class="profile-nav-back">
          <ArrowBackIcon
            class="profile-nav-back-arrow"
            @click="router.back()" />
          ORACLE VERIFIED Profile
        </div>
        <div class="profile-nav-burger">
          <BurgerIcon />
        </div>
      </div>
      <div class="profile-card">
        <div class="profile-card-photo">
          <img src="/assets/svg/user-image.png" alt="" />
          <div class="profile-card-rating">
            <div class="green">{{ getProfile.rating }}</div>
            /5
          </div>
          <div class="profile-card-reviews">
            <div class="positive">(489+</div>
            /
            <div class="negative">11-)</div>
          </div>
        </div>

        <div class="profile-card-info">
          <div class="profile-card-username">@{{ getProfile.username }}</div>
          <div class="profile-card-userid">ID: {{ getProfile.id }}</div>
          <div class="profile-card-since">
            Oracle Member Since
            <div class="date">
              {{ formatDate(getProfile.oracleMemberSince) }}
            </div>
          </div>
          <div class="profile-card-verifed">
            Oracle Verified Since
            <div class="date">{{ formatDate(getProfile.verifiedSince) }}</div>
          </div>
          <div class="profile-card-until">
            Oracle Verified Until
            <div class="date">{{ formatDate(getProfile.verifiedUntil) }}</div>
          </div>
        </div>
      </div>
      <OrangeBlockModule
        :title="`$ ${getProfile.deposit} deposit`"
        link-text="Check Oracle’s Verification Verdict" />
      <ButtonOracle text="Check oracle profile" />
      <div class="profile-verified-for">
        <BlockTitleOracle text="Verified for:" />
        <div class="profile-verified-for-items">
          <div
            v-for="category of getProfile.categories"
            :key="category.name"
            class="profile-verified-for-item">
            {{ category.name }}
          </div>
        </div>
      </div>
      <div class="profile-reviews">
        <div class="profile-reviews-title">
          <div class="profile-reviews-title-left">
            <BlockTitleOracle text="Reviews" />
            <span class="profile-reviews-title-left-point"></span>
            <span class="profile-reviews-title-left-count">Total (105)</span>
          </div>
          <div class="profile-reviews-title-right">
            General score:
            <span class="profile-reviews-title-right-score"
              >{{ getProfile.rating }}/5</span
            >
          </div>
        </div>
        <div class="profile-reviews-items">
          <div class="profile-reviews-item">
            <div class="profile-reviews-item-img">
              <img src="/assets/svg/p2p.png" alt="" />
            </div>
            <span class="profile-reviews-item-title">P2P</span>
          </div>
          <div class="profile-reviews-item">
            <div class="profile-reviews-item-img">
              <img src="/assets/svg/escrow.png" alt="" />
            </div>
            <span class="profile-reviews-item-title">Escrow</span>
          </div>
          <div class="profile-reviews-item">
            <div class="profile-reviews-item-img">
              <img src="/assets/svg/shops.png" alt="" />
            </div>
            <span class="profile-reviews-item-title">Shops</span>
          </div>
        </div>
      </div>
      <ButtonOracle text="Contact seller" />
      <ButtonOracle text="offer escrow deal" />
      <div class="profile-currencies">
        <BlockTitleOracle text="p2p Market Listings of this Seller" />
        <div class="profile-currencies-scroll">
          <div class="profile-currencies-scroll-item">
            <div class="profile-currencies-scroll-item-col">
              <BtcIcon class="profile-currencies-scroll-item-col-icon" />
            </div>
            <div class="profile-currencies-scroll-item-col">
              <div class="profile-currencies-scroll-item-title">BTC/USD</div>
              <div class="profile-currencies-scroll-item-amount">
                1.000.000$
              </div>
              <div class="profile-currencies-scroll-item-desc">
                BTC to Venmo
              </div>
            </div>
          </div>
          <div class="profile-currencies-scroll-item">
            <div class="profile-currencies-scroll-item-col">
              <BtcIcon class="profile-currencies-scroll-item-col-icon" />
            </div>
            <div class="profile-currencies-scroll-item-col">
              <div class="profile-currencies-scroll-item-title">BTC/USD</div>
              <div class="profile-currencies-scroll-item-amount">
                1.000.000$
              </div>
              <div class="profile-currencies-scroll-item-desc">
                BTC to Venmo
              </div>
            </div>
          </div>
          <div class="profile-currencies-scroll-item">
            <div class="profile-currencies-scroll-item-col">
              <BtcIcon class="profile-currencies-scroll-item-col-icon" />
            </div>
            <div class="profile-currencies-scroll-item-col">
              <div class="profile-currencies-scroll-item-title">BTC/USD</div>
              <div class="profile-currencies-scroll-item-amount">
                1.000.000$
              </div>
              <div class="profile-currencies-scroll-item-desc">
                BTC to Venmo
              </div>
            </div>
          </div>
          <div class="profile-currencies-scroll-item">
            <div class="profile-currencies-scroll-item-col">
              <BtcIcon class="profile-currencies-scroll-item-col-icon" />
            </div>
            <div class="profile-currencies-scroll-item-col">
              <div class="profile-currencies-scroll-item-title">BTC/USD</div>
              <div class="profile-currencies-scroll-item-amount">
                1.000.000$
              </div>
              <div class="profile-currencies-scroll-item-desc">
                BTC to Venmo
              </div>
            </div>
          </div>
          <div class="profile-currencies-scroll-item">
            <div class="profile-currencies-scroll-item-col">
              <BtcIcon class="profile-currencies-scroll-item-col-icon" />
            </div>
            <div class="profile-currencies-scroll-item-col">
              <div class="profile-currencies-scroll-item-title">BTC/USD</div>
              <div class="profile-currencies-scroll-item-amount">
                1.000.000$
              </div>
              <div class="profile-currencies-scroll-item-desc">
                BTC to Venmo
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-contacts">
        <BlockTitleOracle text="Contacts" />
        <div class="profile-contacts-items">
          <div
            v-for="contact of getProfile.links"
            :key="contact.title"
            class="profile-contacts-item">
            <InputOracle
              :label="contact.name"
              :v="contact.link"
              :readonly="true" />
          </div>
        </div>
      </div>
      <div class="profile-description">
        <BlockTitleOracle text="description" />
        <OrangeBlockModule :text="getProfile.description" />
      </div>
      <ButtonOracle text="Oracle’s market" color="orange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import ArrowBackIcon from "~/assets/svg/arrow-back.svg?component";
import BtcIcon from "~/assets/svg/btc.svg?component";
import BurgerIcon from "~/assets/svg/burger-menu.svg?component";
import BlockTitleOracle from "~/components/block-title-oracle.vue";
import ButtonOracle from "~/components/button-oracle.vue";
import InputOracle from "~/components/input-oracle.vue";
import OrangeBlockModule from "~/components/orange-block-module.vue";
import { formattedDate } from "~/helpers";
import { useProfileStore } from "~/store/profile";
import { useI18n } from "vue-i18n";

definePageMeta({
  layout: "mobile",
});

interface Profile {
  id: number;
  username: string;
  rating: number;
  deposit: number;
  oracleMemberSince: Date;
  verifiedSince: Date;
  verifiedUntil: Date;
  categories: Array<{ name: string }>;
  links: Array<{ name: string; link: string; title?: string }>;
  description: string;
}

const route = useRoute();
const router = useRouter();
const profileStore = useProfileStore();
const { locale } = useI18n();

const fallbackProfile: Profile = {
  id: 0,
  username: "",
  rating: 0,
  deposit: 0,
  oracleMemberSince: new Date(0),
  verifiedSince: new Date(0),
  verifiedUntil: new Date(0),
  categories: [],
  links: [],
  description: "",
};

const getProfile = computed(() => (profileStore.getProfile as unknown as Profile | null) ?? fallbackProfile);

const formatDate = (d: Date) => {
  return formattedDate(d, locale.value);
};

const contacts = [
  { title: "Telegram", pl: "Your TG contact" },
  { title: "Matrix", pl: "Your Matrix contact" },
  { title: "Signal", pl: "Your TG contact" },
  { title: "WhatsApp", pl: "Your TG contact" },
];

onMounted(() => {
  const id = Number(route.params.id);
  profileStore.fetchProfile(id);
});
</script>

<style lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  gap: 28px;

  &-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;

    &-back {
      display: flex;
      gap: 10px;
      align-items: end;
      font-family: "Hanson";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 11px;
      text-transform: uppercase;

      &-arrow {
        cursor: pointer;
      }
    }
  }

  &-verified-for {
    &-items {
      display: flex;
      flex-wrap: wrap;
      padding-top: 16px;
      gap: 8px;
    }

    &-item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-family: "Reza Zulmi Alfaizi Sans";
      font-size: 12px;
      line-height: 140%;
      padding: 8px 10px;
      background: #1d1d29;
      border-radius: 8px;
    }
  }

  &-card {
    display: flex;
    gap: 16px;

    &-photo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      position: relative;
      width: 79px;
      height: 79px;
      background: #121119;
      border-radius: 100px;
    }

    &-reviews {
      display: flex;
      gap: 4px;
      font-family: "Reza Zulmi Alfaizi Sans";
      font-size: 12px;
      line-height: 15px;

      .positive {
        color: #00bd06;
      }

      .negative {
        color: #f64e2a;
      }
    }

    &-rating {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 6px 7px 6px 6px;
      gap: 2px;
      position: absolute;
      left: calc(50%);
      transform: translate(-50%, 50%);
      bottom: 0;
      background: #363441;
      border: 3px solid #0a090f;
      border-radius: 100px;
      font-family: "Reza Zulmi Alfaizi Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      flex: none;
      order: 0;
      flex-grow: 0;

      .green {
        color: #00bd06;
      }
    }

    &-username {
      font-family: "Kenyan Coffee";
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
    }

    &-userid {
      font-family: "Reza Zulmi Alfaizi Sans";
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 12px;
    }

    &-since,
    &-verifed,
    &-until {
      display: flex;
      gap: 10px;
      font-family: "Reza Zulmi Alfaizi Sans";
      font-size: 14px;
      line-height: 140%;
      color: rgba(255, 255, 255, 0.4);

      .date {
        color: #fff;
        text-decoration: underline;
      }
    }
  }

  &-reviews {
    &-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0px;
      gap: 8px;

      &-left {
        display: inline-block;

        &-point {
          display: inline-block;
          width: 3px;
          height: 3px;
          background: #ffffff;
          border-radius: 50%;
          margin: 2% 0;
        }

        &-count {
          font-family: "Reza Zulmi Alfaizi Sans";
          font-size: 14px;
          line-height: 160%;
          color: rgba(255, 255, 255, 0.5);
        }
      }

      &-right {
        font-family: "Reza Zulmi Alfaizi Sans";
        font-size: 14px;
        line-height: 160%;
        color: rgba(255, 255, 255, 0.5);

        &-score {
          font-family: "Reza Zulmi Alfaizi Sans";
          color: #fff;
        }
      }
    }

    &-items {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;

      &-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 109px;
        height: 60px;
        background: #1d1d29;
        border-radius: 10px;
      }

      &-title {
        font-family: "Kenyan Coffee";
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #ffffff;
      }
    }
  }

  &-contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    &-items {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 13px;
      width: 100%;
    }

    &-item {
      width: 100%;
    }
  }

  &-currencies {
    display: flex;
    flex-direction: column;
    gap: 14px;

    &-scroll {
      display: flex;
      gap: 10px;
      overflow: auto;

      &-item {
        display: grid;
        grid-template-columns: 70px min(100px);
        gap: 12px;
        box-sizing: border-box;

        min-width: 189px;
        height: 74px;

        border: 1px solid #18171c;
        border-radius: 12px;

        flex: none;
        order: 0;
        flex-grow: 0;

        &-title {
          font-family: "Hanson";
          font-style: normal;
          font-weight: 700;
          font-size: 12px;
          line-height: 12px;
        }

        &-amount {
          font-family: "Reza Zulmi Alfaizi Sans";
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
        }

        &-desc {
          font-family: "Reza Zulmi Alfaizi Sans";
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          color: rgba(255, 255, 255, 0.6);
        }

        &-col {
          &-icon {
            background: #fff;
            padding: 6px 9px;
            border-radius: 50%;
          }

          &:first-child {
            display: flex;
            align-items: center;
            justify-content: center;

            margin: auto;
            width: 58px;
            height: 58px;
            background: rgba(60, 60, 72, 0.2);
            border-radius: 8px;
          }

          &:last-child {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 10px 0;
          }
        }
      }
    }
  }

  &-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
</style>
