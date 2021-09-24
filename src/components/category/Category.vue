<template>
  <li>
    <div>{{item.id}}</div>
    <div class="row">{{item.type}}</div>
    <div class="row">{{item.name}}</div>
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
    .row {
      margin-left: 10px;
    }
  }
</style>