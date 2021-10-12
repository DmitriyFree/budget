<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Новая запись</div>
      <div class="btn" @click="btnActive = !btnActive" v-bind:class="{active: btnActive}">
      </div>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
        <create-record-form/>
      </div>
      <statistic/>
    </div>
  </div>
</template>

<script>
import CreateRecordForm from './CreateRecordForm.vue'
import Statistic from './Statistic.vue'
export default {
  components: { CreateRecordForm, Statistic },
  name: 'RecordHandler',
  data() {
    return {
      btnActive: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .record-handler {
    padding: 10px 20px;
    &__header {
      padding: 10px 0;
      border-bottom: 1px solid #aaa;
      &-title {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
</style>