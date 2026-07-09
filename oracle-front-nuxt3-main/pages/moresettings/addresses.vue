<template>
  <div class="addresses">
    <block-nav-back
      :text="$t('moreSettings.addresses')"
      :to="localePath('/moresettings')"
    />
    <ul class="addresses-list">
      <li
        v-for="cripto in criptos"
        :key="cripto.id"
        class="list-item"
        :class="cripto.selected ? 'selected' : ''"
        @click="selectedCripto(cripto.id)"
      >
        {{ cripto.name }}
      </li>
    </ul>
    <div class="add-addresses">
      <form
        action="#"
        class="add-addresses-form"
        @click="(event) => addAddress(event)"
      >
        <div class="form-control">
          <input-oracle
            :label="$t('moreSettings.name')"
            :edit="true"
            :placeholder="$t('moreSettings.myBtcWallet')"
            @changed="inputChange"
            @edit="editModal = true"
          />
        </div>
        <div class="form-control">
          <input-oracle
            :label="$t('moreSettings.address')"
            :scan="true"
            :edit="true"
            :copy="true"
            v="btc95489159581940fIdfoks30254-0252315241"
            @edit="editModal = true"
          />
        </div>
        <button class="detele-btn" @click="deleteModal = true">
          {{ $t('moreSettings.deleteAddress') }}
        </button>
        <button-oracle
          :text="$t('moreSettings.addNewAddress')"
          color="orange"
          @click="addModal = true"
        />
      </form>
    </div>
    <adresses-modal
      :is-visible="editModal"
      class="change-name-address"
      @close="editModal = false"
    >
      <div class="modal-head">
        <button class="cancel-btn" @click="editModal = false">
          {{ $t('moreSettings.cancel') }}
        </button>
        <button class="done-btn">{{ $t('moreSettings.done') }}</button>
      </div>
      <div class="edit-content">
        <input-oracle
          :v="wallet"
          :placeholder="$t('moreSettings.myBtcWallet')"
          :edit="true"
        />
      </div>
    </adresses-modal>
    <adresses-modal
      :is-visible="deleteModal"
      class="delete-address"
      @close="deleteModal = false"
    >
      <h3 class="modal-title">
        {{ $t('moreSettings.confirmAddressDeletion') }}
      </h3>
      <button-oracle :text="$t('moreSettings.yes')" color="orange" />
      <button-oracle
        :text="$t('moreSettings.cancel')"
        color="gray"
        @click="deleteModal = false"
      />
    </adresses-modal>
    <adresses-modal :is-visible="addModal" class="add-address">
      <h3 class="modal-title">
        {{ $t('moreSettings.confirmAddingNewAddress') }}
      </h3>
      <button-oracle
        :text="$t('moreSettings.yes')"
        color="orange"
        @click="addModal = false; newaddress = true"
      />
      <button-oracle
        :text="$t('moreSettings.cancel')"
        color="gray"
        @click="addModal = false"
      />
    </adresses-modal>
    <draggable-modal
      class="new-address-modal"
      :is-open="newaddress"
      @close="newaddress = false"
    >
      <div class="modal-head">
        <button
          class="cancel-btn"
          @click="newaddress = false"
        >
          {{ $t('moreSettings.cancel') }}
        </button>
        <button class="add-btn">{{ $t('moreSettings.add') }}</button>
      </div>
      <div class="new-address-btn">
        <button
          class="back-btn"
          @click="addModal = true; newaddress = false"
        >
          <arrowIcon />
        </button>
        {{ $t('moreSettings.newAddress') }}
      </div>
      <ul class="addresses-list">
        <li
          v-for="cripto in criptos"
          :key="cripto.id"
          class="list-item"
          :class="cripto.selected ? 'selected' : ''"
          @click="selectedCripto(cripto.id)"
        >
          {{ cripto.name }}
        </li>
      </ul>
      <form class="modal-form">
        <div class="form-control">
          <input-oracle :placeholder="$t('moreSettings.name')" />
        </div>
        <div class="form-control">
          <input-oracle
            :scan="true"
            :clipboard="true"
            :close="true"
            :placeholder="$t('moreSettings.address')"
          />
        </div>
      </form>
    </draggable-modal>
  </div>
</template>

<script setup lang="ts">
import arrowIcon from '@/assets/svg/arrow-back.svg?component'

const localePath = useLocalePath()

definePageMeta({
  layout: 'mobile',
})

interface Crypto {
  id: number
  name: string
  selected: boolean
}

// Reactive state
const wallet = ref<string>('')
const editModal = ref<boolean>(false)
const deleteModal = ref<boolean>(false)
const addModal = ref<boolean>(false)
const newaddress = ref<boolean>(false)

const criptos = ref<Crypto[]>([
  {
    id: 1,
    name: 'USDT',
    selected: true,
  },
  {
    id: 2,
    name: 'BTC',
    selected: false,
  },
  {
    id: 3,
    name: 'LTC',
    selected: false,
  },
  {
    id: 4,
    name: 'ETH',
    selected: false,
  },
])

// Methods
const inputChange = (v: string) => {
  wallet.value = v
}

const selectedCripto = (id: number): void => {
  criptos.value.forEach((item) => (item.selected = item.id === id))
}

const addAddress = (event: Event) => {
  event.preventDefault()
}
</script>

<style lang="scss">
.addresses {
  &-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: stretch;
    gap: 8px;
    margin-bottom: 35px;
    .list-item {
      background: #121119;
      border-radius: 8px;
      border: 1px solid #121119;
      padding: 11px 0px;
      cursor: pointer;
      user-select: none;
      font-family: var(--third-family);
      font-weight: 700;
      font-size: 16px;
      letter-spacing: 1px;
      text-align: center;
      color: #fff;
      &.selected {
        border-color: #f64e2a;
      }
    }
  }
  .add-addresses {
    &-form {
      .form-control {
        margin-bottom: 20px;
        &:nth-child(2) {
          margin-bottom: 18px;
          .input {
            input {
              padding-right: 120px;
              text-overflow: ellipsis;
            }
            &-edit-action {
              right: 46px;
            }
          }
        }
        .label {
          font-family: var(--font3);
          font-weight: 700;
          font-size: 16px;
          color: #fff;
        }
      }
      .detele-btn {
        width: 100%;
        margin-bottom: 42px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 14px;
        text-align: end;
        color: #f64e2a;
      }
      .button_oracle {
        height: 48px;
      }
    }
  }
  .add-addresses-modal {
    &.change-name-address {
      .edit-content {
        .input {
          input {
            width: 154px;
          }
        }
      }
    }
  }
}
</style>
