<template>
  <div>
    <div class="choice">
      <div class="choice__income" @click="clickIncome">ДОХОД</div>
      <div class="choice__outcome" @click="clickOutcome">РАСХОД</div>
    </div>

    <form class="record-form" @submit.prevent="formHandler" v-show="income === true">
      <div class="record-form__title">Новый доход</div>
      <div class="row">
        <div class="label">
        <label>Счет</label>
          <span class="error"></span>
        </div>
        <select v-model="bill" required>
          <option v-for="bill in getAllBills" :key="bill.id">{{bill.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Категория</label>
          <span class="error"></span>
        </div>
        <select v-model="category" required>
          <option v-for="item in incomeCategories" :key="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Сумма</label>
          <span class="error">{{sumError}}</span>
        </div>
        <input type="text" required v-model="sum" @input="resetSumError">
      </div>

      <div class="row">
        <div class="label">
        <label>Дата</label>
          <span class="error">{{dateError}}</span>
        </div>
        <input type="date" required v-model="date" @input="resetDateError">
      </div>

      <div class="row">
        <div class="label">
        <label>Описание</label>
          <span class="error">{{descriptionError}}</span>
        </div>
        <input type="text" v-model="description" @input="resetDescriptionError">
      </div>
      <button type="submit" class="row btn">
        ДОБАВИТЬ
      </button>
    </form>

    <form class="record-form" @submit.prevent="formHandler" v-show="income === false">
      <div class="record-form__title">Новый расход</div>
      <div class="row">
        <div class="label">
        <label>Счет</label>
          <span class="error"></span>
        </div>
        <select v-model="bill">
          <option v-for="bill in getAllBills" :key="bill.id">{{bill.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Категория</label>
          <span class="error"></span>
        </div>
        <select v-model="category">
          <option v-for="item in outcomeCategories" :key="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Сумма</label>
          <span class="error">{{sumError}}</span>
        </div>
        <input type="text" required v-model="sum" @input="resetSumError">
      </div>

      <div class="row">
        <div class="label">
        <label>Дата</label>
          <span class="error">{{dateError}}</span>
        </div>
        <input type="date" required v-model="date" @input="resetDateError">
      </div>

      <div class="row">
        <div class="label">
        <label>Описание</label>
          <span class="error">{{descriptionError}}</span>
        </div>
        <input type="text" v-model="description" @input="resetDescriptionError">
      </div>
      <button type="submit" class="row btn">
        ДОБАВИТЬ
      </button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'CreateRecordForm',
  data() {
    return {
      income: true,
      bill: '',
      category: '',
      sum: '',
      date: '',
      description: '',
      sumError: '',
      dateError: '',
      descriptionError: ''
    }
  },
  computed: {
    ...mapGetters(['getAllCategories', 'getAllBills']),
    incomeCategories() {
      return this.getAllCategories.filter(item => item.type == 'Доход');
    },
    outcomeCategories() {
      return this.getAllCategories.filter(item => item.type == 'Расход');
    }
  },
  methods: {
    ...mapActions(['getBills', 'putBillById', 'addRecord']),
    clickIncome() {
      this.income = true;
    },
    clickOutcome() {
      this.income = false;
    },
    formHandler() {
      if (this.checkFormData()) {

        let type = 'Доход';
        if (!this.income) type = 'Расход';

        const newRecord = {
          bill: this.bill,
          type: type,
          category: this.category,
          date: this.date,
          sum: this.sum,
          description: this.description
        }

        this.addRecord(newRecord)
        this.resetForm();
      }

    },
    checkFormData() {
      if (!this.bill || !this.category) return false;
      if (this.description.length > 20) this.descriptionError = 'максимум 20 символов';
      if (!this.date) this.dateError = 'выберите дату';
      if (isNaN(this.sum)) this.sumError = 'только число';


      if(this.sumError || this.dateError || this.descriptionError) return false;
      return true;
    },
    resetSumError() {
      this.sumError = '';
    },
    resetDateError() {
      this.dateError = '';
    },
    resetDescriptionError() {
      this.descriptionError = '';
    },
    resetForm() {
      this.bill = '';
      this.category = '';
      this.sum = '';
      this.category = '';
    }
   },
    async mounted() {
      this.getBills();
      let dateString = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
      this.date = dateString;
   }
}
</script>

<style lang="scss" scoped>
  .record-form {
    border-bottom: 1px solid #aaa;
    padding: 10px 0 20px;
    &__title {
      font-size: 18px;
      font-weight: 700;
    }
    &__name {
      height: 30px;
    }
    &__type {
      padding: 5px;
    }
    &__btn {
      font-weight: 700;
      color: #000;
      background: #00aacc80;
      padding: 10px 25px;
      border: none;
      cursor: pointer;
    }
  }
  .form-row {
    margin-top: 10px;
    display: block;
    outline: none;
  }
  .choice {
    display: flex;
    padding-top: 15px;
    div {
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      padding: 8px 20px;
      cursor: pointer;
    }
    &__income {
      background: #17e417;
    }
    &__outcome {
      background: #ff270a;
      margin-left: 10px;
    }
  }
</style>