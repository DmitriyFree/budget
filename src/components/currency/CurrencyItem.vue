<template>
  <li>
    <div>{{item.id}}</div>
    <div class="row">{{item.title}}</div>
    <div class="row">{{item.short}}</div>
  </li>
</template>

<script>
export default {
  name: 'CurrencyItem',
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