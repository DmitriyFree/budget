<template>
  <tr class="inner">
    <td>{{record.id}}</td>
    <td>{{record.bill}}</td>
    <td>{{record.category}}</td>
    <td v-bind:class="{income: record.type === 'Доход', outcome: record.type === 'Расход'}">
      <span>{{record.type}}</span>
    </td>
    <td>{{record.date}}</td>
    <td>{{record.description}}</td>
    <td>{{record.sum}}</td>
    <td>
      <div class="td-btn">
        <app-edit-button class="edit__btn" @clickButton="edit"></app-edit-button>
        <app-delete-button class="remove__btn" @clickButton="confirm"></app-delete-button>
      </div>
    </td>
  </tr>
</template>
<script>
export default {
  name: 'RecordListItem',
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  methods: {
    edit() {
      this.$emit('edit', {...this.record})
    },
    confirm() {
      this.$emit('delete', {...this.record})
    },
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
  .inner td{
    &.outcome span{
       display: block;
       padding: 0 7px;
       background: $outcome_color;
       text-align: center;
    }
    &.income span{
      display: block;
      padding: 0 7px;
      background: $income_color;
      text-align: center;
    }
  }

</style>