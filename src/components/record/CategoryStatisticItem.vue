<template>
 <div>
  <div class="statistic-item" @click="active = !active">
    <div class="statistic-item__title">{{item.name}}</div>
    <div class="statistic-item__total">{{item.total}}</div>
    <div class="statistic-item__btn" v-bind:class="{active: !active}">
      <img src="@/assets/images/triangle.svg" alt="">
    </div>
  </div>
  <div class="list" v-for="i in item.records" :key=" i.id" v-bind:class="{done: active}">
    <record-statistic-item v-bind:item="i" v-bind:selectedBill="selectedBill"/>
  </div>
 </div>


</template>
<script>
import RecordStatisticItem from './RecordStatisticItem.vue'
export default {
  components: { RecordStatisticItem },
  name: 'CategoryStatisticItem',
  props: ['item', 'selectedBill'],
  data() {
    return {
      active: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .statistic-item {
    display: flex;
    padding: 10px 15px;
    background: #11aaf390;
    cursor: pointer;
    border-bottom: 1px solid #fff;
    &__total {
      margin-left: 15px;
    }
    &__btn {
      margin-left: 25px;
      &.active{
        transform: rotate(90deg);
      }
    }
  }
  .done {
    height: 0;
    overflow: hidden;
  }
</style>
