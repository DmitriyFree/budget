<template>
  <div class="edit-button" @click.prevent="clickHandler">
    Изменить
  </div>
</template>
<script>
export default {
  name: 'AppEditButton',
  methods: {
    clickHandler(e) {
      this.$emit('clickButton', {});
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
  .edit-button {
    font-size: 14px;
    line-height: 28px;
    background: $button_bg;
    cursor: pointer;
    padding: 0 10px;
    color: $button_text_color;
  }
</style>
