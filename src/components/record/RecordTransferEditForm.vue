<template>
  <div class="edit-form">
    <form @submit.prevent="formHandler">
      <div class="title">Перевод</div>
      <div class="row">
        <div class="label">
        <label>С</label>
          <span class="error">{{firstBillError}}</span>
        </div>
        <select required
          v-model="firstBill"
          @input="resetFirstBillError">
          <option
            v-for="bill in getAllBills"
            :key="bill.id"
            :value="bill">
            {{bill.name}}
          </option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>В</label>
          <span class="error">{{secondBillError}}</span>
        </div>
        <select required
          v-model="secondBill"
          @input="resetSecondBillError">
          <option
            v-for="bill in getAllBills"
            :key="bill.id" :value="bill">
            {{bill.name}}
          </option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Сумма</label>
          <span class="error">{{firstSumError}}</span>
        </div>
        <input required
          type="text"
          v-model="firstSum"
          @input="resetFirstSumError">
      </div>
      <div class="row">
        <div class="label">
        <label>Сумма</label>
          <span class="error">{{secondSumError}}</span>
        </div>
        <input required
          type="text"
          :disabled="!isAvailableRate"
          :value="secondSum"
          @input="secondSumHandler">
      </div>

      <div class="row">
        <div class="label">
        <label>Курс</label>
          <span class="error">{{rateError}}</span>
        </div>
        <input required
          type="text"
          :disabled="!isAvailableRate"
          v-model="rate"
          @input="resetRateError">
      </div>

      <div class="row">
        <div class="label">
        <label>Дата</label>
          <span class="error">{{dateError}}</span>
        </div>
        <input required
          type="date"
          v-model="date"
          @input="resteDateError">
      </div>

      <button type="submit" class="row btn">
        Изменить
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import transferMixin from '@/mixins/validator/transfer.mixin'
export default {
  name: "RecordTransferEditForm",
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
      let result = false
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
    ...mapActions(['addRecord', 'putTransfer']),
    async formHandler() {

      if(!this.checkFormData()) {
        return
      }
      if (!this.isAvailableRate) this.secondSum = this.firstSum

      try {
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

        await this.putTransfer(candidat)
        this.$emit('hideForm', true)
      } catch (e) {}
      finally {
        this.resetForm()
      }
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