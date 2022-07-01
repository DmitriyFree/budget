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
import MainCurrencyHandler from '../balance/MainCurrencyHandler.vue'
import CreateModal from '../modal/CreateModal.vue'
import CreateButton from '../ui/CreateButton.vue'
import EditCurrencyForm from './EditCurrencyForm.vue';
export default {
  components: { CreateCurrencyForm, CurrencyList, MainCurrencyHandler, CreateModal, CreateButton, EditCurrencyForm },
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
    async removeCurrency(rusult){
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