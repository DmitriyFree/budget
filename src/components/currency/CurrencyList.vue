<template>
  <div class="list-header">
    <table>
      <thead>
        <tr>
         <th>№</th>
         <th>Название</th>
         <th>Код</th>
         <th>Курс к {{getMainCurrency.short}}</th>
         <th>Действие</th>
       </tr>
      </thead>
      <tbody>
        <tr v-for="item of getAllCurrencies" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.short}}</td>
          <td>{{item.rate}}</td>
          <td>
            <div class="td-btn">
              <!-- <div class="edit__btn" @click="edit(item.id)">Edit</div> -->
              <edit-button class="edit__btn" @clickButton="edit(item.id)"></edit-button>
              <!-- <div class="remove__btn" @click="confirm(item.id)">Remove</div> -->
              <delete-button class="remove__btn" @clickButton="confirm(item.id)"></delete-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <modal v-show="isPopupForm">
      <edit-currency-form v-bind:currency="elem"/>
    </modal>
    <confirm-modal v-bind:text="message" @result="deleteCurrency"/>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Modal from '../modal/Modal.vue';
import EditCurrencyForm from './EditCurrencyForm.vue';
import ConfirmModal from '../modal/ConfirmModal.vue';
import DeleteButton from '../ui/DeleteButton.vue';
import EditButton from '../ui/EditButton.vue';
export default {
  components: { Modal, EditCurrencyForm, ConfirmModal, DeleteButton, EditButton},
  name: 'CurrencyList',
  data() {
    return {
      elem: 1,
      message: '',
      id: 0
    }
  },
  computed: mapGetters(['getAllCurrencies', 'isPopupForm', 'getCurrencyById', 'getMainCurrency']),
  methods: {
    ...mapActions(['getCurrencyData', 'removeCurrencyById']),
    ...mapMutations(['changePopupForm']),
    confirm(id) {
      this.message = 'Вы уверены? Будут удалены все связанные записи';
      this.id = id;
    },
    deleteCurrency(result){
      if (result) {
        this.removeCurrencyById(this.id);
      }
      this.message = '';
      this.id = 0;
    },
    edit(id) {
      this.changePopupForm(true);
      this.elem = this.getCurrencyById(id);
    }
  },
  async mounted() {
    this.getCurrencyData();
  }
}
</script>

<style lang="scss" scoped>
</style>