<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Счета</div>
      <div class="btn" @click="createForm">
      </div>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
         <create-modal v-show="isCreateForm">
           <create-bill-form/>
         </create-modal>
      </div>
      <bill-list/>
    </div>
  </div>
</template>
<script>
import CreateModal from '../modal/CreateModal.vue'
import BillList from './BillList.vue'
import CreateBillForm from './CreateBillForm.vue'
import {mapGetters, mapMutations} from "vuex"
export default {
  components: { BillList, CreateBillForm, CreateModal },
  name: 'BillHandler',
  computed: {
    ...mapGetters(['isCreateForm']),
  },
  data() {
    return {
      btnActive: false
    }
  },
  methods: {
    ...mapMutations(['changeCreateForm']),
    createForm(){
      this.changeCreateForm(true);
    }
  }
}
</script>

<style lang="scss" scoped></style>