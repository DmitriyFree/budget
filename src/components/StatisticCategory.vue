<template>
  <div class="st-category">
    <div class="st-category__title">По категориям</div>
  </div>
</template>

<script>
export default {
  name: 'StatisticCategory'
}
</script>

<style lang="scss" scoped>
  .st-category {
    padding: 5px 0;
    border-bottom: 1px solid #aaa;
    &__title{
      font-size: 18px;
      line-height: 20px;
      font-weight: 700;
      padding: 10px 0;
    }
  }
</style>