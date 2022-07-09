<template>
  <div class="edit-form">
    <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
        <label>Счет</label>
          <span class="error"></span>
        </div>
        <select v-model="candidate.bill">
          <option
            v-for="bill in getAllBills"
            :key="bill.id">
            {{bill.name}}
          </option>
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
          <option
            v-for="item in availableCategories"
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
        <input type="text"
          v-model="candidate.description"
          @input="resetDescriptionError">
      </div>

      <button type="submit" class="row btn">
        Изменить
      </button>
     </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import recordMixin from '@/mixins/validator/record.mixin'
export default {
  name: 'RecordEditForm',
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  mixins: [recordMixin],
  computed: {
    ...mapGetters(['getAllBills', 'getAllCategories']),
    availableCategories() {
      return this.getAllCategories.filter(item => item.type === this.candidate.type)
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
    }
  },
  methods: {
    ...mapActions(['putRecordById']),
    async formHandler() {
      console.log('dd')
      if (!this.checkFormData()) return;
      try {
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
        await this.putRecordById(data)
        this.$emit('hideForm', true)
      } catch (e) {}
      finally {}

    },
  },
  watch: {
    record() {
      console.log(this.record)
      this.candidate = {...this.record}
    }
  },
  async mounted() {
    this.candidate = this.record
  }
}
</script>