<template>
 <div>
   <select class="bills-select" @change="selectHandler" v-model="billName">
     <option>Все</option>
     <option v-for="item in getAllBills" :key="item.id">{{item.name}}</option>
   </select>
   <p>По типу</p>
   <input type="radio" id="all" name="r-type" value="Все" v-model="typeCome">
   <label for="all">Все</label><br>
   <input type="radio" id="income" name="r-type" value="Доход" v-model="typeCome">
   <label for="income">Доходы</label><br>
   <input type="radio" id="outcome" name="r-type" value="Расход" v-model="typeCome">
   <label for="outcome">Расходы</label>

      <div class="list-header">
    <div class="list-header__title">Список категорий</div>
    <table>
      <thead>
        <tr>
         <th>№</th>
         <th>СЧЕТ</th>
         <th>ТИП</th>
         <th>ДАТА</th>
         <th>ОПИСАНИЕ</th>
         <th>СУММА</th>
         <th>ДЕЙСТВИЯ</th>
       </tr>
      </thead>
      <tbody>
        <recor-item v-for="item in a" :key="item.id" v-bind:item="item"/>
      </tbody>
    </table>
  </div>
   <modal v-show="isPopupForm">
     <edit-record-form/>
   </modal>
 </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Modal from '../modal/Modal.vue';
import EditRecordForm from './EditRecordForm.vue';
import RecorItem from './RecorItem.vue';
export default {
  components: {Modal, EditRecordForm, RecorItem },
  name: 'Records',
  data() {
    return {
      bills: [],
      selectedBill: 0,
      topActive: true,
      bottomActive: true,
      id: 0,
      billName: "Все",
      records: [],
      typeCome: "Все"
    }
  },
  computed: {
    ...mapGetters(['getAllBills', 'getAllRecords', 'isPopupForm']),
    test: function() {

      let result = [];
      const records = this.getAllRecords;
      if (this.billName === "Все") {
        result = records;
      } else {
        result = records.filter(record => {
          return record.bill === this.billName;
        });
      }
      return result;
    },
    a: function() {

      let result = [];
      const records = this.test;
      if (this.typeCome === "Все") {
        result = records;
      } else {
        result = records.filter(record => {
          return record.type === this.typeCome;
        });
      }
      return result;
    }
  },
  methods: {
    ...mapActions(['getBills', 'getRecordsData', 'getRecordsData']),
    selectHandler(e) {}
  },
  async mounted() {
    await this.getBills();
    await this.getRecordsData();
    this.records = await this.getAllRecords;
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
  // ul {
  //   margin-top: 20px;
  // }

</style>