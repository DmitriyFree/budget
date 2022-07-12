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
        <bill-list-item v-for="item of pageItems"
        :key="item.id"
        :bill="item"
        @delete="deleteHandler"
        @edit="editHandler"></bill-list-item>
      </tbody>
        </table>
        <app-pagination
          :pages-amount="pageCount"
          :page="page"
          @currentPage="updateList">
        </app-pagination>
    </div>
    <div v-else class="empty-list">Список счетов пуст</div>

    <app-modal
      :modal-active="activeEditForm"
      @hideModal="hideEditForm">

      <bill-edit-form
        :bill="target"
        @hideForm="hideEditForm">
      </bill-edit-form>
    </app-modal>

    <app-confirm-modal
      :show="activeConfirmForm"
      @result="deleteBill">
    </app-confirm-modal>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import paginationMixin from '@/mixins/pagination.mixin'
import BillListItem from '@/components/bill/BillListItem.vue'
import BillEditForm from '@/components/bill/BillEditForm.vue'
export default {
  components: { BillListItem, BillEditForm },
  mixins: [paginationMixin],
  data() {
    return {
      target: {},
      activeConfirmForm: false,
      activeEditForm: false
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
    async deleteBill(result) {
      if (result && this.target.id) {
        try {
          await this.removeBillById(this.target.id)
        } catch (e) {}
      }
      this.activeConfirmForm = false
      this.target = {}

    },
    editHandler(bill) {
      this.target = bill
      this.activeEditForm= true
    },
    deleteHandler(bill) {
      this.target = bill
      this.activeConfirmForm = true
    },
    hideEditForm(result) {
      if (result) {
        this.target = {}
        this.activeEditForm = false
      }
    },
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