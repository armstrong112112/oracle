<template>
  <div class="checkbox-list">
    <h2 v-if="title" class="exclude-chats__types-title">{{ title }}</h2>

    <ul class="exclude-chats__types-list">
      <li
        v-for="item in items"
        :key="item.id"
        class="exclude-chats__types-item"
        :class="{ 'exclude-chats__types-item--selected': item.checked }"
      >
        <label :for="`checkbox-${item.id}`" class="exclude-chats__types-item--label">
          <div v-if="item.icon" class="exclude-chats__types-icon">
            <component :is="item.icon" />
          </div>
          <div v-else-if="item.avatar" class="exclude-chats__chats-avatar">
            <img :src="item.avatar" :alt="item.name" />
          </div>

          <span class="exclude-chats__types-label">{{ item.name }}</span>

          <input
            :id="`checkbox-${item.id}`"
            type="checkbox"
            :name="name"
            style="display: none"
            :checked="item.checked"
            class="form-check"
            @change="handleItemChange(item)"
          />
          <span class="exclude-chats__types-check">
            <CheckIcon />
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import CheckIcon from '@/assets/svg/check-icon.svg?component';

export default {
  name: 'CheckboxList',
  components: {
    CheckIcon
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'checkbox-group'
    }
  },
  methods: {
    handleItemChange(item) {
      this.$emit('change', {
        ...item,
        checked: !item.checked
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/widgets/checkbox-list.scss" as *;
</style>