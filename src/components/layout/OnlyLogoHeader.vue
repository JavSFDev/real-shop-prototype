<template>
  <header ref="header">
    <span class="logo" @click="gotoHome">
      <img src="../../assets/realshop-logo.png">
    </span>
  </header>
</template>

<script>
export default {
  name: "OnlyLogoHeader",
  provide: {
    oHeight: null,
  },
  methods: {
    gotoHome() {
      this.$router.replace('/');
    }
  },
  mounted() {
    this.oHeight = this.$refs.header.clientHeight;
  }
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding: 10px 10px;
  background-color: #B3A7FF;
}
.logo {
  width: 25%;
  cursor: pointer;
}
@media screen and (min-width: 700px) {
  .logo {
    width: 15%;
  }

}
</style>