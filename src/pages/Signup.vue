<template>
  <div id="container" ref="container">
    <div id="wrapper">
      <h2>create an account</h2>
      <div>
        <label for="first-name">first name:</label>
        <input
          id="first-name"
          type="text"
          v-model.trim="firstName"
          :class="invalid.firstName ? 'error' : ''"
          :placeholder="invalid.firstName"
          @click="invalid.firstName = ''"
        >
      </div>
      <div>
        <label for="last-name">last name:</label>
        <input
          id="last-name"
          type="text"
          v-model="lastName"
          :class="invalid.lastName ? 'error' : ''"
          :placeholder="invalid.lastName"
          @click="invalid.lastName = ''"
        >
      </div>
      <div>
        <label for="email">email:</label>
        <input
          id="email"
          type="email"
          v-model.trim="email"
          :class="invalid.email ? 'error' : ''"
          :placeholder="invalid.email"
          @click="invalid.email = ''"
        >
      </div>

      <div id="verification">
        <label>phone number:</label>
        <div id="none-status" v-if="verifyStatus === 'none'">
          <input
            id="phone"
            type="text"
            placeholder="i.e +1383723320"
            v-model.trim="phoneNumber"
            :disabled="isDisabled">
          <base-button v-if="verifyStatus === 'none'" id="verify-button" @click="startVerify" textBlack
                       :disabled="isDisabled">verify number
          </base-button>
        </div>
        <div id="pending-status" v-else-if="verifyStatus === 'pending'">
          <span class="number">{{ phoneNumber }}</span>
          <button id="change-button" @click="changeNumber">change</button>
          <span class="timer-span" v-if="!sending && !verifying">resending in {{ resendIn }}s</span>
          <span class="timer-span" v-if="sending && !verifying">sending...</span>
          <span class="timer-span" v-if="verifying && !sending">verifying...</span>
        </div>
        <div id="approved-status" v-else>
          <span class="number">{{ phoneNumber }}</span>
          <span id="approved-span">verified</span>
        </div>
        <div id="code-div" v-if="verifyStatus === 'pending'">
          <input id="code" type="text" placeholder="enter sent code" v-model.trim="code">
          <base-button textBlack id="verify-button" @click="verifyCheck">verify</base-button>
        </div>
        <p v-if="error">{{ errorMessage }}</p>
      </div>
      <div id="separator"></div>
      <div id="dob-raw">
        <span>
          <label for="dob">date of birth:</label>
          <input id="dob" type="date" v-model="dob" :class="invalid.dob ? 'non-red-error' : ''"
                 @click="invalid.dob = false">
          <p v-if="invalid.dob">select a date</p>
        </span>
        <span>
          <label for="gender">gender:</label>
          <select id="gender" v-model="gender" :class="invalid.gender ? 'non-red-error' : ''"
                  @click="invalid.gender = false">
            <option disabled value="default">select</option>
            <option value="male" se>male</option>
            <option value="female">female</option>
          </select>
          <p v-if="invalid.gender">select a gender</p>
        </span>
      </div>
      <div>
        <label for="password">password:</label>
        <input
          id="the-password"
          type="password"
          v-model="password"
          :class="invalid.password ? 'error' : ''"
          :placeholder="invalid.password"
          @click="invalid.password = ''"
        >
      </div>
      <div>
        <label for="c-password">confirm password:</label>
        <input
          id="c-password"
          type="password"
          v-model="mPassword"
          :class="invalid.mPassword ? 'error' : ''"
          :placeholder="invalid.mPassword"
          @click="invalid.mPassword = ''"
        >
      </div>
      <div id="buttons-raw">
        <base-button less @click="cancel">cancel</base-button>
        <base-button @click="submitForm" :isDisabled="accountError !== '' || sending">create your account</base-button>
      </div>
      <p v-if="accountError" style="margin-top: 4px;text-align: center;">{{ accountError }}</p>
      <p class="timer-span" v-if="creating" style="text-align: center;">creating...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Signup",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      gender: "default",
      password: "",
      mPassword: "",
      invalid: {
        firstName: "",
        lastName: "",
        email: "",
        dob: false,
        gender: false,
        password: "",
        mPassword: ""
      },
      verifyStatus: "none", /// can be 'approved' 'pending'
      resendIn: 60,
      tries: 0,
      errorMessage: "",
      error: false,
      accountError: "",
      phoneNumber: "",
      code: "",
      invalidNumber: false,
      isDisabled: false,
      interval: null,
      timer: null,
      errorTimer: null,
      sending: false,
      creating: false,
      verifying: false,
      signupError: false,
      validationError: false
    };
  },
  methods: {
    async submitForm() {
      this.validateForm();
      if (this.validationError) {
        return;
      }
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phoneNumber,
        password: this.password,
        dob: this.dob,
        gender: this.gender
      };
      try {
        this.creating = true;
        await this.$store.dispatch("user/signup", payload);
        this.creating = false;
        await this.$router.replace("/start");
      } catch (error) {
        this.creating = false;
        const that = this;
        if (error.name === "exist" || error.name === "many") {
          this.accountError = error.message;
          setTimeout(function() {
            that.accountError = "";
          }, 5000);

        } else {
          this.accountError = "connection error, try again";
          setTimeout(function() {
            that.signupError = false;
          }, 3000);
        }

      }
    },
    validateForm() {
      if (this.firstName === "") {
        this.invalid.firstName = " first name cannot be empty";
        this.validationError = true;
      }
      if (this.lastName === "") {
        this.invalid.lastName = " last name cannot be empty";
        this.validationError = true;
      }
      if (this.email === "") {
        this.invalid.email = " email cannot be empty";
        this.validationError = true;
      } else if (!this.email.includes("@")) {
        this.invalid.email = " invalid email";
        this.email = "";
        this.validationError = true;
      }
      if (this.dob === "") {
        this.invalid.dob = true;
        this.validationError = true;
      }
      if (this.gender === "default") {
        this.invalid.gender = true;
        this.validationError = true;
      }
      if (this.password === "") {
        this.invalid.password = " password cannot be empty";
        this.validationError = true;
      } else if (this.password.length < 8) {
        this.password = "";
        this.invalid.password = " must be minimum 8 characters";
        this.validationError = true;
      }
      if (this.mPassword === "") {
        this.invalid.mPassword = " confirm password cannot be empty";
        this.validationError = true;
      } else if (this.mPassword !== this.password) {
        this.invalid.mPassword = " password did not match";
        this.mPassword = "";
        this.validationError = true;
      }
      const that = this;
      if (this.validationError) {
        setTimeout(function() {
          that.validationError = false;
        }, 1000);
      }
    },
    cancel() {
      this.$router.replace("/");
    },
    changeNumber() {
      this.verifyStatus = "none";
    },
    async startVerify() {
      if (this.phoneNumber === "") {
        this.setError("number field empty");
        return;
      }
      if (!this.phoneNumber.includes("+")) {
        this.setError("include plus(+) sign, i.e +17864711346");
        return;
      }
      try {
        this.isDisabled = true;
        const validationResponseJson  = await axios.get('https://us-central1-cloud-function-demo-brimmann.cloudfunctions.net/validation', {
          params: {
            number: this.phoneNumber,
          }
        });
        if (!validationResponseJson.data.valid) {
          this.setError("invalid number, i.e +17864711346");
          return;
        }

        this.verifyStatus = "pending";


        try {
          this.sending = true;
          await this.initVerifyStart();
          await this.startTimer();
          this.sending = false;
        } catch (error) {
          this.sending = false;
          this.setError("verification error, try again, " + error.message);
        }
      } catch (error) {
        this.setError("validation error, try again, " + error.message);
      }
    },
    async verifyCheck() {
      try {
        this.verifying = true;
        clearTimeout(this.timer);
        clearInterval(this.interval);
        const verifyResponse = await axios.get('https://us-central1-cloud-function-demo-brimmann.cloudfunctions.net/verifyCheck', {
          params: {
            num: this.phoneNumber,
            code: this.code
          }
        })
        this.verifying = false;
        this.verifyStatus = verifyResponse.data.status;
      } catch (error) {
        this.verifying = false;
        this.setError("connection error, try again, " + error.message);
      }
    },
    async initVerifyStart() {
      const verifyResponse = await axios.get('https://us-central1-cloud-function-demo-brimmann.cloudfunctions.net/verifyStart', {
        params: {
          num: this.phoneNumber
        }
      })
      if (verifyResponse.ok) {
        this.isDisabled = false;
      }
    },
    async startTimer() {
      const that = this;
      this.timer = setTimeout(async function() {
        try {
          that.sending = true;
          await that.initVerifyStart();
          that.sending = false;
          that.resendIn = 60;
          clearInterval(that.interval);
          clearTimeout(that.timer);
          await that.startTimer();
        } catch (error) {
          that.setError("resending failed first try");
          try {
            that.sending = true;
            await that.initVerifyStart();
            that.sending = false;
            that.resendIn = 60;
            clearInterval(that.interval);
            clearTimeout(that.timer);
            await that.startTimer();
          } catch (error) {
            that.setError("resending failed second try");
            try {
              that.sending = true;
              await that.initVerifyStart();
              that.sending = false;
              that.resendIn = 60;
              clearInterval(that.interval);
              clearTimeout(that.timer);
              await that.startTimer();
            } catch (error) {

              that.setError("resending failed after three attempts");
              that.verifyStatus = "none";
              clearInterval(that.interval);
              clearTimeout(that.timer);
            }
          }
        }
      }, 59500);

      this.interval = setInterval(function() {
        that.resendIn--;
      }, 1000);
    },
    setError(message) {
      clearTimeout(this.errorTimer);
      this.error = true;
      this.errorMessage = message;
      const that = this;
      this.errorTimer = setTimeout(function() {
        that.error = false;
        that.errorMessage = "";
        that.isDisabled = false;
      }, 4000);
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

.error {
  color: red;
  border: 2px solid red;
}

.non-red-error {
  border: 2px solid red !important;
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

p {
  font-size: 0.8em;
  padding: 0;
  color: red;
  margin: 3px 0;
}

#first-name,
#last-name,
#email,
#separator,
#phone,
#the-password,
#c-password,
#code {
  width: 100%;
  height: 25px;
  font-family: inherit;
  font-size: 1em;
  box-sizing: border-box;
}


#phone {
  width: 50%;
  margin-right: 15px;
  text-space: 20px;
}

#none-status,
#pending-status,
#approved-status,
#code-div {
  display: flex;
  align-items: center;
}

.number,
#change-button,
.timer-span {
  margin: 0 5px 0 0;
  text-align: center;
  font-size: 1em;
  padding: 0;
}

.timer-span {
  font-size: 0.8em;
}

#change-button {
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  margin-bottom: 3px;
}

#verify-button {
  font-size: 1em;
}

.timer-span {
  margin-left: 15px;
  color: #F08D8D;
}

#approved-span {
  color: yellowgreen;
  margin-left: 10px;
}

#code-div {
  width: 150px;
  margin: 10px 0 5px 0;
}

#code {
  font-size: 1em;
  margin-right: 10px;
}


#dob,
#gender {
  background: white none;
  box-shadow: none;
  border: 1px solid gray;
  height: 25px;
  padding: 3px !important;
  margin: 0px;

}


#separator {
  border-bottom: 1px solid #E3E0E0;
  width: 100%;
  height: 0;
}

#dob {
  margin-right: 15px;
  padding-top: 3px;
  padding-bottom: 2px;
  font-family: inherit;
  font-size: 1em;
}

#gender {
  height: 32px;
  font-family: inherit;
  font-size: 1em;
  box-sizing: border-box;
}

#dob-raw {
  display: flex;
  align-items: flex-start;
}

#dob-raw > span {
  display: inline-flex;
  flex-direction: column;
}

#buttons-raw {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px !important;
}

input:focus {
  outline-color: blue;
}

@media screen and (min-width: 353px) {
  #code-div {
    width: 200px;
  }

  .timer-span {
    font-size: 1em;
  }
}

@media screen and (min-width: 390px) {
  #wrapper {
    width: unset;
  }

  #first-name,
  #last-name,
  #email,
  #separator,
  #phone,
  #the-password,
  #c-password {
    width: 350px;
    height: 30px;
  }

  #code {
    width: 100%;
    height: 30px;
  }

  #separator {
    height: 0;
  }

  #phone {
    width: 200px;
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