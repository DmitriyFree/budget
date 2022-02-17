<template>
  <tr class="inner" v-bind:class="{income: item.type === 'Доход'}">
    <td>{{item.id}}</td>
    <td>{{item.bill}}</td>
    <td>{{item.category}}</td>
    <td>{{item.type}}</td>
    <td>{{item.date}}</td>
    <td>{{item.description}}</td>
    <td>{{item.sum}}</td>
    <td class="zero">
        <div class="td-btn">
            <div class="edit__btn" @click="editRecord(item.id)">Edit</div>
            <div class="remove__btn" @click="remove(item.id)">Remove</div>
        </div>
      </td>
  </tr>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Modal from '../modal/Modal.vue';
import EditRecordForm from './EditRecordForm.vue';
export default {
  components: {EditRecordForm, Modal},
  name: 'RecorItem',
  props: ['item'],
  computed: mapGetters(['isPopupForm']),
  data() {
    return {
      elem: ''
    }
  },
  methods: {
    ...mapActions(['removeRecordById']),
    ...mapMutations(['changePopupForm', 'setFormData']),

    remove(id) {
      const result = confirm('Вы уверенны?');
      if(result) {
        this.removeRecordById(id);
      }
    },
    editRecord(record) {
      this.elem = this.item;
      this.$emit('edit', this.elem);
    }
  }
}
</script>
<style lang="scss" scoped>
  .inner {
    // display: flex;
    // padding: 20px 0;
    // background: linear-gradient(#28b976, #34cfcf, #28b976);
    background: #ff7293;;
    // margin: 2px 0;
    // background:  #11aaf320;
    // border-bottom: 1px solid #fff;
    // display: grid;
    // grid-template-columns: 150px 100px 100px 100px;
    // align-items: center;
    // padding: 5px 20px;
    &.income {
      background: #73eb73;
    }
    div {
      padding: 3px 10px 3px 0;
      line-height: 20px;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .action {
    display: flex;
    .edit__btn {
      font-size: 14px;
      line-height: 16px;
      background: #42f342;
      padding: 5px 10px;
      text-align: center;
      cursor: pointer;
    }
    .remove__btn {
      font-size: 14px;
      line-height: 16px;
      background: #f081a6;
      margin-left: 15px;
      padding: 5px 10px;
      text-align: center;
      cursor: pointer;
    }

  }
  // .zero {
  //   background: white;
  // }
</style>