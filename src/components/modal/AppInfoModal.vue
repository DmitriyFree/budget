<template>
  <div class="bg" v-show="isShow" @click="clickListener">
    <div class="inner">
       <div class="message">{{message}}</div>
      <div class="buttons">
        <div class="buttons__item-ok">Oк</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppInfoModal',
  props: {
    text: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    clickListener(e) {
      const target = e.target;
      if (!target) return
      if (target.classList.contains('bg') || target.classList.contains('buttons__item-ok')) {
        this.isShow = false
      }
    },
  },
  async mounted() {
    this.isShow = this.show
    this.message = this.text
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape') {
        this.isShow = false
      }
    })
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/confirm-modal.scss';
</style>