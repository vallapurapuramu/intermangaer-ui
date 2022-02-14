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
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import $ from "jquery";
import Navbar from "./Navbar.vue";

$(window).scroll(function() {
  let sticky = $(".sticky"),
    scroll = $(window).scrollTop();

  if (scroll >= 90) {
    sticky.addClass("fixed");
    sticky.addClass("col-sm-2 col-md-3 col-lg-2 p-0");
  } else {
    sticky.removeClass("fixed");
    sticky.removeClass("col-sm-2 col-md-3 col-lg-2 p-0");
  }
});

export default {
  name: "Navigation",
  components: {
    Navbar
  }
};
</script>

<style scoped>
.side-nav {
  min-height: 80vh;
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