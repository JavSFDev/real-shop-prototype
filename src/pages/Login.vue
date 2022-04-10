<template>
  <div id="container" ref="container">
    <div id="wrapper">
      <h2>login to your account</h2>
      <div>
        <label for="email">email:</label>
        <input id="email" type="email" v-model="email" :placeholder="invalidEmail"
               :class="invalidEmail ? 'invalid' : ''" @click="invalidEmail = ''">
      </div>
      <div>
        <label for="password">password:</label>
        <input id="password" type="password" v-model="password" :placeholder="passwordEmpty"
               :class="passwordEmpty ? 'invalid' : ''" @click="passwordEmpty = ''">
      </div>
      <a href="#">forgot password?</a>
      <div id="buttons-raw">
        <base-button less @click="cancel">cancel</base-button>
        <base-button @click="login" :isDisabled="loggingIn || !!accountError">proceed to login</base-button>
      </div>
      <p class="timer-span" v-if="loggingIn" style="text-align: center;">logging in...</p>
      <p id="con-error" v-if="accountError" style="margin-top: 4px;text-align: center;">{{ accountError }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  inject: ['oHeight', 'sHeight', 'uHeight', 'fHeight'],
  data() {
    return {
      email: "",
      password: "",
      invalidEmail: "",
      passwordEmpty: "",
      errorInForm: false,
      loggingIn: false,
      accountError: ''
    };
  },
  methods: {
    async login() {
      this.validateForm();
      if (this.errorInForm) {
        return;
      }

      try {
        this.loggingIn = true;
        await this.$store.dispatch("user/login", { email: this.email, password: this.password });
        this.loggingIn = false;
        await this.$router.replace('/management');
      } catch (error) {
        this.loggingIn = false;
        const that = this;
        if (error.name === 'found' || error.name === 'invalid') {
          console.log('account error');
          this.accountError = error.message;
          setTimeout(function(){
            that.accountError = '';
          }, 4000);
        } else {
          this.accountError = 'connection error, try again';
          setTimeout(function(){
            that.accountError = '';
          }, 3000);
        }
        console.log('the error: ', error.message);
      }
    },
    validateForm() {
      if (this.email === "") {
        this.invalidEmail = " email cannot be empty";
        this.errorInForm = true;
      } else if (!this.email.includes("@")) {
        this.email = "";
        this.invalidEmail = " invalid email";
        this.errorInForm = true;
      }
      if (this.password === "") {
        this.passwordEmpty = " password cannot be empty";
        this.errorInForm = true;
      }
      const that = this;
      setTimeout(function() {
        that.errorInForm = false;
      }, 1000);
    },
    cancel() {
      this.$router.replace("/");
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
  width: 90%;
}

#wrapper > div {
  margin: 10px 0;
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

#con-error {
  font-size: 0.8em;
  padding: 0;
  color: red;
  margin: 3px 0;
}

a {
  text-decoration: none;
}

input:focus {
  outline-color: blue;
}

.invalid {
  color: red;
  border-color: red;
}

#email,
#password {
  width: 100%;
  height: 25px;
  font-size: 1em;
  font-family: inherit;
  box-sizing: border-box;
}

#buttons-raw {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px !important;
}

@media screen and (min-width: 390px) {
  #wrapper {
    width: unset;
  }

  #email,
  #password {
    width: 350px;
    height: 30px;
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
  }
}
</style>