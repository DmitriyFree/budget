<template>
  <div class="edit-button" @click.prevent="clickHandler">
    Изменить
  </div>
</template>
<script>
export default {
  name: 'EditButton',
  methods: {
    clickHandler(e) {
      this.$emit('clickButton', {});
    }
  }
}
</script>
<style lang="scss" scoped>
  .edit-button {
    font-size: 14px;
    line-height: 28px;
    // background: #17ac17;
    background: #1e5f7e;
    cursor: pointer;
    padding: 0 10px;
    color: #fff;
    // color: #000;
  }
</style>
