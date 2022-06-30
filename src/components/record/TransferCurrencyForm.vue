<template>
  <div class="create-form">
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
import {mapMutations, mapGetters, mapActions} from 'vuex';
export default {
  name: "TransferCurrencyForm",
  computed: {
    ...mapGetters(['getAllBills', 'getCurrencyBySymbol']),
    isAvailableRate() {
      let result = false;
      if (this.firstBill.currency && this.secondBill.currency) {
        if (this.firstBill.currency != this.secondBill.currency) {
          const firstRate = this.getCurrencyBySymbol(this.firstBill.currency).price;
          const secondRate = this.getCurrencyBySymbol(this.secondBill.currency).price;
          const res = secondRate / firstRate
          this.rate = res.toFixed(6)
          result = true
        } else this.rate = 1;
      }
      return result;
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
      firstBillError: '',
      secondBillError: '',
      firstSumError: '',
      secondSumError: '',
      rateError: '',
      dateError: '',
      descriptionError: ''
    }
  },
  methods: {
    ...mapActions(['addRecord', 'addTransfer']),
    formHandler() {

      if(!this.checkFormData()) {
        return
      }

      if (!this.isAvailableRate) this.secondSum = this.firstSum;

      const candidat = {
        firstBill: this.firstBill.name,
        secondBill: this.secondBill.name,
        firstSum: this.firstSum,
        secondSum: this.secondSum,
        rate: this.rate,
        date: this.date
      }

      this.addTransfer(candidat);
      this.$emit('hideForm', true);
      this.resetForm();

    },
    secondSumHandler(e) {
      if (this.secondSumTimer) clearTimeout(this.secondSumTimer);
      this.resetSecondSumError();
      this.secondSumTimer = setTimeout(() => {
        const value = e.target.value;
        this.secondSum = value;
        if (isNaN(this.secondSum)) this.secondSumError = 'Только число'
        else if (this.secondSum <= 0) this.secondSumError = 'Введите число больше нуля'
        else this.rate = (this.secondSum / this.firstSum).toFixed(6);
      }, 1000);

    },
    checkFormData() {
      if (!this.firstBill) {
        this.firstBillError = 'Выберете счет'
        return false
      }
      if (!this.secondBill) {
        this.secondBillError = 'Выберете счет'
        return false
      }
      if (this.firstBill.name == this.secondBill.name) {
        this.secondBillError = 'Счета совпадают'
        return false
      }
      if (!this.date) this.dateError = 'выберите дату';

      if(this.firstSumError || this.secondSumError || this.rateError || this.dateError) return false;
      return true;
    },
    resetSumError() {},
    getCurrentData() {
      const year = new Date().getFullYear();
      let month = new Date().getMonth()+1
      if(month < 10) month = '0'+ month;
      let day = new Date().getDate();
      if(day < 10) day = '0'+ day;

      return `${year}-${month}-${day}`;
    },
    resetForm() {
      this.firstBill = ''
      this.secondBill= ''
      this.firstSum = 0
      this.secondSum = 0
      this.rate = 1
      this.date = this.getCurrentData()
    },
    resetFirstBillError() {
      this.firstBillError = ''
    },
    resetSecondBillError() {
      this.secondBillError = ''
    },
    resetFirstSumError() {
      this.firstSumError = ''
    },
    resetSecondSumError() {
      this.secondSumError = ''
    },
    resetRateError() {
      this.rateError = ''
    },
    resteDateError() {
      this.dateError = ''
    },
  },
  watch: {
    firstSum() {
      if (this.firstSumTimer) clearTimeout(this.firstSumTimer);
      this.resetFirstSumError()
      this.firstSumTimer = setTimeout(() => {
        if (isNaN(this.firstSum)) this.firstSumError = 'Только число'
        else if (this.firstSum <= 0) this.firstSumError = 'Введите число больше нуля'
        else {
          if (this.isAvailableRate) this.secondSum = (this.firstSum * this.rate).toFixed(2);
        }

      }, 1000);
    },
    rate() {

      if (this.rateTimer) clearTimeout(this.rateTimer);
      this.resetRateError()
      this.rateTimer = setTimeout(() => {
        if (isNaN(this.rate)) this.rateError = 'Только число'
        else if (this.rate <= 0) this.rateError = 'Введите число больше нуля'
        else this.secondSum = (this.firstSum * this.rate).toFixed(2)
      }, 1000);


    }
  },
  mounted() {
    this.date = this.getCurrentData();
  }

}
</script>