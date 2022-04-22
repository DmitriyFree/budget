<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Записи</div>
      <create-button class="btn" @clickButton="createForm"></create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
        <create-modal v-show="isCreateForm">
          <create-record-form />
        </create-modal>
      </div>
      <records/>
    </div>
  </div>
</template>

<script>
import CreateRecordForm from './CreateRecordForm.vue'
import Records from './Records.vue'
import CreateModal from '../modal/CreateModal.vue'
import {mapGetters, mapMutations} from 'vuex';
import CreateButton from '../ui/CreateButton.vue';
export default {
  components: { CreateRecordForm, Records, CreateModal, CreateButton },
  name: 'RecordHandler',
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
    createForm() {
      this.changeCreateForm(true);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>