<template>
    <b-container fluid class="container">
    <b-container>
    
    <h4 style="text-align:center">Welcome to InternManager Application Registration</h4>
    
    <b-col md="4" offset-md="4" class="">
    <div class="register">
     <h4 class="mt-3 text-center">Sign Up</h4>
     <hr class="mb-0" />
     <b-form class="p-4" @submit.prevent="register">
     
     <b-form-group
              class="text-left"
              id="username-group-1"
              label="FirstName:"
              label-for="firstname"
            >
              <b-form-input
                id="firstname"
                class="input-field"
                v-model="user.firstname"
                type="text"
                placeholder="Enter First Name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              class="text-left"
              id="username-group-1"
              label="LastName:"
              label-for="lastname"
            >
              <b-form-input
                id="lastname"
                class="input-field"
                v-model="user.lastname"
                type="text"
                placeholder="Enter Last Name"
                required
              ></b-form-input>
            </b-form-group>
      <b-form-group
              class="text-left"
              id="username-group-1"
              label="Email:"
              label-for="username"
            >
              <b-form-input
                id="username"
                class="input-field"
                v-model="user.email"
                type="text"
                placeholder="Enter email id"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              class="text-left"
              id="username-group-1"
              label="Password:"
              label-for="password"
            >
              <b-form-input
                id="password"
                v-model="user.password"
                type="password"
                required
                placeholder="Enter password"
                autocomplete="on"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              class="text-left"
              id="username-group-1"
              label="RePassword:"
              label-for="repassword"
            >
              <b-form-input
                id="password"
                v-model="user.repassword"
                type="password"
                required
                placeholder="Re enter your password"
                autocomplete="on"
              ></b-form-input>
            </b-form-group>
            <p class="text-danger">{{ error }}</p>
            <div class="btn-center">
              <b-button variant="primary" type="register">
                Register
                <font-awesome-icon icon="sign-in-alt" class="m-t-4" />
              </b-button>
            </div>
     </b-form>
    </div>
    </b-col>
    </b-container>
    </b-container>
</template>

<script>
export default{
    name: "Register",
    components:{

    },
    data()
    {
        return{
            user:{
                username:"",
                firstname:"",
                lastname:"",
                email:"",
                repassword:"",
                password:""
                
            },
             error: null,
            spin: false
        };
    },
    methods:{
      /**
       * @vuese
       * This methods takes user details and used for registration
       */
        async register(){
        await this.$axios.post("auth/register",this.user).then((response)=>{
            console.log("edited form data.....",this.user);
          this.$root.$bvToast.toast(`Registered  successfully`, {
            variant: "success",
            autoHideDelay: 5000,
          });
         this.$router.push({ name: "login" });
        }) .catch((error) => {
          console.log("----", error.response.data);
        });
        },
    },
};
</script>


<style scoped>
.register {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 69px;
}

.m-t-4 {
  margin-top: 4px;
}

.top-30 {
  margin-top: 10%;
  margin-bottom: 25px;
}
@media (min-width: 1025px) and (max-width: 1200px) {
  .top-30 {
    margin-bottom: 60px;
  }
}
</style>