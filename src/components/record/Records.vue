<template>
 <div>

  <div class="pick">
    <div class="pick__title">Сортировать</div>
    <div class="pick__bill">
      <select class="" v-model="billName">
        <option>Все</option>
        <option v-for="item in getAllBills" :key="item.id">{{item.name}}</option>
      </select>
    </div>
    <div class="pick__type" @click="selectTypeHandler">
      <div class="pick__type-item left  active" data-type-record="Все">Все</div>
      <div class="pick__type-item" data-type-record="Доход">Доход</div>
      <div class="pick__type-item right" data-type-record="Расход">Расход</div>
    </div>
  </div>

  <div  class="list-header">
    <div v-if="!isEmptyList">
      <table >
      <thead>
        <tr>
         <th>№</th>
         <th>Счет</th>
         <th>Категория</th>
         <th>Тип</th>
         <th>Дата</th>
         <th>Описание</th>
         <th>Сумма</th>
         <th>Действие</th>
       </tr>
      </thead>
      <tbody>
        <record-item v-for="item in pageList" :key="item.id" v-bind:record="item"/>
      </tbody>
     </table>
      <pagination :pagesAmount="pageCount" :page="currentPage" @currentPage="updateList" />
    </div>
    <div v-else class="empty-list">Список записей пуст</div>
  </div>
 </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Pagination from '../ui/Pagination.vue';
import RecordItem from './RecordItem.vue';
export default {
  components: { RecordItem, Pagination },
  name: 'Records',
  data() {
    return {
      currentPage: 1,
      bills: [],
      selectedBill: 0,
      topActive: true,
      bottomActive: true,
      id: 0,
      billName: "Все",
      records: [],
      typeCome: "Все",
      selectedRecord: {}
    }
  },
  computed: {
    ...mapGetters(['getAllBills', 'getAllRecords', 'getMaxPageItems', 'isPopupForm', 'getMaxPageRecord', 'getMaxPageItems']),

    transferHandler() {
      const records = this.getAllRecords
      const returnedList = []

      records.forEach(item => {
        if ( item.type == 'transfer') {
          const firstRecord = {...item.fromBill}
          firstRecord.date = item.date
          firstRecord.id = item.id

          const secondRecord = {...item.toBill}
          secondRecord.date = item.date
          secondRecord.id = item.id

          returnedList.push(firstRecord)
          returnedList.push(secondRecord)

        } else returnedList.push(item)
      })

      return returnedList
    },

    billSelectHandler: function() {

      let result = [];
      const records = this.getAllRecords
      if (this.billName === "Все") {
        result = records;
      } else {
        result = records.filter(record => {
          return record.bill === this.billName;
        });
      }
      return result;
    },
    selectByType: function() {

      let result = [];
      const records = this.billSelectHandler;
      if (this.typeCome === "Все") {
        result = records;
      } else {
        result = records.filter(record => {
          return record.type === this.typeCome;
        });
      }
      return result;
    },
    isEmptyList() {
      if (this.selectByType.length === 0) return true;
      else return false
    },
    pageCount() {
      const selectedList = this.selectByType;
       this.currentPage = 1
      return Math.ceil(selectedList.length / this.getMaxPageItems);

    },
    pageList() {
      const list = []
      const end = this.currentPage * this.getMaxPageItems;
      const start = end - this.getMaxPageItems;
      this.selectByType.forEach((item, index )=> {
        if (start <= index && index < end) list.push(item);
      });
      return list;
    }
  },
  methods: {
    ...mapActions(['getBillsData', 'getRecordsData', 'getRecordsData']),
    ...mapMutations(['changePopupForm', 'setFormData', 'setCurrentPageRecord']),
    async updateList(currentPage) {
      this.currentPage = currentPage;
    },
    selectTypeHandler(e) {
      const target = e.target;
      const elems = document.querySelectorAll('.pick__type-item');
      elems.forEach(elem => {
        elem.classList.remove('active');
      });
      target.classList.add('active');
      this.typeCome = target.dataset.typeRecord
    }
  },
  async mounted() {
    await this.getBillsData();
    await this.getRecordsData();
    this.records = await this.getAllRecords;
    this.bills = await this.getAllBills;
  }
}
</script>

<style lang="scss" scoped>
  .pick {
    margin: 20px 0 10px;
    display: flex;
    align-items: center;
    &__title {
      font-weight: 700;
    }
    &__bill {
      margin-left: 10px;
      select {
        appearance: none;
        display: block;
        outline: none;
        padding: 5px 10px;
        border: 1px solid rgba(35, 35, 35, 0.5);
        background: transparent;
        line-height: 20px;
        cursor: pointer;
        option {
          font-size: 18px;
        }

      }
    }
    &__type{
      display: flex;
      margin-left: 15px;
      border: 1px solid rgba(35, 35, 35, 0.5);
      border-radius: 15px;
      overflow: hidden;
      &-item {
        padding: 5px 10px;
        background: rgba(17, 170, 243, 0.4);
        background: transparent;
        line-height: 20px;
        transition: all 0.5s;
        cursor: pointer;
        &.active {
          background: #1e5f7e;
          color: #fff;
        }
        &.left {
          padding-left: 20px;
          border-right: 1px solid rgba(35, 35, 35, 0.5);
        }
        &.right {
          padding-right: 20px;
          border-left: 1px solid rgba(35, 35, 35, 0.5);
        }
      }
    }
  }


</style>