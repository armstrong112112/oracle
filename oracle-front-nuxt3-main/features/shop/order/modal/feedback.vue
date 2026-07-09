<template>
  <div class="feedback-modal">
    <div class="feedback-modal-content">
      <div class="modal-header">
        <button @click="CloseModal">
          <img src="/svg/shop/icons/close.svg" alt="close" />
        </button>
      </div>
      <div class="modal-body">
        <h2>Tell us how your mixing experience was</h2>
        <div class="feedback-info">
          <img src="/svg/shop/icons/info.svg" alt="" info />
          <p>Leave a review after the deal and get extra score points!</p>
        </div>
        <div class="feedback__actions">
          <button
            :class="{ active: selectedFeedback === 'dislike' }"
            @click="selectedFeedback = 'dislike'">
            <img src="/svg/shop/icons/dislike.svg" alt="dislike" />
          </button>

          <button
            :class="{ active: selectedFeedback === 'neutral' }"
            @click="selectedFeedback = 'neutral'">
            <img src="/svg/shop/icons/minus-fill.svg" alt="neutral" />
          </button>

          <button
            :class="{ active: selectedFeedback === 'like' }"
            @click="selectedFeedback = 'like'">
            <img src="/svg/shop/icons/like-fill.svg" alt="like" />
          </button>
        </div>
        <div class="feedback-comments">
          <textarea
            placeholder="Tell us what you think about your mixing experience..." />
        </div>
      </div>
      <div class="modal-action" v-if="selectedFeedback">
        <button>Leave a review</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: [];
}>();

const selectedFeedback = ref<string | null>(null);
const leave_btn = ref<boolean>(false);

const CloseModal = (): void => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.feedback-modal {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
  background-color: rgba($color: #000000, $alpha: 0.8);
  user-select: none;

  .feedback-modal-content {
    width: 500px;
    padding: 20px 24px;
    border-radius: 30px;
    background-color: #14131b;

    .modal-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .modal-body {
      margin-top: 32px;

      h2 {
        color: #fff;
        font: 500 18px Roboto, sans-serif;
      }

      .feedback-info {
        width: 100%;
        margin-top: 20px;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 12px;

        p {
          color: #fff;
          font: 300 12px Roboto, sans-serif;
        }
      }

      .feedback__actions {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
          padding: 8px 43px;
          border-radius: 8px;
          background-color: #1b1a24;

          &.active {
            background-color: #f64e2a;
          }
        }
      }

      .feedback-comments {
        width: 100%;
        margin-top: 20px;

        textarea {
          width: 100%;
          height: 135px;
          padding: 13px 14px;
          border-radius: 12px;
          background: #1b1a24;
          border: 1px solid #2b2741;
          color: #fff;
          resize: none;
          font: 400 14px Roboto, sans-serif;

          &:focus {
            outline: none;
          }

          &::placeholder {
            color: #67639a;
          }
        }
      }
    }

    .modal-action {
      margin-top: 32px;
      width: 100%;

      button {
        width: 100%;
        border-radius: 14px;
        padding: 11px 0;
        background: #f64e2a;
        color: #fff;
        font: 500 16px Roboto, sans-serif;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .feedback-modal {
    backdrop-filter: blur(15px);

    .feedback-modal-content {
      background: transparent;

      .modal-header {
        padding: 10px 16px;
        position: absolute;
        top: 0;
        left: 0;
      }

      .modal-action {
        padding: 12px 16px 24px 16px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
}
</style>
