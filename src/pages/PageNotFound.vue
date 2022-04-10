<template>
  <div id="container" ref="container">
    <div id="content">
      <div id="the-image"><img src="../assets/sad.png"></div>
      <div id="text">
        <h3>page not found, see
          <router-link to="products">products</router-link>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  mounted() {
    this.$refs.container.style.height = `${window.innerHeight}px`
  }
};
</script>

<style scoped>
#container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
#content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  text-decoration: none;
}
h2 {
  font-size: 1em;
}

@media screen and (min-width: 390px) {
  #text {
    padding: 20px;
    background-color: #F2F2F2;
    margin-top: 10px;
    border-radius: 10px;
  }
}
</style>