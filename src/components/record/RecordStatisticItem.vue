<template>
  <div class="inner">
    <div>{{item.date}}</div>
    <div>{{item.description}}</div>
    <div>{{item.sum}}</div>
    <div class="action">
      <div class="edit__btn">Edit</div>
      <div class="remove__btn" @click="remove({bill: selectedBill, record: item.id})">Remove</div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  name: 'RecordStatisticItem',
  props: ['item', 'selectedBill'],
  methods: {
    ...mapActions(['removeRecordlById']),
    remove(data) {
      const result = confirm('Вы уверенны?');
      if(result) {
        this.removeRecordlById(data);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .inner {
    display: flex;
    background:  #11aaf320;
    border-bottom: 1px solid #fff;
    display: grid;
    grid-template-columns: 150px 100px 100px 100px;
    align-items: center;
    padding: 5px 20px;
    div {
      font-size: 14px;
      line-height: 16px;
    }
  }
  .action {
    display: flex;
    .edit__btn {
      font-size: 14px;
      line-height: 16px;
      background: #17ac17;
      padding: 5px 10px;
      text-align: center;
      cursor: pointer;
    }
    .remove__btn {
      font-size: 14px;
      line-height: 16px;
      background: #e90909;
      margin-left: 15px;
      padding: 5px 10px;
      text-align: center;
      cursor: pointer;
    }

  }
</style>