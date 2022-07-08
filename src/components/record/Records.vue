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
        <record-item v-for="item in pageItems"
          :key="item.id"
          :record="item"
          @edit="editHandler"
          @delete="deleteHandler"/>
      </tbody>
     </table>
      <pagination :pagesAmount="pageCount" :page="page" @currentPage="updateList" />
    </div>
    <div v-else class="empty-list">Список записей пуст</div>
    <modal :modal-active="showRecordEdit" @hideForm="hideModal">
      <edit-record-form
        :record="target"
        @hideForm="closeEditForm" />
    </modal>
    <modal :modal-active="showTransferEdit" @hideForm="hideModal">
      <edit-transfer-form
        :firstRecord="firstRecord"
        :secondRecord="secondRecord"
        @hideForm="closeEditTransferForm"/>
    </modal>
    <confirm-modal
      :show="show"
      @result="deleteRecord"/>
  </div>
 </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import paginationMixin from '@/mixins/pagination.mixin'
import RecordItem from '@/components/record/RecordItem.vue'
import EditRecordForm from '@/components/record/EditRecordForm.vue'
import EditTransferForm from '@/components/record/EditTransferForm.vue'
export default {
  name: 'Records',
  components: { RecordItem, EditRecordForm, EditTransferForm },
  mixins: [paginationMixin],
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
      selectedRecord: {},

      target: {},
      show: false,
      showRecordEdit: false,
      showTransferEdit: false,

      firstRecord: {},
      secondRecord: {}
    }
  },
  computed: {
    ...mapGetters(['getAllBills', 'getAllRecords', 'getRecordById']),
    billSelectHandler: function() {

      let result = [];
      const records = this.getAllRecords
      if (this.billName === "Все") {
        result = records
      } else {
        result = records.filter(record => {
          return record.bill === this.billName
        });
      }
      return result
    },
    selectByType: function() {

      let result = [];
      const records = this.billSelectHandler
      if (this.typeCome === "Все") {
        result = records
      } else {
        result = records.filter(record => {
          return record.type === this.typeCome
        });
      }
      return result
    },
    isEmptyList() {
      if (this.selectByType.length === 0) return true
      else return false
    },
  },
  methods: {
    ...mapActions(['removeRecordById', 'removeTransfer']),
    async updateList(currentPage) {
      this.page = currentPage
      await this.setupPagination(this.selectByType)
    },
    selectTypeHandler(e) {
      const target = e.target
      const elems = document.querySelectorAll('.pick__type-item')
      elems.forEach(elem => {
        elem.classList.remove('active')
      });
      target.classList.add('active')
      this.typeCome = target.dataset.typeRecord
    },
    editHandler(record) {
      if (!record.transfer) {
        this.target = record
        this.showRecordEdit= true
      } else {
        const firstId = record.transfer.firstRecordId
        const secondId = record.transfer.secondRecordId
        this.firstRecord = this.getRecordById(firstId)
        this.secondRecord = this.getRecordById(secondId)
        this.showTransferEdit = true
      }


    },
    closeEditForm(result) {
      if (result) {
        this.target = {}
        this.showRecordEdit = false
      }
    },
    closeEditTransferForm(result) {
      if (result) {
        this.target = {}
        this.showTransferEdit = false
      }
    },
    hideModal(result) {
      if (result) {
        this.showRecordEdit = false
        this.showTransferEdit = false
      }
    },
    deleteHandler(record) {
      this.show = true
      this.target = record
    },
    async deleteRecord(result) {
      if (result && this.target.id) {
        try {
          if (this.target.transfer) await this.removeTransfer(this.target)
          else await this.removeRecordById(this.target.id)
        } catch (e) {}
      }
      this.show = false
      this.target = {}

    }
  },
  watch: {
    selectByType() {
      this.setupPagination(this.selectByType)
    },

    isPopupForm() {
      const resp = this.getSelectedRecord;
      if (this.isPopupForm) this.isEditRecordForm = false
      if (!resp.transfer) {
        this.isEditTransferForm = false
        this.isEditRecordForm = true
      } else {

        this.isEditRecordForm = false
        const firtId = resp.transfer.firstRecordId
        const secondId = resp.transfer.secondRecordId

        if (firtId && secondId) {
          this.isEditTransferForm = true
          this.firstRecord = this.getRecordById(firtId)
          this.secondRecord = this.getRecordById(secondId)
        } else this.isEditTransferForm = false
      }
    }
  },
  async mounted() {
    this.records = await this.getAllRecords
    this.bills = await this.getAllBills
    await this.setupPagination(this.selectByType)
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