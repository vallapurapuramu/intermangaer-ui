<template>
<div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("destroyToken").then((response) => {
      //this.$store.getters.userDetails = null;
      sessionStorage.removeItem("access_token");
      localStorage.removeItem("user_details");
      this.$router.push({ name: "login" });
    });
  },
};
</script>