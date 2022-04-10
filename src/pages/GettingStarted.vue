<template>
  <div id="container" ref="container">
    <div id="wrapper">
      <div>
        <h3>Welcome to ReaLShop</h3>
        <p>
          Please choose a profile picture and your sale spots where you will be shipping your products to your customer.
        </p>
      </div>
      <div id="uploader-wrapper"><uploader profile></uploader></div>
      <div>
        <label for="spot-1">sale spot 1:</label>
        <input id="spot-1" type="text" v-model="spot1" placeholder=" *required" :class="{invalid: invalid}"  @click="invalid = false">
      </div>
      <div>
        <label for="spot-2">sale spot 2:</label>
        <input id="spot-2" type="text" v-model="spot2" placeholder=" optional">
      </div>
      <div style="height: 0; padding: 0; margin: 5px 0; border-bottom: 1px solid #E3E0E0;"></div>
      <div>
        <label for="whatsapp">whatsapp:</label>
        <input id="whatsapp" type="text" v-model="whatsApp" placeholder=" optional">
      </div>
      <div>
        <label for="telegram">telegram:</label>
        <input id="telegram" type="text" v-model="telegram" placeholder=" optional">
      </div>
      <div id="done-button"><base-button @click="startTrade" :isDisable="sending">start your trade</base-button></div>
      <p id="con-error" v-if="gettingStartedError" style="margin-top: 4px;text-align: center;">connection error, try again</p>
      <p class="timer-span" v-if="sending" style="text-align: center;">finishing up...</p>
    </div>
  </div>
</template>

<script>
import Uploader from "../components/shop-management/Uploader";
export default {
  name: "GettingStarted",
  components: { Uploader },
  data() {
    return {
      profilePictureLink: '',
      spot1: null,
      spot2: null,
      whatsApp: null,
      telegram: null,
      gettingStartedError: false,
      invalid: false,
      sending: false
    }
  },
  methods: {
    async startTrade() {
      if (!this.spot1) {
        this.invalid = true;
        return;
      }
      const payload = {
        spot1: this.spot1,
        spot2: this.spot2,
        profilePic: this.profilePictureLink,
        otherContactInfo: {
          whatsApp: this.whatsApp,
          telegram: this.telegram
        }
      }

      try {
        this.sending = true;
        await this.$store.dispatch('user/getStarted', payload);
        this.sending = false;
        await this.$router.replace('/management');
        console.log('router-must-changed');
      } catch (error) {
        this.sending = false;
        this.gettingStartedError = true;
        const that = this;
        setTimeout(function() {
          that.signupError = false;
        }, 3000)
      }
    }
  },
  mounted() {
    this.$refs.container.style.minHeight = `${window.innerHeight}px`;
  }
};
</script>

<style scoped>
#container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
}
#wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
}
#wrapper > div {
  margin: 5px 0;
  width: 100%;
}
h2 {
  text-align: center;
  margin-bottom: 50px;
}
label {
  display: block;
  margin-bottom: 5px;
}
.timer-span {
  margin: 3px 0;
  color: #F08D8D;
  padding: 0;

}
a {
  text-decoration: none;
}
#spot-1,
#spot-2,
#whatsapp,
#telegram{
  width: 100%;
  height: 25px;
  font-family: inherit;
  font-size: 1em;
  box-sizing: border-box;
}
#spot-1::placeholder,
#spot-2::placeholder,
#whatsapp::placeholder,
#telegram::placeholder{
  color: #E3E0E0;
}
.invalid {
  color: red !important;
  border: 2px solid red !important;
}
#spot-1.invalid::placeholder {
  color: red;
}
#done-button {
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#con-error {
  font-size: 0.8em;
  padding: 0;
  color: red;
  margin: 3px 0;
}
@media screen and (min-width: 390px) {
  #spot-1,
  #spot-2,
  #whatsapp,
  #telegram{
    width: 350px;
    height: 30px;
  }
  #uploader-wrapper,
  #wrapper > div{
    width: 350px;
  }

}

@media screen and (min-width: 700px) {
  #container {
    padding: 60px 0;
  }
  #wrapper {
    background-color: #F2F2F2;
    border-radius: 15px;
    padding: 40px;
    width: 430px;
  }
  
}
</style>