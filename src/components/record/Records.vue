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

  <div class="list-header">
    <table>
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
        <recor-item v-for="item in selectHandlerr" :key="item.id" v-bind:item="item" @edit="editForm"/>
      </tbody>
    </table>
  </div>
   <modal v-show="isPopupForm">
     <edit-record-form v-bind:record="selectedRecord"/>
   </modal>
 </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
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
      typeCome: "Все",
      selectedRecord: {}
    }
  },
  computed: {
    ...mapGetters(['getAllBills', 'getAllRecords', 'isPopupForm']),
    billSelectHandler: function() {

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
    selectHandlerr: function() {

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
    }
  },
  methods: {
    ...mapActions(['getBillsData', 'getRecordsData', 'getRecordsData']),
    ...mapMutations(['changePopupForm', 'setFormData']),
    editForm(data) {
      this.setFormData(data);
      this.changePopupForm(true);
      this.selectedRecord = data;

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