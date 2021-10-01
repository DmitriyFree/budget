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

<style lang="scss" scoped>
  // .handler {
  //   padding: 10px 20px;
  //   &__header {
  //     padding: 10px 0;
  //     border-bottom: 1px solid #aaa;
  //     display: flex;
  //     .title {
  //       font-size: 20px;
  //       line-height: 30px;
  //       font-weight: 700;
  //     }
  //     .btn {
  //       position: relative;
  //       width: 30px;
  //       height: 30px;
  //       margin-left: 20px;
  //       border-radius: 3px;
  //       display: flex;
  //       justify-content: flex-end;
  //       align-items: center;
  //       background: #ff4081;
  //       cursor: pointer;
  //       transition: all .5s;
  //       &.active {
  //         // background: #2196f3;
  //         background: #11aaf3;
  //       }
  //       &::before {
  //         content: "+";
  //         position: absolute;
  //         width: 30px;
  //         height: 30px;
  //         display: flex;
  //         justify-content: center;
  //         align-items: center;
  //         font-size: 2em;
  //         font-weight: 400;
  //         color: #fff;
  //         transition: all .5s;
  //       }
  //       &.active::before {
  //         transform: rotate(315deg);
  //       }
  //     }
  //   }
  //   &__content-form {
  //     overflow: hidden;
  //     &.done {
  //       height: 0;
  //     }
  //   }
  // }
</style>