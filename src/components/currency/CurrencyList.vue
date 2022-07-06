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
        <currency-item  v-for="item of pageItems"
          :key="item.id"
          :currency="item"
          @delete="deleteHandler" ></currency-item>
        </tbody>
      </table>
      <pagination :pagesAmount="pageCount" :page="page" @currentPage="updateList" ></pagination>
    </div>

    <div v-else class="empty-list">Список валют пуст</div>

    <confirm-modal
      :show="show"
      @result="deleteCurrency"/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import paginationMixin from '@/mixins/pagination.mixin'
import CurrencyItem from './CurrencyItem.vue'
export default {
  components: {CurrencyItem},
  name: 'CurrencyList',
  mixins: [paginationMixin],
  data() {
    return {
      target: {},
      show: false
    }
  },
  computed: {
    ...mapGetters(['getAllCurrencies']),
    isEmptyList() {
      if (this.getAllCurrencies.length === 0) return true
      else return false;
    }
  },
  methods: {
    ...mapActions(['removeCurrencyById']),
    updateList(currentPage) {
      this.page = currentPage
      this.setupPagination(this.getAllCurrencies)
    },
    deleteHandler(category) {
      this.show = true
      this.target = category
    },
    async deleteCurrency(result) {
      if (result && this.target.id) {
        try {
          await this.removeCurrencyById(this.target.id)
        } catch (e) {}
      }
      this.show = false
      this.target = {}

    }

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