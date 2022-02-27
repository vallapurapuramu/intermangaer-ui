<template>
  <div class="outside-gray">
    <b-container fluid>
      <Loader v-bind:spin="spin"></Loader>
      <FacultyDashboard class="inside-gray"/>
    </b-container>
  </div>
</template>

<script>
import Loader from "../../components/Utils/Loader.vue";
import FacultyDashboard  from "./FacultyDashboard.vue"

export default {
  components: {
    Loader,
    FacultyDashboard ,

  },
  data() {
    return {
      spin: false,
    };
    
  },
  async mounted() {
    this.loading = true;
    //await this.getData();
  },
 methods:{
    
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
