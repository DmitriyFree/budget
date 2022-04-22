<template>
  <div class="delete-btn" @click.prevent="clickHandler">
    <img class="remove" src="@/assets/images/delete.svg">
  </div>
</template>
<script>
export default {
  name: 'DeleteButton',
  methods: {
    clickHandler(e) {
      this.$emit('clickButton', {});
    }
  }
}
</script>
<style lang="scss" scoped>
  .delete-btn {
    cursor: pointer;
    width: 28px;
    height: 28px;
    background-size: cover;
  }
  .delete-btn img {
    height: 28px;
  }
</style>