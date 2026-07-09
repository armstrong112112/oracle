<template>
  <div class="checkbox__container">
    <div class="checkbox__label">
      <h3>{{ label }}</h3>
      <img v-if="help" src="/svg/shop/icons/question.svg" alt="question" />
    </div>
    <div class="checkbox-options__container">
      <div
        v-for="item of option"
        :key="item.id"
        class="checkbox-option__item"
        :style="
          item.headingA === '' ? { padding: '12.5px 16px 12.5px 4px' } : {}
        "
        @click="toggleCheckbox(item.id)">
        <div class="option_content">
          <h6 v-if="item.headingA !== ''">{{ item.headingA }}</h6>
          <h4>{{ item.headingB }}</h4>
        </div>
        <div class="option_checkbox" :class="variant">
          <input
            v-if="variant === 'primory' || variant === 'primary'"
            :id="`${label}-${item.id}`"
            type="checkbox"
            :name="label"
            :value="item.id"
            :checked="selected.includes(item.id)"
            @change="(e) => returnValue(e, item.id)" />
          <input
            v-if="variant === 'secondary'"
            :id="`${label}-${item.id}`"
            type="checkbox"
            :name="label"
            :value="item.id"
            :checked="selected.includes(item.id)"
            @change="(e) => returnValue(e, item.id)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface OptionType {
  id: number;
  headingA: string;
  headingB: string;
}

interface Props {
  selected?: number[];
  label: string;
  variant: string;
  help?: boolean;
  option: OptionType[];
  singleSelect?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  selected: () => [],
  help: false,
  singleSelect: false,
});

const emit = defineEmits<{
  checkbox: [event: { id: number; checked: boolean; singleSelect?: boolean }];
}>();

function toggleCheckbox(id: number): void {
  if (props.singleSelect) {
    const isAlreadySelected = props.selected.includes(id);
    if (!isAlreadySelected) {
      emit("checkbox", { id, checked: true, singleSelect: true });
    }
  } else {
    const isChecked = props.selected.includes(id);
    emit("checkbox", { id, checked: !isChecked });
  }
}

function returnValue(event: Event, id: number): void {
  const target = event.target as HTMLInputElement;

  if (props.singleSelect) {
    emit("checkbox", {
      id,
      checked: target.checked,
      singleSelect: true,
    });
  } else {
    emit("checkbox", { id, checked: target.checked });
  }
}
</script>
<style lang="scss">
.checkbox__container {
  margin-top: 16px;
  width: 100%;
  .checkbox__label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      color: white;
      font-size: 14px;
      font-weight: 400;
      font-family: Roboto, sans-serif;
    }
  }

  .checkbox-options__container {
    margin-top: 8px;
    width: 100%;
    padding-left: 16px;
    border-radius: 12px;
    background-color: #14131b;
    .checkbox-option__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px 8px 0;
      border-bottom: 1px solid #60578e;
      cursor: pointer;

      &:last-child {
        border-bottom: transparent;
      }

      .option_content {
        font-family: Roboto, sans-serif;
        h6 {
          font-size: 12px;
          color: #bfb7ff;
          font-weight: 400;
        }
        h4 {
          font-size: 14px;
          color: #fff;
          font-weight: 400;
        }
      }

      .option_checkbox {
        width: 20px;
        height: 20px;
        position: relative;

        input[type="checkbox"] {
          width: 100%;
          height: 100%;
          appearance: none;
          -webkit-appearance: none;
          border: transparent;
          background-color: transparent;
          cursor: pointer;

          &:checked {
            background-color: #f64e2a;

            &::after {
              content: url("data:image/svg+xml;utf8,%3Csvg%20width%3D%229%22%20height%3D%2210%22%20viewBox%3D%220%200%209%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%205.83333L3.43229%208.20829C3.52379%208.29764%203.67449%208.27933%203.74194%208.17067L7.88235%201.5%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E");
              display: block;
              position: absolute;
              top: 2.5px;
              left: 5px;
              pointer-events: none;
            }
          }
        }

        &.primory,
        &.primary {
          border: 1px solid #60578e;
          border-radius: 30px;

          input[type="checkbox"] {
            clip-path: circle(46% at 50% 50%);
          }
        }

        &.secondary {
          border-radius: 3px;
          background-color: #343242;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
