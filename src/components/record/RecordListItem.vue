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
        <edit-button class="edit__btn" @clickButton="edit"></edit-button>
        <delete-button class="remove__btn" @clickButton="confirm"></delete-button>
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
      this.$emit('edit', this.record)
    },
    confirm() {
      this.$emit('delete', this.record)
    },
  }
}
</script>
<style lang="scss" scoped>
  .inner td{
    &.outcome span{
       display: block;
       padding: 0 7px;
       background: #ff426e;
       text-align: center;
    }
    &.income span{
      display: block;
      padding: 0 7px;
      background: #73eb73;
      text-align: center;
    }
  }

</style>