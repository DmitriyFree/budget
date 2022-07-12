<template>
  <div class="transfer-button" @click.prevent="clickHandler">
    <img src="@/assets/images/transfer.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "AppTransferButton",
  methods: {
    clickHandler(e) {
      this.$emit('clickButton', {});
    }
  }

}
</script>

<style lang="scss" scoped>
.transfer-button {
  position: relative;
  cursor: pointer;
  & img {
    width: 24px;
    height: 24px;
  }
}
</style>