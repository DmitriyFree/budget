<template>
  <div class="inner">
    <div>{{item.date}}</div>
    <div>{{item.description}}</div>
    <div>{{item.sum}}</div>
    <div class="action">
      <div class="edit__btn" @click="editRecord(item)">Edit</div>
      <div class="remove__btn" @click="remove(item.id)">Remove</div>
    </div>
    <!-- <modal v-show="getModalActive"> -->
      <!-- <edit-category-form v-bind:category="element"/> -->
      <!-- <edit-record-form v-bind:record="elem"/>
    </modal> -->
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Modal from '../modal/Modal.vue';
import EditRecordForm from './EditRecordForm.vue';
export default {
  components: { Modal, EditRecordForm },
  name: 'RecordStatisticItem',
  props: ['item', 'selectedBill'],
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
      this.setFormData(record);
      this.changePopupForm(true);
    }
  }
}
</script>
<style lang="scss" scoped>
  .inner {
    display: flex;
    // background:  #11aaf320;
    border-bottom: 1px solid #fff;
    display: grid;
    grid-template-columns: 150px 100px 100px 100px;
    align-items: center;
    padding: 5px 20px;
    div {
      font-size: 14px;
      line-height: 16px;
    }
  }
  .action {
    display: flex;
    .edit__btn {
      font-size: 14px;
      line-height: 16px;
      background: #17ac17;
      padding: 5px 10px;
      text-align: center;
      cursor: pointer;
    }
    .remove__btn {
      font-size: 14px;
      line-height: 16px;
      background: #e90909;
      margin-left: 15px;
      padding: 5px 10px;
      text-align: center;
      cursor: pointer;
    }

  }
</style>