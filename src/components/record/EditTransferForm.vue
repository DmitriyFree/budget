<template>
  <div class="edit-form">
    <form @submit.prevent="formHandler">
      <div class="title">Перевод</div>
      <div class="row">
        <div class="label">
        <label>С</label>
          <span class="error">{{firstBillError}}</span>
        </div>
        <select v-model="firstBill" required @input="resetFirstBillError">
          <option v-for="bill in getAllBills" :key="bill.id" :value="bill" >{{bill.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>В</label>
          <span class="error">{{secondBillError}}</span>
        </div>
        <select v-model="secondBill" required @input="resetSecondBillError">
          <option v-for="bill in getAllBills" :key="bill.id" :value="bill">{{bill.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Сумма</label>
          <span class="error">{{firstSumError}}</span>
        </div>
        <input type="text" required  v-model="firstSum" @input="resetSumError">
      </div>
      <div class="row">
        <div class="label">
        <label>Сумма</label>
          <span class="error">{{secondSumError}}</span>
        </div>
        <input type="text" required :disabled="!isAvailableRate" :value="secondSum" @input="secondSumHandler">
      </div>

      <div class="row">
        <div class="label">
        <label>Курс</label>
          <span class="error">{{rateError}}</span>
        </div>
        <input type="text" required :disabled="!isAvailableRate" v-model="rate" @input="resetSumError">
      </div>

      <div class="row">
        <div class="label">
        <label>Дата</label>
          <span class="error">{{dateError}}</span>
        </div>
        <input type="date" v-model="date" required @input="resteDateError">
      </div>

      <button type="submit" class="row btn">
        Изменить
      </button>
    </form>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'
import transferMixin from '@/mixins/validator/transfer.mixin'
export default {
  name: "EditTransferForm",
  mixins: [transferMixin],
  props: {
    firstRecord: {
      type: Object,
      required: true
    },
    secondRecord: {
      ype: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(['getAllBills', 'getCurrencyBySymbol']),
    isAvailableRate() {
      let result = false;
      if (this.firstBill.currency && this.secondBill.currency) {
        if (this.firstBill.currency != this.secondBill.currency) {
          const firstRate = this.getCurrencyBySymbol(this.firstBill.currency).price
          const secondRate = this.getCurrencyBySymbol(this.secondBill.currency).price
          const res = secondRate / firstRate
          this.rate = res.toFixed(6)
          result = true
        } else this.rate = 1
      }
      return result
    }
  },
  data() {
    return {
      firstBill: '',
      secondBill: '',
      firstSum: 0,
      secondSum: 0,
      rate: 1,
      date: '',
      firstSumTimer: null,
      secondSumTimer: null,
      rateTimer: null,
    }
  },
  methods: {
    ...mapMutations(['changePopupForm']),
    ...mapActions(['addRecord', 'putTransfer']),
    formHandler() {

      if(!this.checkFormData()) {
        return
      }
      if (!this.isAvailableRate) this.secondSum = this.firstSum

      const candidat = {
        firstRecordId: this.firstRecord.id,
        secondRecordId: this.secondRecord.id,
        firstBill: this.firstBill.name,
        secondBill: this.secondBill.name,
        firstSum: this.firstSum,
        secondSum: this.secondSum,
        rate: this.rate,
        date: this.date
      }

      this.putTransfer(candidat)

      this.$emit('hideForm', true)
      this.changePopupForm(false)
      this.resetForm()

    },
    resetSumError() {},
    getCurrentData() {
      const year = new Date().getFullYear()
      let month = new Date().getMonth()+1
      if(month < 10) month = '0'+ month
      let day = new Date().getDate()
      if(day < 10) day = '0'+ day

      return `${year}-${month}-${day}`
    },
  },
  watch: {
    firstRecord() {
      const bills = this.getAllBills
      this.firstBill = bills.find(item => item.name == this.firstRecord.bill)
      this.firstSum =  this.firstRecord.sum
      this.date = this.firstRecord.date
      this.rate = this.firstRecord.transfer.rate
    },
    secondRecord() {
      const bills = this.getAllBills
      this.secondBill = bills.find(item => item.name == this.secondRecord.bill)
      this.secondSum = this.secondRecord.sum
      this.date = this.secondRecord.date
      this.rate = this.secondRecord.transfer.rate
    },
  },
  async mounted() {
      const bills = this.getAllBills
      this.firstBill = bills.find(item => item.name == this.firstRecord.bill)
      this.firstSum =  this.firstRecord.sum

      this.secondBill = bills.find(item => item.name == this.secondRecord.bill)
      this.secondSum = this.secondRecord.sum

      this.date = this.firstRecord.date
  }

}
</script>