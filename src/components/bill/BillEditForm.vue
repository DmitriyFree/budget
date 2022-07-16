<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{nameError}}</span>
        </div>
        <input required
          type="text"
          v-model="candidate.name"
          @input="resetNameError">
      </div>
       <div class="row">
        <div class="label">
          <label>Валюта</label>
          <span class="error show">{{currencyError}}</span>
        </div>
        <select required
          v-model="candidate.currency"
          @input="resetCurrencyError">
          <option
            v-for="item in getAllCurrencies"
            :key="item.id" >
            {{item.symbol}}
          </option>
        </select>
      </div>
      <div class="row">
        <div class="label">
          <label>Начальный баланс</label>
          <span class="error">{{startBalanceError}}</span>
        </div>
        <input
          type="text"
          v-model="candidate.startBalance"
          @input="resetStartBalanceError">
      </div>
      <button type="submit" class="row btn">
        Изменить
      </button>
     </form>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import billMixin from '@/mixins/validator/bill.mixin'
import useVuelidate from '@vuelidate/core'
export default {
  name: 'BillEditForm',
  mixins: [billMixin],
  setup () {
    return { v$: useVuelidate() }
  },
  props: {
    bill: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getAllCurrencies'])
  },
  data() {
    return {
      candidate: {
        id: 1,
        name: '',
        currency: '',
        startBalance: 0,
      },
    }
  },
  methods: {
    ...mapActions(['putBillById']),
    async formHandler() {
      if (this.checkFormData())
      try {
        if (!this.candidate.startBalance) candidate.startBalance = 0
        const data = {
          id: this.candidate.id,
          bill: {
            name: this.candidate.name,
            currency: this.candidate.currency,
            startBalance: this.candidate.startBalance
          }
        }
        await this.putBillById(data)
      } catch (e) {}
      finally {
        this.$emit('hideForm', true)
      }
    },
  },
  watch: {
    bill() {
      this.candidate =  {...this.bill}
    }
  },
  mounted() {
    this.candidate = {...this.bill}
  }
}
</script>
<style lang="scss" scoped></style>