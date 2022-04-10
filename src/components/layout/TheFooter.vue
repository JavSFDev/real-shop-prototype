<template>
  <div id="container" ref="container">
    <div>
      <a href="">privacy</a>
      <a href="">terms</a>
    </div>
    <p>©2021, Realshop, Inc</p>
  </div>
</template>

<script>
export default {
  name: "TheFooter",
  provide: {
    fHeight: null
  },
  mounted() {
    this.fHeight = this.$refs.container.clientHeight;
  }
};
</script>

<style scoped>
#container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  background-color: #94C8DF;
  height: 50px;
}
#container > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80px;
  margin-bottom: 5px;
}
a {
  text-decoration: none;
  font-size: 0.7em;
}
p {
  font-size: 0.7em;
  margin: 0;
  color: #0F6E97;
}

</style>