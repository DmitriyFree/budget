<template>
  <div class="record-handler">
    <div class="record-handler__header">
      <div class="record-handler__header-title">Новая запись</div>
    </div>
    <div class="record-handler__form">
      <create-record-form/>
      <statistic/>
    </div>
  </div>
</template>

<script>
import CreateRecordForm from './CreateRecordForm.vue'
import Statistic from './Statistic.vue'
export default {
  components: { CreateRecordForm, Statistic },
  name: 'RecordHandler'
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