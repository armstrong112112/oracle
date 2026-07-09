<template>
  <div class="payment-details-form-container">
    <form
      action="#"
      class="payment-details-form"
      @click="
        (event) => {
          event.preventDefault()
        }
      "
    >
      <div class="form-control">
        <input-oracle
          label="Name"
          :edit="true"
          placeholder="My baddie’s CashApp"
          @edit="$emit('edit')"
        />
        <input-oracle
          label="Payment Details"
          :edit="true"
          :copy="true"
          v="$Baddies2007"
          placeholder="$Baddies2007"
          class="payment-details-input"
        />
        <div class="comment">
          <div class="label">Comment</div>
          <div class="comment-content">
            <div class="comment-text" :class="{ more: moreComment }">
              Lörem ipsum antiktiga köpiktiga desk. Gade tresade fast gaska.
              Rusm koligt fastän mikoktigt basaligen.
            </div>
            <div class="comment-buttons">
              <button
                class="more-btn"
                :class="{ more: moreComment }"
                @click="moreComment = !moreComment"
              >
                <arrowLeftIcon />
              </button>
              <button class="edit-btn" @click="$emit('edit')">
                <img
                  :src="'/svg/moresettings/edit-2.svg'"
                  alt=""
                />
              </button>
              <button class="copy-btn">
                <img
                  :src="'/svg/moresettings/copy.svg'"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
        <button class="delete-btn" @click="$emit('delete')">
          Delete Payment Details
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import arrowLeftIcon from '@/assets/svg/arrow-left.svg?component'

const emit = defineEmits<{
  edit: []
  delete: []
}>()

const moreComment = ref(false)
</script>

<style lang="scss">
.payment-details-form-container {
  width: calc(100% + 20px);
  margin-left: -10px;
  background: #121119;
  border-radius: 8px;
  padding: 18px 10px;
  .payment-details-form {
    .form-control {
      .input {
        margin-bottom: 20px;
        .label {
          font-family: var(--font3);
          font-weight: 700;
          font-size: 16px;
          color: #fff;
        }
        &.payment-details-input {
          .input-edit-action {
            right: 46px;
          }
        }
      }
    }
    .comment {
      margin-bottom: 6px;
      .label {
        margin-bottom: 10px;
        font-family: var(--font3);
        font-weight: 700;
        font-size: 16px;
        color: #fff;
      }
      &-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
        background: #1e1d26;
        border-radius: 6px;
        padding: 16px 12px;
        .comment-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          &.more {
            white-space: wrap;
            text-overflow: unset;
          }
        }
        .comment-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
          button {
            cursor: pointer;
          }
          .more-btn {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #f64e2a;
            &.more {
              svg {
                transform: rotate(-90deg);
              }
            }
            svg {
              height: 12px;
              transform: rotate(90deg);
              transition: 0.2s;

              path {
                fill: #f64e2a;
                stroke: #1e1d26;
              }
            }
          }
        }
      }
    }
    .delete-btn {
      width: 100%;
      cursor: pointer;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 14px;
      text-align: right;
      color: #f64e2a;
    }
  }
}
</style>
