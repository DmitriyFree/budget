import _ from 'lodash'

export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      pageCount: 0,
      allItems: [],
      pageItems: []
    }
  },
  methods: {
    setupPagination(items) {
      this.allItems = _.chunk(items, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.pageItems = this.allItems[this.page - 1] || this.allItems[0]
    }
  }
}