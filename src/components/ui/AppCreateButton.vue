<template>
  <div class="create-button tooltip" @click.prevent="clickHandler">
    <span class="tooltiptext">Добавить</span>
  </div>
</template>
<script>
export default {
  name: 'AppCreateButton',
  methods: {
    clickHandler(e) {
      this.$emit('clickButton', {});
    }
  }
}
</script>
<style lang="scss" scoped>
.create-button {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #1e5f7e;
  cursor: pointer;
  transition: all .5s;
  &::before {
    content: "+";
    position: absolute;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
    color: #fff;
    transition: all .5s;
  }
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>