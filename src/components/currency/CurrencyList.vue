<template>
  <div class="list-header">
    <div v-if="!isEmptyList">
      <table >
        <thead>
          <tr>
            <th>№</th>
            <th>Название</th>
            <th>Код</th>
            <th>Курс к USD</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
        <currency-list-item
          v-for="item of pageItems"
          :key="item.id"
          :currency="item"
          @edit="editHandler"
          @delete="deleteHandler" >
        </currency-list-item>
        </tbody>
      </table>
      <app-pagination
        :pages-amount="pageCount"
        :page="page"
        @currentPage="updateList" >
      </app-pagination>
    </div>

    <div v-else class="empty-list">Список валют пуст</div>

    <app-modal :modalActive="activeEditForm" @hideModal="hideEditForm">
      <currency-edit-form
        :currency="target"
        @hideForm="hideEditForm">
      </currency-edit-form>
    </app-modal>

    <app-confirm-modal
      :show="activeConfirmForm"
      @result="deleteCurrency">
    </app-confirm-modal>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import paginationMixin from '@/mixins/pagination.mixin'
import CurrencyListItem from '@/components/currency/CurrencyListItem.vue'
import CurrencyEditForm from '@/components/currency/CurrencyEditForm.vue'
export default {
  components: {CurrencyListItem, CurrencyEditForm},
  name: 'CurrencyList',
  mixins: [paginationMixin],
  data() {
    return {
      target: {},
      activeConfirmForm: false,
      activeEditForm: false
    }
  },
  computed: {
    ...mapGetters(['getAllCurrencies']),
    isEmptyList() {
      if (this.getAllCurrencies.length === 0) return true
      else return false
    }
  },
  methods: {
    ...mapActions(['removeCurrencyById']),
    updateList(currentPage) {
      this.page = currentPage
      this.setupPagination(this.getAllCurrencies)
    },
    async deleteCurrency(result) {
      if (result && this.target.id) {
        try {
          await this.removeCurrencyById(this.target.id)
        } catch (e) {}
      }
      this.activeConfirmForm = false
      this.target = {}

    },
    editHandler(currency) {
      this.target = currency
      this.activeEditForm= true
    },
    deleteHandler(currency) {
      this.target = currency
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
    getAllCurrencies() {
      this.setupPagination(this.getAllCurrencies)
    }
  },
  async mounted() {
    await this.setupPagination(this.getAllCurrencies)
  }
}
</script>

<style lang="scss" scoped>
</style>