<template>
  <div class="list-header">
    <!-- <div class="list-header__title">Список валют</div> -->
    <table>
      <thead>
        <tr>
         <th>№</th>
         <th>TITLE</th>
         <th>SHORT</th>
         <th>ACTION</th>
       </tr>
      </thead>
      <tbody>
        <tr v-for="item of getAllCurrencies" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.short}}</td>
          <td>
            <div class="td-btn">
              <div class="edit__btn" @click="edit(item.id)">Edit</div>
              <div class="remove__btn" @click="remove(item.id)">Remove</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <modal v-show="isPopupForm">
      <edit-currency-form v-bind:currency="elem"/>
    </modal>
    <!-- <modal>
      <edit-currency-form v-bind:currency="elem"/>
    </modal> -->
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Modal from '../modal/Modal.vue';
import EditCurrencyForm from './EditCurrencyForm.vue';
export default {
  components: { Modal, EditCurrencyForm },
  name: 'CurrencyList',
  data() {
    return {
      elem: 1
    }
  },
  computed: mapGetters(['getAllCurrencies', 'isPopupForm', 'getCurrencyById']),
  methods: {
    ...mapActions(['getCurrencyData', 'removeCurrencyById']),
    ...mapMutations(['changePopupForm']),
    remove(id) {
      const result = confirm('Вы уверенны?');
      if(result) {
        this.removeCurrencyById(id);
      }
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
  .currencies {
    &__title {
      font-size: 18px;
      font-weight: 700;
      padding: 20px 0 10px;
    }
    &-list {
      list-style: none;
    }
  }
</style>