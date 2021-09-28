<template>
 <div>
   <select name="" id="">
     <option v-for="item in getAllBills" :key="item.id">{{item.name}}</option>
   </select>
  <div class="statistic">
    <div class="statistic__header">
      <div class="statistic__header-title">Баланс</div>
      <div class="statistic__header-result">{{total}}</div>
    </div>
    <div class="statistic__total">
      <div class="top">
        <div class="top-title">Доход</div>
        <div class="top-result">{{income}}</div>
      </div>
      <div class="top-list" v-for="item in inCat" :key="item[0]">
        <category-statistic-item v-bind:item="item[1]"/>
      </div>
      <div class="bottom" @click="bottomActive = !bottomActive">
        <div class="bottom-title">Расход</div>
        <div class="bottom-result">{{outcome}}</div>
      </div>
      <div class="bottom-list" v-for="item in outCat" :key="item[0]" v-bind:class="{done: bottomActive}">
        <category-statistic-item v-bind:item="item[1]"/>
      </div>
    </div>
   </div>

   <!-- <div>
     <span>{{income}}</span>
     <span>{{outcome}}</span>
     <span>{{total}}</span>
   </div>
   <ul v-for="item in outCat" :key="item.key">
     <li>{{item[1].name}} {{item[1].total}}</li>
   </ul> -->
 </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import CategoryStatisticItem from './CategoryStatisticItem.vue';
export default {
  components: { CategoryStatisticItem },
  name: 'Statistic',
  data() {
    return {
      income: 0,
      outcome: 0,
      total: 0,
      inCat: [],
      outCat: [],
      bottomActive: true
    }
  },
  computed: mapGetters(['getAllBills']),
  methods: {
    ...mapActions(['getBills']),
    culcBill(bill) {
      if(bill.records) {
        const incomeRecords = bill.records.filter(record => record.type == 'Доход');
        const outcomeRecords = bill.records.filter(record => record.type == 'Расход');

        this.inCat = this.culcCategory(incomeRecords);
        this.outCat = this.culcCategory(outcomeRecords);

        this.income = this.culcRecords(incomeRecords) + bill.startBalance;
        this.outcome = this.culcRecords(outcomeRecords);

        this.total = this.income - this.outcome;
      }
    },
    culcCategory(records) {
      let arr = new Map();
      records.forEach(record => {
        const nameCategory = record.category;
        if (arr.has(nameCategory)) {
          let obj = arr.get(nameCategory);
          obj.total += +record.sum;
          obj.records.push(record);
          arr.set(record.category, obj);
        } else {
          arr.set(nameCategory, {
            name: nameCategory,
            total: +record.sum,
            records: [record]
          });
        }
      });
      return arr;
    },
    culcRecords(records) {
      let result = 0;
      records.forEach(item => {
        result += +(item.sum);
      });
      return result;
    },
  },
  async mounted() {
    await this.getBills();
    const bills = await this.getAllBills;;
    this.culcBill(bills[0]);
    // this.click();
  }
}
</script>

<style lang="scss" scoped>

.statistic {
    &__header {
      padding: 10px 0;
      border-bottom: 1px solid #aaa;
      display: flex;
      &-title {
        font-size: 20px;
        font-weight: 700;
      }
      &-result {
        font-size: 20px;
        margin-left: 10px;
      }
    }
    &__total {
      padding: 10px 0;
      border-bottom: 1px solid #aaa;
    }
  }
  .top, .bottom {
    display: flex;
    padding: 5px 0;
    font-size: 18px;
    line-height: 20px;
    cursor: pointer;
    &-title {
      font-weight: 700;
    }
    &-result {
      margin-left: 10px;
    }
  }
  .bottom-list {
    transition: 1s;
  }
  .done {
    height: 0;
    overflow: hidden;
  }

</style>