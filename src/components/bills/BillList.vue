<template>
  <div class="list-header">
    <div  v-if="!isEmptyList">
      <table>
      <thead>
        <tr>
         <th>№</th>
         <th>Название</th>
         <th>Валюта</th>
         <th>Начальный баланс</th>
         <th>Действие</th>
       </tr>
      </thead>
      <tbody>
        <bill-item v-for="item of pageItems"
        :key="item.id"
        :bill="item"
        @delete="deleteHandler"
        @edit="editHandler"></bill-item>
      </tbody>
        </table>
        <pagination :pagesAmount="pageCount" :page="page" @currentPage="updateList"/>
    </div>
    <div v-else class="empty-list">Список счетов пуст</div>
    <modal :modal-active="showEdit" @hideModal="hideModal">
      <edit-bill-form
      :bill="target"
      @hideForm="closeEditForm" />
    </modal>
    <confirm-modal :show="show" @result="deleteBill"></confirm-modal>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import paginationMixin from '@/mixins/pagination.mixin'
import BillItem from '@/components/bills/BillItem.vue'
import EditBillForm from '@/components/bills/EditBillForm.vue'
export default {
  components: { BillItem, EditBillForm },
  mixins: [paginationMixin],
  data() {
    return {
      target: {},
      show: false,
      showEdit: false
    }
  },
  computed:  {
    ...mapGetters(['getAllBills']),
    isEmptyList() {
      if (this.getAllBills.length === 0) return true
      else return false
    }
  },
  methods: {
    ...mapActions(['removeBillById']),
    async updateList(currentPage) {
      this.page = currentPage
      await this.setupPagination(this.getAllBills)
    },
    editHandler(bill) {
      this.target = bill
      this.showEdit= true
    },
    closeEditForm(result) {
      if (result) {
        this.target = {}
        this.showEdit = false
      }
    },
    hideModal(result) {
      if (result)   this.showEdit = false
    },
    deleteHandler(bill) {
      this.show = true
      this.target = bill
    },
    async deleteBill(result) {
      if (result && this.target.id) {
        try {
          await this.removeBillById(this.target.id)
        } catch (e) {}
      }
      this.show = false
      this.target = {}

    }
  },
  watch: {
    getAllBills() {
      this.setupPagination(this.getAllBills)
    }
  },
  async mounted() {
    await this.setupPagination(this.getAllBills)
  }

}
</script>

<style lang="scss" scoped>
</style>