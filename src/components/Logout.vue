<template>
<div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("destroyToken").then((response) => {
      sessionStorage.removeItem("access_token");
      localStorage.removeItem("user_details");
      this.$router.push({ name: "login" });
    });
  },
};
</script>