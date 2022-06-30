<template>
  <div class="edit-form">
    <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
        <label>Счет</label>
          <span class="error"></span>
        </div>
        <select v-model="candidate.bill">
          <option v-for="bill in getAllBills" :key="bill.id">{{bill.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Тип</label>
          <span class="error"></span>
        </div>
        <select v-model="candidate.type">
          <option>Доход</option>
          <option>Расход</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Категория</label>
          <span class="error"></span>
        </div>
        <select v-model="candidate.category">
          <option v-for="item in availableCategories" :key="item.id">{{item.name}}</option>
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
        Изменить
      </button>
     </form>

  </div>
</template>
<script>
import {mapMutations, mapGetters, mapActions} from 'vuex';
export default {
  name: 'EditRecordForm',
  props: ['record'],
  computed: {
    ...mapGetters(['getAllBills', 'getAllCategories', 'getFormData', 'getSelectedRecord']),
    availableCategories() {
      return this.getAllCategories.filter(item => item.type == this.candidate.type);
    },
  },
  data() {
    return {
      candidate: {
        id: 0,
        bill: '',
        type: '',
        category: '',
        date: '',
        sum: 0,
        description: '',
      },
      sumError: '',
      dateError: '',
      descriptionError: ''
    }
  },
  methods: {
    ...mapMutations(['changePopupForm']),
    ...mapActions(['getBillsData', 'putRecordById']),
    formHandler() {
      if (!this.checkFormData()) return;
      const data = {
        id: this.candidate.id,
        record: {
          bill: this.candidate.bill,
          type: this.candidate.type,
          category: this.candidate.category,
          date: this.candidate.date,
          sum: this.candidate.sum,
          description: this.candidate.description
        }
      }
      this.putRecordById(data);
      this.$emit('hideForm', true);
      this.changePopupForm(false);
    },
    checkFormData() {
      if (!this.candidate.bill || !this.candidate.type || !this.candidate.category) return false;
      if (this.candidate.description.length > 20) this.descriptionError = 'максимум 20 символов';
      if (!this.candidate.date) this.dateError = 'выберите дату';
      if (isNaN(this.candidate.sum)) this.sumError = 'только число';


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
  },
  watch: {
    getSelectedRecord() {
      this.candidate = {...this.getSelectedRecord}
    }
  },
  async mounted() {
    this.getBillsData();
   }
}
</script>