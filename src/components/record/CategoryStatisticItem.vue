<template>
  <div class="statistic-item">
    {{item.name}} {{item.total}}
  </div>
</template>
<script>
export default {
  name: 'CategoryStatisticItem',
  props: ['item']
}
</script>

<style lang="scss" scoped>
  .statistic {
    display: block;
    padding: 5px 0;
  }
</style>
