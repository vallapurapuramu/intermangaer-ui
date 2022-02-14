<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col md="3" sm="4" xs="4" lg="2" class="side-nav footer-bottom">
          <div class="sticky">
            <navbar></navbar>
          </div>
        </b-col>
        <b-col md="9" sm="8" xs="8" lg="10" class="bg-gray footer-bottom">
          <!-- <menubar></menubar> -->
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from './Navbar.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.side-nav {
  background-color: white;
  min-height: 90vh;
  padding: 0px;
}

.bg-gray {
  background-color: #eee;
  color: #333;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.h3-dispaly {
  display: flex;
  /* width: 15%; */
}
</style>