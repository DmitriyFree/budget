<template>
  <div class="statistics">
    <div class="statistics__header">
      <div class="statistics__header-title">Баланс</div>
      <div class="statistics__header-result">5000</div>
    </div>
    <div class="statistics__total">
      <div class="top">
        <div class="top-title">Доход</div>
        <div class="top-result">10000</div>
      </div>
      <div class="bottom">
        <div class="bottom-title">Расход</div>
        <div class="bottom-result">5000</div>
      </div>
    </div>
    <statistic-category/>
  </div>
</template>

<script>
import StatisticCategory from './StatisticCategory.vue'
export default {
  components: { StatisticCategory },
  name: 'StatisticsHandler'
}
</script>

<style lang="scss" scoped>
  .statistics {
    padding: 10px 20px;
    &__header {
      padding: 10px 0;
      border-bottom: 1px solid #aaa;
      display: flex;
      &-title {
        font-size: 20px;
        font-weight: 700;
      }
      &-result {
        font-size: 20px;
        margin-left: 10px;
      }
    }
    &__total {
      padding: 10px 0;
      border-bottom: 1px solid #aaa;
    }
  }
  .top, .bottom {
    display: flex;
    padding: 5px 0 0;
    font-size: 18px;
    line-height: 20px;
    &-title {
      font-weight: 700;
    }
    &-result {
      margin-left: 10px;
    }
  }
  // .top {
  //   &-title {
  //     font-size: 18px;
  //     font-weight: 700;
  //   }
  // }
  // .category {
  //   padding: 10px 20px;
  //   &__title {
  //     padding: 10px 0;
  //     font-size: 20px;
  //     font-weight: 700;
  //     border-bottom: 1px solid #aaa;
  //   }
  // }
</style>