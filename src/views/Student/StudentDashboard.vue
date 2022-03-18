<template>
  <div class="outside-gray">
    <b-container fluid>
      <Loader v-bind:spin="spin"></Loader>
      <Dashboard class="inside-gray"/>
    </b-container>
  </div>
</template>

<script>
import Loader from "../../components/Utils/Loader.vue";
import Dashboard from "./Dashboard.vue"

export default {
  components: {
    Loader,
    Dashboard,

  },
  data() {
    return {
      spin: false,
    };
    
  },
  async mounted() {
    this.loading = true;
    await this.getData();
  },
 methods:{
   /**
       * @vuese
       * This methods used to get the data from student dashboard
       */
    async getData(){
        this.$router.push({ name: "student-dashboard" });
      
    },
 }
};
</script>

<style scoped>
.filter {
  padding-top: 5px;
}
.outside-gray{
  background-color: #eee;
  height: 100vh;
}
.w-80 {
  width: 75%;
}
.inside-gray{
  background-color: #eee;
  margin: 0 7% 0 7%;
}
</style>