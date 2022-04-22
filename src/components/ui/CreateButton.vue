<template>
  <div class="create-button" @click.prevent="clickHandler"></div>
</template>
<script>
export default {
  name: 'CreateButton',
  methods: {
    clickHandler(e) {
      this.$emit('clickButton', {});
    }
  }
}
</script>
<style lang="scss" scoped>
.create-button {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #1e5f7e;
  cursor: pointer;
  transition: all .5s;
  &::before {
    content: "+";
    position: absolute;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
    color: #fff;
    transition: all .5s;
  }
}
</style>