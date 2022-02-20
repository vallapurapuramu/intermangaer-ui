<template>
  <div class="header">
    <b-navbar toggleable="lg" class="navbarHeader" fixed>
      <b-navbar-brand href="https://www.nwmissouri.edu/" class="brand" target="_blank"
        ><img src="../../assets/n-large.png"  alt="ltc-logo"
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div
              v-if="this.$route.name !== 'login'"
              class="loginLogoutButtons">
            <div>
              <b-nav-item v-if="!isLoggedIn" class="headerbutton">
                <template v-if="!isLoggedIn"><router-link to="/login" id="links"><span><font-awesome-icon :icon="['fas', 'sign-in-alt']" /> Log In</span></router-link></template>
                </b-nav-item>
              <b-nav-item>
                <b-nav-item-dropdown right v-if="isLoggedIn == true">
                      <template #button-content>
                          <em><span class="colo"><font-awesome-icon :icon="['fas', 'user']" /> {{getName()}}</span></em>
                      </template>
                
                  
                <b-dropdown-item style="color:black;">
                  <b-navbar-brand :to="{name: 'logout'}">
                       Logout
                   </b-navbar-brand>
                </b-dropdown-item>

                  </b-nav-item-dropdown>
              </b-nav-item>
            </div>
        </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {

  data() {
    return{
      name: '',
      username1: null,
    }
  },

  computed:{
      isLoggedIn(){
        if (this.$store.getters.loggedIn){
          return true
        }else{
          return false
        }
        
        
      },
    },

    async mounted() {
      await this.getName();
    },

    methods:{
      getName(){
        this.username1= this.$store.getters.userDetails.firstname;
        return this.username1
      }
    }

}
</script>

<style scoped>
.colo{
  color:white
}
.header{
  position: sticky;
  top: 0px;
  margin: 0px;
  padding: 0px;
  z-index: 1;
}
.navbarHeader {
  background-color: #006747;
  text-align: left;
  font-weight: bold;
  color: whitesmoke;
  /* z-index: 1; */
}
.loginLogoutButtons{
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
}
.headerbutton{
  background: #006747;
   font-weight: bold;
  color: white;
}
.headerbutton span{
  color: white;
  margin-left: 10px;
}
#links{
  text-decoration: none;
}
.brand{
  padding: 0px;
}
</style>