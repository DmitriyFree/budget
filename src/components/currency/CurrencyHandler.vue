<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Валюты</div>
      <create-button class="btn" @clickButton="createForm"></create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
      <create-modal v-show="isCreateForm">
        <create-currency-form/>
      </create-modal>
      </div>
      <currency-list/>
      <!-- <main-currency-handler/> -->
    </div>
    <modal v-show="isPopupForm">
      <edit-currency-form />
    </modal>
    <confirm-modal @result="removeCurrency"></confirm-modal>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex"
import CreateCurrencyForm from './CreateCurrencyForm.vue'
import CurrencyList from './CurrencyList.vue'
import MainCurrencyHandler from './MainCurrencyHandler.vue'
import CreateModal from '../modal/CreateModal.vue'
import CreateButton from '../ui/CreateButton.vue'
import Modal from '../modal/Modal.vue';
import EditCurrencyForm from './EditCurrencyForm.vue';
import ConfirmModal from '../modal/ConfirmModal.vue';
export default {
  components: { CreateCurrencyForm, CurrencyList, MainCurrencyHandler, CreateModal, CreateButton, Modal, EditCurrencyForm, ConfirmModal },
  name: 'CurrencyHandler',
  computed: {
    ...mapGetters(['getMainCurrency', 'isCreateForm', 'isPopupForm', 'getConfirmResult', 'getSelectedCurrency'])
  },
  data() {
    return {
      btnActive: false
    }
  },
  methods: {
    ...mapActions(['getCurrencyData', 'removeCurrencyById']),
    ...mapMutations(['changeCreateForm', 'setConfirmResult']),
    createForm(){
      this.changeCreateForm(true);
    },
    removeCurrency(rusult){
      if (rusult) {
        const id = this.getSelectedCurrency.id;
        this.removeCurrencyById(id);
      }
    }
  },
  async mounted() {
    this.getCurrencyData();
  }
}
</script>

<style lang="scss" scoped></style>