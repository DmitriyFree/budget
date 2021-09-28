<template>
  <div class="bills">
    <div class="bills__title">Список категорий</div>
    <table>
      <thead>
        <tr>
         <th>№</th>
         <th>NAME</th>
         <th>CURRENCY</th>
         <th>ACTION</th>
       </tr>
      </thead>
      <tbody>
        <tr v-for="item of getAllBills" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.currency}}</td>
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
  name: 'BillList',
  computed: mapGetters(['getAllBills']),
  methods: {
    ...mapActions(['getBills', 'removeBillById']),
    remove(val) {
      const c = confirm('Вы уверенны?');
      if(c) {
        this.removeBillById(val);
      }

    }
  },
  async mounted() {
    this.getBills();
  }

}
</script>

<style lang="scss" scoped>
  .bills {
    &__title {
      font-size: 18px;
      font-weight: 700;
      padding: 20px 0 10px;
    }
    &-list {
      list-style: none;
    }
  }
  table {
    border-collapse: collapse;
  }
  thead {
    // background: #00aacc;
    background: #11aaf3;
    tr th {
      padding: 10px 15px;
    }
  }
  tbody {
    tr td {
      padding: 10px 15px;
    }
  }
  td, th {
      border: 1px solid #777;
  }
  .td-btn {
    display: flex;
    .edit__btn {
    background: #17ac17;
    padding: 5px 10px;
    text-align: center;
    cursor: pointer;
    }
    .remove__btn {
    background: #e90909;
    margin-left: 15px;
    padding: 5px 10px;
    text-align: center;
    cursor: pointer;
    }
  }

</style>