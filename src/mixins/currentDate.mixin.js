export default {
  methods: {
    getCurrentData() {
      const year = new Date().getFullYear()
      let month = new Date().getMonth()+1
      if(month < 10) month = '0'+ month;
      let day = new Date().getDate();
      if(day < 10) day = '0'+ day;

      return `${year}-${month}-${day}`
    }
  }
}