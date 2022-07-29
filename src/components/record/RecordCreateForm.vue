<template>
  <div class="create-form">
    <div class="choice">
      <div
        class="choice__income"
        :class="{'active': candidate.income}"
        @click="clickIncome">
        Доход
      </div>
      <div
        class="choice__outcome"
        :class="{'active': !candidate.income}"
        @click="clickOutcome">
        Расход
      </div>
    </div>

    <div  v-show="candidate.income === true">
    <form class="record-form" @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
        <label>Счет</label>
          <span class="error">{{billError}}</span>
        </div>
        <select v-model="candidate.bill" required>
          <option
            v-for="bill in getAllBills"
            :key="bill.id">
            {{bill.name}}
          </option>
        </select>
      </div>

      <div class="row">
        <div class="label">
        <label>Категория</label>
          <span class="error">{{categoryError}}</span>
        </div>
        <select v-model="candidate.category" required>
          <option
            v-for="item in incomeCategories"
            :key="item.id">
            {{item.name}}
          </option>
        </select>
      </div>

      <div class="row">
        <div class="label">
        <label>Сумма</label>
          <span class="error">{{sumError}}</span>
        </div>
        <input required
          type="text"
          v-model="candidate.sum"
          @input="resetSumError">
      </div>

      <div class="row">
        <div class="label">
        <label>Дата</label>
          <span class="error">{{dateError}}</span>
        </div>
        <input required
          type="date"
          v-model="candidate.date"
          @input="resetDateError">
      </div>

      <div class="row">
        <div class="label">
        <label>Описание</label>
          <span class="error">{{descriptionError}}</span>
        </div>
        <input
          type="text"
          v-model="candidate.description"
          @input="resetDescriptionError">
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
import {mapActions, mapGetters, mapMutations} from 'vuex'
import recordMixin from '@/mixins/validator/record.mixin'
import currentDateMixin from '@/mixins/currentDate.mixin'
import useVuelidate from '@vuelidate/core'
export default {
  name: 'RecordCreateForm',
  mixins: [
    recordMixin,
    currentDateMixin
  ],
    setup () {
    return { v$: useVuelidate() }
  },
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
      this.candidate.income = true
    },
    clickOutcome() {
      this.candidate.income = false
    },
    async formHandler() {
      if (this.checkFormData()) {

        let type = 'Доход'
        if (!this.candidate.income) type = 'Расход'

        try {
          const newRecord = {
            bill: this.candidate.bill,
            type: type,
            category: this.candidate.category,
            date: this.candidate.date,
            sum: this.candidate.sum,
            description: this.candidate.description
           }
          await this.addRecord(newRecord)
          this.resetForm()
        } catch (e) {}
        finally {
          this.$emit('hideForm', true)
        }
      }

    },
  },
  watch: {
    async getAllBills() {
      const billList = this.getAllBills
      if (billList.length === 0) this.billError = 'у вас еще не щетов'
      else {
        if (this.billError === 'у вас еще не щетов') this.billError = ''
      }
    },
    async getAllCategories() {
      const categoryList = this.getAllCategories
      if (categoryList.length === 0) this.categoryError = 'у вас нет категории'
      else {
        if (this.categoryError === 'у вас нет категории') this.categoryError= ''
      }
    }
  },
  async mounted() {
    this.candidate.date = this.getCurrentData()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
  .create-form {
    & .choice {
      display: flex;
      margin-top: 10px;
      & div {
        cursor: pointer;
        padding: 5px 10px;
        border:  2px solid transparent;
        &.active {
          border: 2px solid $text_color;
        }
      }
      &__income {
        background: $income_color;
      }
      &__outcome {
        margin-left: 20px;
        background: $outcome_color;
      }
    }
    div .record-form {
      margin-top: 15px;
    }
  }
</style>