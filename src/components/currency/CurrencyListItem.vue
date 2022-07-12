<template>
  <tr>
    <td>{{currency.id}}</td>
    <td>{{currency.title}}</td>
    <td>{{currency.symbol}}</td>
    <td>{{currency.price}}</td>
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
  name: 'CurrencyListItem',
  props: {
    currency: {
      type: Object,
      required: true
    }
  },
  methods: {
    edit() {
      this.$emit('edit', {...this.currency})
    },
    confirm() {
      this.$emit('delete', {...this.currency})
    },
  },
}
</script>

<style lang="scss" scoped></style>