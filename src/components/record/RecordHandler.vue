<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Записи</div>
      <div class="btn" @click="createForm">
      </div>
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
export default {
  components: { CreateRecordForm, Records, CreateModal },
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