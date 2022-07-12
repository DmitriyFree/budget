<template>
  <div v-if="isShow">
    <div class="pagination">
      <div class="pagination__nuv" @click="firstPage"><img src="@/assets/images/start.svg" alt=""></div>
      <div class="pagination__nuv" @click="prevPage"><img src="@/assets/images/prev.svg" alt=""></div>
      <div class="pagination__item"
          v-for="num in showPageNumers"
          :key="num"
          :class="{
          'current_page': currentPage === num
          }"
          @click="changePage(num)">
           {{num}}
    </div>
      <div class="pagination__nuv" @click="nextPage"><img src="@/assets/images/next.svg" alt=""></div>
      <div class="pagination__nuv" @click="lastPage"><img src="@/assets/images/end.svg" alt=""></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppPagination',
  props: {
    pagesAmount: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    }

  },
  computed: {
    isShow() {
      if (this.pagesAmount < 2) return false;
      else return true;
    },
    showPageNumers() {
      let retureList = [];
      const page = this.page;
      if (page < 4) {
        let i = 1;
        while (true) {
          if (i > this.pagesAmount) break;
          if (i > 7) break;
          else {
            retureList.push(i);
            i++;
          }
        }
      } else {
        const min = page - 3;
        const max = page + 3;
        let iter = 1;
        while (true) {
          if (iter > this.pagesAmount) break;
          else {
            if (iter > max) break;
            if (iter >= min) retureList.push(iter);
            iter++;
          }
        }
      }
      return retureList
    }
  },
  data() {
    return {
      currentPage: this.page
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      // this.$emit('currentPage', this.currentPage);
    },
    prevPage() {
      if(this.currentPage > 1) this.currentPage --;
      else this.currentPage = 1;
    },
    nextPage() {
      if(this.currentPage < this.pagesAmount) this.currentPage ++;
      else this.currentPage = this.pagesAmount;
    },
    firstPage() {
      this.currentPage = 1;
    },
    lastPage() {
      this.currentPage = this.pagesAmount;
    }
  },
  watch: {
    currentPage() {
      this.$emit('currentPage', this.currentPage);
    },
    async page() {
      this.currentPage = this.page;
      // this.currentPage = await this.page;
    }
  }

}
</script>
<style lang="scss">
.pagination {
  margin-top: 25px;
  display: flex;
  &__nuv {
    background: #1e5f7e;
    padding: 1px 5px;
    margin:0 3px;
    cursor: pointer;
  }
  &__item {
    padding: 5px 10px;
    background: none;
    background: #1e5f7e;
    // background: #11aaf3;
    cursor: pointer;
    color: rgb(255, 255, 255);
    margin:0 3px;
    &.current_page {
      // background: blue;
      // background: #1e5f7e;
      background: transparent;
      color: #fff;
      color:  #1e5f7e;
      border:  1px solid  #1e5f7e;
    }
  }
}
</style>