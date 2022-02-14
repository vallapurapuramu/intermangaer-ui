<template>
  <b-container fluid class="container">
    <b-row>
      <b-col md="12" class="text-center top-30">
        <h4>Welcome to Internship Management Application</h4>
      </b-col>
      <b-col md="4" offset-md="4" class="">
        <div class="login">
          <h4 class="mt-3 text-center">Log In</h4>
          <hr class="mb-0" />
          <b-form class="p-4" @submit.prevent="login">
            <b-form-group
              class="text-left"
              id="username-group-1"
              label="Username:"
              label-for="username"
            >
              <b-form-input
                id="username"
                class="input-field"
                v-model="user.email"
                type="text"
                placeholder="Enter username or email id"
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

            <p class="text-danger">{{ error }}</p>

            <div class="btn-center">
              <b-button variant="primary" type="submit">
                Login
                <font-awesome-icon icon="sign-in-alt" class="m-t-4" />
              </b-button>
            </div>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Loader from "../components/Utils/Loader.vue";
import CryptoJS from "crypto-js";

export default {
  name: "Login",
  components: {
  },
  data() {
    return {
      user: {
        UserName: "",
        email: "",
        password: ""
      },
      error: null,
      spin: false
    };
  },
  methods: {
    login() {
      this.spin = true;
      this.error = null;
      const iv = "sinasinasisinaaa";
      console.log("store Intern", this.$store);
      const cipher = CryptoJS.AES.encrypt(this.user.password, CryptoJS.enc.Utf8.parse("82f2ceed4c503896c8a291e560bd4325"), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC
      });

      this.user.password = cipher.toString();
      this.$store
        .dispatch("retrieveToken", this.user)
        .then(response => {
          let role = response.data.role;
          if (role == "admin") {
            this.loading = false;
            this.$router.push({ name: "dashboard" });
          } else if (role == "user") {
            this.loading = false;
            this.$router.push({ name: "student-dashboard" });
          } else if (role == "faculty") {
            this.loading = false;
            this.$router.push({ name: "faculty" });
          }
        })
        .catch(error => {
          this.spin = false;
          this.user.password = "";
          this.error = error.response.data.error.message;
        });
    },
  },
};
</script>

<style scoped>
.login {
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