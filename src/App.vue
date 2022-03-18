<template>
  <div id="app">
    <Header />
    <div class="content">
      <router-view  />
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "./components/Semantic/Header.vue";
import Footer from "./components/Semantic/Footer.vue";
export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
  created() {
    let token = sessionStorage.getItem("access_token");
    this.$axios.defaults.headers.common["Authorization"] = token;
    // we should authorize token here by making API call if the token is invalid then clear localStorage and redirect to login page
     this.$axios.get(`auth/login`).catch((err) => {
      this.$router.push({ name: "login" });
    });
  },
};
</script>

<style>
.vue-form-wizard .wizard-header {
  display: none;
}
 
.vue-form-wizard .wizard-tab-content {
  padding: 20px 20px !important;
  margin-top: 10px;
  
}

.font-weight-550 {
  font-weight: 550;
}

.btn-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.f-15 {
  font-size: 20px;
  margin-top: 10px;
  font-weight: 600;
}

.f-18 {
  font-size: 18px;
}

.f-13 {
  font-size: 13px;
}

/* these colours are for courses */
.Brown {
  background: #bd3c14;
  color: white;
}

.Maroon {
  background: #e41000;
  color: white;
}

.Pink {
  background: #e71f63;
  color: white;
}

.Voilet {
  background: #8f3e97;
  color: white;
}

.Purple {
  background: #65499d;
  color: white;
}

.Darkblue {
  background: #4554a4;
  color: white;
}

.Cyan {
  background: #009688;
  color: white;
}

.Blue {
  background: #0b9be3;
}

.Green {
  background: #8d9900;
}

.Orange {
  background: #fd5d10;
}

.Black {
  background: #333;
  color: white;
}

.content {
  min-height: 87vh;

}

.card-1 {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-2 {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-1:hover {
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.text-captilize {
  text-transform: capitalize;
}

.btn-nw {
    color: #fff;
    background-color: #006747;
    border-color: #006747;
}

.btn-nw:hover {
    color: #fff;
    background-color: #348068;
    border-color: #006747;
}

.btn-nw:focus {
    color: #fff;
    background-color: #006747;
    border-color: #006747;
    box-shadow: 0 0 0 0.2rem rgb(123, 165, 152)
}
</style>
