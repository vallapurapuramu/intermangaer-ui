<template>
  <div v-if="spin">
    <div id="overlay" style="display: block;"></div>
    <div id="spinner">
      <font-awesome-icon icon="circle-notch" spin class="m-1 f-20" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    spin: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.f-20 {
  font-size: 40px;
}

#overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

#overlay {
  background: black;
  backdrop-filter: blur(4px);
  opacity: 0.4;
  z-index: 200;
  display: none;
}

#spinner {
  position: absolute;
  top: 40%;
  left: 50%;
  z-index: 300;
  color: #eee;
  padding: 15px;
  background: #006747;
  border: 1px solid;
}

</style>