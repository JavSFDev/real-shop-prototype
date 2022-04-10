<template>
  <header ref="header">
    <span class="logo" @click="gotoHome">
      <img src="../../assets/realshop-logo.png">
    </span>
    <h1 v-if="isManagementPath">shop management</h1>
    <div>
      <span id="requests"><img src="../../assets/requests.png"></span>
      <span id="cart"><img src="../../assets/cart.png"></span>
      <span id="profile" @click="menuIconClicked"><img src="../../assets/profile.png"></span>
    </div>
  </header>
</template>

<script>
export default {
  name: "SignedHeader",
  provide: {
    sHeight: null,
  },
  data() {
    return {
      isMenuActive: false,
    }
  },
  computed: {
    isManagementPath() {
      const thisRoute = this.$route;
      if (thisRoute.name === 'management' || thisRoute.name === 'add' || thisRoute.name === 'edit') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    menuIconClicked() {
      this.$emit('menu-click');
    },
    gotoHome() {
      this.$router.replace('/');
    },
  },
  mounted() {
    this.sHeight = this.$refs.header.clientHeight;
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
  padding: 2px 10px;
  background-color: #B3A7FF;
}
h1 {
  font-size: 0.7em;
  color: #9A93C7;
  margin: 0;
  padding: 0;
}
.logo {
  width: 25%;
  cursor: pointer;
}
div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 24%;
}
span {
  cursor: pointer;
}
#profile {
  width: 25%;
}
#cart {
  width: 30%;
}
#requests {
  width: 30%;
  margin-right: -5px;
}
.clicked {
  background-color: #8E7CFF;
}
.hidden {
  background-color: transparent;
}

@media screen and (min-width: 370px) {
  h1 {
    font-size: 1em;
  }
}

@media screen and (min-width: 700px) {
  div,
  .logo {
    width: 15%;
  }
  h1 {
    font-size: 1.6em;
    margin: 5px 0;
  }
}

</style>