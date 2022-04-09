<template>
  <signed-header v-if="isLoggedIn" @menu-click="menuClicked"></signed-header>
  <only-logo-header v-else-if="isNonLogoPath"></only-logo-header>
  <unsigned-header v-else></unsigned-header>

  <transition name="menu" mode="out-in">
    <the-menu
      v-if="isMenuVisible"
      @option1-clicked="shopManagementClicked"
      @option2-clicked="isMenuVisible = false"
      @option3-clicked="isMenuVisible = false"
      @option4-clicked="isMenuVisible = false"
      @option5-clicked="logout"
    ></the-menu>
  </transition>

  <router-view></router-view>
  <the-footer></the-footer>
</template>

<script>

import TheMenu from "./components/ui/TheMenu";
import OnlyLogoHeader from "./components/layout/OnlyLogoHeader";
export default {
  name: "App",
  data() {
    return {
      isMenuVisible: false
    }
  },
  components: { OnlyLogoHeader, TheMenu },
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn'];
    },
    isNonLogoPath() {
      const thisRoute = this.$route;
      if (thisRoute.path === '/login' || thisRoute.path === '/signup' || thisRoute.path === '/start') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    shopManagementClicked() {
      this.isMenuVisible = false;
      this.$router.push('/management');
    },
    menuClicked() {
      document.addEventListener('scroll', this.documentScrollHandler)
      this.isMenuVisible = !this.isMenuVisible;
    },
    documentScrollHandler() {
      document.removeEventListener('scroll', this.documentScrollHandler)
      this.isMenuVisible = false;
    },
    logout() {
      this.isMenuVisible = false
      this.$store.dispatch('user/logout');
    }
  },
  created() {
    this.$store.dispatch('user/tryLogin');
  }
};
</script>

<style>
html {
  font-family: Arial;
  color: black;
}

body {
  margin: 0;
}

img {
  display: inline-block;
  max-width: 100%;
  padding: 0;
  margin: 0;
}

input,
textarea {
  padding: 5px !important;
}

.menu-enter-from {
  transform: translateX(70px);
  opacity: 0;
}
.menu-enter-active{
  transition: all 0.3s ease-in;
}
.menu-enter-to,
.menu-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.menu-leave-active{
  transition: all 0.3s ease-in;
}
.menu-leave-to{
  transform: translateX(70px);
  opacity: 0;
}

</style>
