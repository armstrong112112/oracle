<template>
  <div class="contacts">
    <div class="contacts-head">
      <block-nav-back
        :text="$t('moreSettings.contacts')"
        :to="localePath('/moresettings')"
      />
      <div
        class="add-contact"
        @click="newcontact = true"
      >
        <addCircleIcon />
      </div>
    </div>
    <input-oracle :search="true" :placeholder="$t('moreSettings.search')" />
    <div class="invite-friends">
      <div class="icon">
        <userAddIcon />
      </div>
      {{ $t('moreSettings.inviteFriends') }}
    </div>
    <ul class="user-list">
      <li v-for="user in users" :key="user.id" class="list-item">
        <nuxt-link to="#" class="user-link">
          <div class="user-img">
            <img :src="'/png/zaglushka.png'" alt="" />
          </div>
          <div class="user-info">
            <h2 class="nick-name">
              {{ $t('moreSettings.nickname') }} <span>{{ user.username }}</span>
            </h2>
            <p class="user-id">
              {{ $t('moreSettings.id') }} <span>{{ user.user_id }}</span>
            </p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <draggable-modal :is-open="newcontact" @close="newcontact = false">
      <div class="modal-head">
        <button
          class="cancel-btn"
          @click="newcontact = false"
        >
          {{ $t('moreSettings.cancel') }}
        </button>
        <button class="add-btn">{{ $t('moreSettings.add') }}</button>
      </div>
      <div class="new-address-btn">
        <button
          class="back-btn"
          @click="newcontact = false"
        >
          <arrowIcon />
        </button>
        {{ $t('moreSettings.newContact') }}
      </div>
      <form class="modal-form" @click="(event) => event.preventDefault()">
        <div class="user-info">
          <div class="user-avatar">
            <profileCircleIcon />
          </div>
          <input-oracle :placeholder="$t('moreSettings.nickname')" />
        </div>
        <div class="user-name">
          <input-oracle placeholder="@username" />
          <button-oracle
            :text="$t('moreSettings.findByUsername')"
            color="orange"
            @click=";(fineBy = true), (newcontact = false)"
          />
        </div>
        <div class="user-id">
          <input-oracle :placeholder="$t('moreSettings.id') + ': *******'" />
          <button-oracle :text="$t('moreSettings.findById')" color="orange" />
        </div>
      </form>
    </draggable-modal>
    <draggable-modal :is-open="fineBy" @close="fineBy = false">
      <div class="modal-head">
        <button
          class="cancel-btn"
          @click="fineBy = false"
        >
          {{ $t('moreSettings.cancel') }}
        </button>
        <button class="add-btn">{{ $t('moreSettings.add') }}</button>
      </div>
      <div class="new-address-btn">
        <button
          class="back-btn"
          @click="fineBy = false; newcontact = true"
        >
          <arrowIcon />
        </button>
        Users with a nickname @useruser
      </div>
      <ul class="user-list">
        <li v-for="user in users" :key="user.id" class="list-item">
          <nuxt-link to="#" class="user-link">
            <div class="user-img">
              <img :src="'/png/zaglushka.png'" alt="" />
            </div>
            <div class="user-info">
              <h2 class="nick-name">
                Nickname <span>{{ user.username }}</span>
              </h2>
              <p class="user-id">
                ID: <span>{{ user.user_id }}</span>
              </p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </draggable-modal>
  </div>
</template>

<script setup lang="ts">
import addCircleIcon from '@/assets/svg/moresettings/add-circle.svg?component'
import userAddIcon from '@/assets/svg/moresettings/user-add.svg?component'
import arrowIcon from '@/assets/svg/arrow-back.svg?component'
import profileCircleIcon from '@/assets/svg/profile-circle.svg?component'

const localePath = useLocalePath()

definePageMeta({
  layout: 'mobile',
})

interface User {
  id: number
  username: string
  user_id: number
}

// Reactive state
const fineBy = ref<boolean>(false)
const newcontact = ref<boolean>(false)

const users = ref<User[]>([
  {
    id: 1,
    username: '@username',
    user_id: 999999,
  },
  {
    id: 2,
    username: '@username',
    user_id: 999999,
  },
  {
    id: 3,
    username: '@username',
    user_id: 999999,
  },
  {
    id: 4,
    username: '@username',
    user_id: 999999,
  },
  {
    id: 5,
    username: '@username',
    user_id: 999999,
  },
  {
    id: 6,
    username: '@username',
    user_id: 999999,
  },
  {
    id: 7,
    username: '@username',
    user_id: 999999,
  },
  {
    id: 8,
    username: '@username',
    user_id: 999999,
  },
  {
    id: 9,
    username: '@username',
    user_id: 999999,
  },
  {
    id: 10,
    username: '@username',
    user_id: 999999,
  },
])
</script>

<style lang="scss">
.contacts {
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .add-contact {
      img {
        height: 24px;
      }
    }
  }
  .input {
    margin-bottom: 18px;
  }
  .invite-friends {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 12px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #f64e2a;
    .icon {
      line-height: 0;
    }
  }
  .user-list {
    .list-item {
      &:first-child {
        .user-link {
          border-top: 1px solid rgba(29, 28, 36, 0.5);
        }
      }
      &:last-child {
        .user-link {
          border: 0;
        }
      }
    }
    .user-link {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 8px 0;
      border-bottom: 1px solid rgba(29, 28, 36, 0.5);
      .user-img {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .user-info {
        .nick-name {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          color: #fff;
          span {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.4);
          }
        }
        .user-id {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 12px;
          text-align: left;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
</style>
