<template>
  <div>
    <div class="choice">
      <div class="choice__income" @click="clickIncome">ДОХОД</div>
      <div class="choice__outcome" @click="clickOutcome">РАСХОД</div>
    </div>

    <form class="record-form" @submit.prevent="formHandler" v-show="income === true">
      <div class="record-form__title">Новый доход</div>
      <div class="row">
        <label>Счет</label>
        <select v-model="bill">
          <option v-for="bill in getAllBills" :key="bill.id">{{bill.name}}</option>
        </select>
      </div>
      <div class="row">
        <label>Категория</label>
        <select v-model="category">
          <option v-for="item in incomeCategories" :key="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="row">
        <label>Сумма</label>
        <input type="text" required v-model="sum">
      </div>
      <div class="row">
        <label>Описание</label>
        <input type="text" required v-model="description">
      </div>
      <button type="submit" class="row btn">
        ДОБАВИТЬ
      </button>
    </form>

    <form class="record-form" @submit.prevent="formHandler" v-show="income === false">
      <div class="record-form__title">Новый расход</div>
      <div class="row">
        <label>Счет</label>
        <select v-model="bill">
          <option v-for="bill in getAllBills" :key="bill.id">{{bill.name}}</option>
        </select>
      </div>
      <div class="row">
        <label>Категория</label>
        <select v-model="category">
          <option v-for="item in outcomeCategories" :key="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="row">
        <label>Сумма</label>
        <input type="text" required v-model="sum">
      </div>
      <div class="row">
        <label>Описание</label>
        <input type="text" required v-model="description">
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
      description: ''
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
      if (this.bill && this.category && this.sum) {
        // const selected = this.getAllBills;
        // selected.filter(item => item.name == this.bill);
        // const oneBill = selected[0];
        const date = new Date();
        let type = 'Доход';
        if (!this.income) type = 'Расход';

        const newRecord = {
          bill: this.bill,
          type: type,
          category: this.category,
          date: date.toDateString(),
          sum: this.sum,
          description: this.description
        }
        // oneBill.records.push(newRecord);
        // const data = {
        //   bill: JSON.stringify(oneBill),
        //   id: 1
        // }
        // this.putBillById(data);
        this.addRecord(newRecord)

      }
      this.resetForm();
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