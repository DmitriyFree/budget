<template>
  <!-- <div class="currencies">
    <div class="currencies__title">Список валют</div>
    <ul class="currencies-list" v-for="item of getAllCurrencies" :key="item.id">
     <currency-item v-bind:item="item"/>
    </ul>
  </div> -->
  <div class="list-header">
    <div class="list-header__title">Список валют</div>
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
              <div class="edit__btn">Edit</div>
              <div class="remove__btn" @click="remove(item.id)">Remove</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'CurrencyList',
  computed: mapGetters(['getAllCurrencies']),
  methods: {
    ...mapActions(['getCurrencyData', 'removeCurrencyById']),
    remove(id) {
      const result = confirm('Вы уверенны?');
      if(result) {
        this.removeCurrencyById(id);
      }
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