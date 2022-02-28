<template>
  <div class="modal" @click="clickListener" v-bind:class="{show: active}">
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
    active() {
       return this.$store.getters.isPopupForm;
    }
  },
  methods: {
    ...mapMutations(['changePopupForm']),
    closeModal() {
      this.changePopupForm(false);
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

</style>