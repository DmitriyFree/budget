<template>
  <div class="bg" v-show="show" @click="clickListener">
    <div class="inner">
       <div class="message">{{text || "Вы уверены"}}</div>
      <div class="buttons">
        <div class="buttons__item-ok">Да</div>
        <div class="buttons__item-cansel">Отменить</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppConfirmModal',
  props: {
    text: {
      type: String,
      required: false
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clickListener(e) {
      const target = e.target;
      if (!target) return
      if (target.classList.contains('bg') || target.classList.contains('buttons__item-cansel')) {
        this.$emit('result', false);
      } else if (target.classList.contains('buttons__item-ok')) {
        this.$emit('result', true);
      }
    },
  },
  async mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape') {
        this.$emit('result', false)
      }
    })
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/confirm-modal.scss';
</style>