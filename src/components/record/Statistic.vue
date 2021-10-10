<template>
 <div>
   <select class="bills-select" @change="selectHandler" v-model="billName">
     <option v-for="item in getAllBills" :key="item.id">{{item.name}}</option>
   </select>
  <div class="statistic">
    <div class="statistic__header">
      <div class="statistic__header-title">Баланс</div>
      <div class="statistic__header-result">{{total}}</div>
    </div>
    <div class="statistic__total">
      <div class="top" @click="topActive = !topActive">
        <div class="top-title">Доход</div>
        <div class="top-result">{{income}}</div>
        <div class="top-btn" v-bind:class="{active: !topActive}">
          <img src="@/assets/images/triangle.svg" alt="">
        </div>
      </div>
      <div class="top-list" v-for="item in getIncomeRecords(billName)" :key="item[0]" v-bind:class="{done: topActive}">
        <category-statistic-item v-bind:item="item[1]" v-bind:selectedBill="selectedBill"/>
      </div>
      <div class="bottom" @click="bottomActive = !bottomActive">
        <div class="bottom-title">Расход</div>
        <div class="bottom-result">{{outcome}}</div>
          <div class="top-btn" v-bind:class="{active: !bottomActive}">
          <img src="@/assets/images/triangle.svg" alt="">
        </div>
      </div>
      <div class="bottom-list" v-for="item in getOutcomeRecords(billName)" :key="item[0]" v-bind:class="{done: bottomActive}">
        <category-statistic-item v-bind:item="item[1]" v-bind:selectedBill="selectedBill"/>
      </div>
    </div>
   </div>
   <modal v-show="getModalActive">
     <edit-record-form/>
   </modal>
 </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Modal from '../modal/Modal.vue';
import CategoryStatisticItem from './CategoryStatisticItem.vue';
import EditRecordForm from './EditRecordForm.vue';
export default {
  components: { CategoryStatisticItem, Modal, EditRecordForm },
  name: 'Statistic',
  data() {
    return {
      bills: [],
      total: 0,
      income: 0,
      outcome: 0,
      selectedBill: 0,
      topActive: true,
      bottomActive: true,
      id: 0,
      billName: ''
    }
  },
  computed: mapGetters(['getAllBills', 'getAllRecords', 'getModalActive', 'getIncomeRecords', 'getOutcomeRecords', 'getStatisticOneBill']),
  methods: {
    ...mapActions(['getBills', 'getRecordsData']),
    selectHandler(e) {
      const data = this.getStatisticOneBill(this.billName);
      this.total = data.total;
      this.income = data.income;
      this.outcome = data.outcome;
      // this.culcBill(this.bills[index].name);
    }
  },
  async mounted() {
    await this.getBills();
    await this.getRecordsData();
    this.bills = await this.getAllBills;
  }
}
</script>

<style lang="scss" scoped>

.statistic {
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
    padding: 10px 5px;
    font-size: 18px;
    line-height: 20px;
    background: #11aaf3;
    cursor: pointer;
    border-bottom: 1px solid #fff;
    &-title {
      font-weight: 700;
    }
    &-result {
      margin-left: 15px;
    }
    &-btn {
      margin-left: 25px;
      &.active {
         transform: rotate(90deg);
        }
    }
  }
  .bills-select {
    display: block;
    outline: none;
    padding: 5px 10px;
    margin-top: 15px;
  }
  .bottom {
    margin-top: 10px;
  }
  .bottom-list {
    transition: 1s;
  }
  .done {
    height: 0;
    overflow: hidden;
  }

</style>