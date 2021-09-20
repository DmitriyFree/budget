<template>
  <li>
    <div class="type">{{item.type}}</div>
    <div class="title">{{item.name}}</div>
  </li>
</template>
<script>
export default {
  name: 'Category',
  props: ['item']
}
</script>
<style lang="scss" scoped>
  li {
    padding: 5px;
    display: flex;
    .type {
      width: 100px;
    }
    .title {
      width: 100px;
    }
  }
</style>