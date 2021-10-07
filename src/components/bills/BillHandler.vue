<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Счета</div>
      <div class="btn" @click="btnActive = !btnActive" v-bind:class="{active: btnActive}">
      </div>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
         <create-bill-form/>
      </div>
      <bill-list/>
    </div>
  </div>
</template>
<script>
import BillList from './BillList.vue'
import CreateBillForm from './CreateBillForm.vue'
export default {
  components: { BillList, CreateBillForm },
  name: 'BillHandler',
  data() {
    return {
      btnActive: false
    }
  }
}
</script>

<style lang="scss" scoped></style>