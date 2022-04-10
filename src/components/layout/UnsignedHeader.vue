<template>
  <header ref="header">
    <span class="logo" @click="gotoHome">
      <img src="../../assets/realshop-logo.png">
    </span>
    <div>
      <span>
        <router-link to="/signup">signup</router-link>
        <p> or if already a user</p>
      </span>
      <base-button link to="/login">login</base-button>
    </div>
  </header>
</template>

<script>
export default {
  name: "UnsignedHeader",
  provide: {
    uHeight: null,
  },
  methods: {
    gotoHome() {
      this.$router.replace('/');
    }
  },
  mounted() {
    this.uHeight = this.$refs.header.clientHeight;
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

a,
p {
  font-size: 0.7em;
  display: inline;
}
span {
  margin-right: 8px;
}
.logo {
  margin-top: 4px;
  width: 25%;
  cursor: pointer;
}
@media screen and (min-width: 330px) {
  a,
  p {
    font-size: 0.9em;
  }
}
@media screen and (min-width: 700px) {
  a,
  p {
    font-size: 1.2em;
  }
  .logo {
    width: 15%;
  }
}

</style>