<template>
  <div class="modal" @click="clickListener">
    <div class="modal__content">
      <div class="modal-close__btn">x</div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
  name: 'Modal',
  computed: {
    // ...mapGetters(['getModalActive']),
    active() {
       return this.$store.getters.getModalActive;
    }
  },
  methods: {
    ...mapMutations(['changeModalActive']),
    closeModal() {
      this.changeModalActive(false);
    },
    clickListener(e) {
      const target = e.target;
      if (!target) return
      if (target.classList.contains('modal') || target.classList.contains('modal-close__btn')) {
        this.closeModal();
      }
    }
  },
  async mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape') {
        this.closeModal();
      }
    });
  },
  watch: {
    active() {
      if (this.active) {
        document.documentElement.style.overflow = 'hidden';
        return
      }
      document.documentElement.style.overflow = 'auto';
     }
  }

}
</script>
<style lang="scss" scoped>
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(20, 20, 20, 0.7);
    &__content {
      position: relative;
      max-width: 270px;
      // height: 300px;
      left: 50%;
      top: 200px;
      transform: translateX(-50%);
      background: white;
    }
  }
  .modal-close__btn {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 18px;
    line-height: 18px;
    font-weight: 700;
    color: #fff;
    background: #11aaf3;
    padding: 8px 8px 10px 10px;
    cursor: pointer;
  }
</style>