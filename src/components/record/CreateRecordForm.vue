<template>
  <div class="create-form">
    <div class="choice">
      <div class="choice__income" :class="{'active': candidate.income}" @click="clickIncome">Доход</div>
      <div class="choice__outcome" :class="{'active': !candidate.income}" @click="clickOutcome">Расход</div>
    </div>

    <div  v-show="candidate.income === true">
    <form class="record-form" @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
        <label>Счет</label>
          <span class="error">{{billError}}</span>
        </div>
        <select v-model="candidate.bill" required>
          <option v-for="bill in getAllBills" :key="bill.id">{{bill.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Категория</label>
          <span class="error">{{categoryError}}</span>
        </div>
        <select v-model="candidate.category" required>
          <option v-for="item in incomeCategories" :key="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Сумма</label>
          <span class="error">{{sumError}}</span>
        </div>
        <input type="text" required v-model="candidate.sum" @input="resetSumError">
      </div>

      <div class="row">
        <div class="label">
        <label>Дата</label>
          <span class="error">{{dateError}}</span>
        </div>
        <input type="date" required v-model="candidate.date" @input="resetDateError">
      </div>

      <div class="row">
        <div class="label">
        <label>Описание</label>
          <span class="error">{{descriptionError}}</span>
        </div>
        <input type="text" v-model="candidate.description" @input="resetDescriptionError">
      </div>
      <button type="submit" class="row btn">
        ДОБАВИТЬ
      </button>
    </form>
    </div>

    <div v-show="candidate.income === false">
    <form class="record-form" @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
        <label>Счет</label>
          <span class="error">{{billError}}</span>
        </div>
        <select v-model="candidate.bill">
          <option v-for="bill in getAllBills" :key="bill.id">{{bill.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Категория</label>
          <span class="error">{{categoryError}}</span>
        </div>
        <select v-model="candidate.category">
          <option v-for="item in outcomeCategories" :key="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Сумма</label>
          <span class="error">{{sumError}}</span>
        </div>
        <input type="text" required v-model="candidate.sum" @input="resetSumError">
      </div>

      <div class="row">
        <div class="label">
        <label>Дата</label>
          <span class="error">{{dateError}}</span>
        </div>
        <input type="date" required v-model="candidate.date" @input="resetDateError">
      </div>

      <div class="row">
        <div class="label">
        <label>Описание</label>
          <span class="error">{{descriptionError}}</span>
        </div>
        <input type="text" v-model="candidate.description" @input="resetDescriptionError">
      </div>
      <button type="submit" class="row btn">
        ДОБАВИТЬ
      </button>
    </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
export default {
  name: 'CreateRecordForm',
  data() {
    return {
      candidate: {
        income: true,
        bill: '',
        category: '',
        sum: '',
        date: '',
        description: '',
      },
      billError: '',
      categoryError: '',
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
    ...mapActions(['getBillsData', 'putBillById', 'addRecord']),
    ...mapMutations(['changeCreateForm']),
    clickIncome() {
      this.candidate.income = true;
    },
    clickOutcome() {
      this.candidate.income = false;
    },
    formHandler() {
      if (this.checkFormData()) {

        let type = 'Доход';
        if (!this.candidate.income) type = 'Расход';

        const newRecord = {
          bill: this.candidate.bill,
          type: type,
          category: this.candidate.category,
          date: this.candidate.date,
          sum: this.candidate.sum,
          description: this.candidate.description
        }
        this.changeCreateForm(false);
        this.addRecord(newRecord);
        this.resetForm();
      }

    },
    checkFormData() {
      if (!this.candidate.bill || !this.candidate.category) return false;
      if (this.candidate.description.length > 20) this.descriptionError = 'максимум 20 символов';
      if (!this.candidate.date) this.dateError = 'выберите дату';
      if (isNaN(this.candidate.sum)) this.sumError = 'только число';


      if(this.billError || this.categoryError || this.sumError || this.dateError || this.descriptionError) return false;
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
      this.candidate.bill = '';
      this.candidate.category = '';
      this.candidate.sum = '';
      this.candidate.category = '';
    },
    getCurrentData() {
      const year = new Date().getFullYear();
      let month = new Date().getMonth()+1
      if(month < 10) month = '0'+ month;
      let day = new Date().getDate();
      if(day < 10) day = '0'+ day;

      return `${year}-${month}-${day}`;
    }
  },
  watch: {
    async getAllBills() {
      const billList = this.getAllBills
      if (billList.length == 0) this.billError = 'у вас еще не щетов';
      else {
        if (this.billError === 'у вас еще не щетов') this.billError = '';
      }
    },
    async getAllCategories() {
      const categoryList = this.getAllCategories
      if (categoryList.length == 0) this.categoryError = 'у вас нет категории';
      else {
        if (this.categoryError === 'у вас нет категории') this.categoryError= '';
      }
    }
  },
  async mounted() {
    this.getBillsData();
    this.candidate.date = this.getCurrentData()
  }
}
</script>

<style lang="scss" scoped>
  .create-form {
    & .choice {
      display: flex;
      margin-top: 10px;
      & div {
        cursor: pointer;
        padding: 5px 10px;
        border:  2px solid transparent;
        &.active {
          border: 2px solid #000;
        }
      }
      &__income {
        background: #73eb73;
      }
      &__outcome {
        margin-left: 20px;
        background: #ff426e;
      }
    }
    div .record-form {
      margin-top: 15px;
    }
  }
</style>