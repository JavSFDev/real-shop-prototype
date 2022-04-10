export default {
  namespaced: true,
  state() {
    return {
      freshAuth: false,
      token: null,
      userId: null,
      userInfo: {}
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.userInfo = payload.userInfo;
    },
    setGettingStarted(state, payload) {
      state.userInfo.profilePic = payload.profilePic;
      state.userInfo.spot1 = payload.spot1;
      state.userInfo.spot2 = payload.spot2;
      state.userInfo.otherContactInfo = payload.otherContactInfo;
    },
    setFreshAuth(state, rec) {
      state.freshAuth = rec;
    },
    setTestUser(state) {
      state.userId = 'c1';
      state.firstName = 'Mustafa';
      state.lastName = 'Gurkan';
      state.emailAddress = 'mustafa@testuser.com';
      state.phoneNumber = '0553 447 88 92';
      state.otherContactInfo.whatsApp = '0553 447 88 92';
      state.otherContactInfo.telegram = '0553 447 88 92';
      state.dateOfBirth = '5/3/1988';
      state.gender = 'male';
    },
    logoutTestUser(state) {
      state.userId = null;
      state.firstName = '';
      state.lastName = '';
      state.emailAddress = '';
      state.phoneNumber = '';
      state.otherContactInfo.whatsApp = null;
      state.otherContactInfo.telegram = null;
      state.dateOfBirth = null;
      state.gender = null;
    },
  },
  actions: {
    async signup(context, payload) {
      const email = payload.email;
      const password = payload.password;

      delete payload.password;

      context.commit('setFreshAuth', true);

      const signupResponse = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwiGytG-P7lDkR2bCWXQJkZjm_-XhNSsI',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      const signupResponseData = await signupResponse.json();

      if (!signupResponse.ok) {

        if (signupResponseData.error.message === 'EMAIL_EXISTS') {
          const error = new Error('email already exist');
          error.name = 'exist';
          throw error;
        } else if (signupResponseData.err.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          const error = new Error('too many attempts');
          error.name = 'many';
          throw error;
        }
      }

      const userId = signupResponseData.localId;
      const idToken = signupResponseData.idToken;

      await fetch(
        `https://real-shop-test-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(payload),
        }
      );

      // sign up with link
      // put a user with returned id plus other info
      // set the user local
      context.commit('setUser', {
        userId: userId,
        token: idToken,
        userInfo: payload,
      });
    },
    async getStarted(context, payload) {
      // store the picture
      // update put the user with picture link and other contact
      // set set user locally again
      const temp = {
        profilePic: payload.profilePic,
        otherContactInfo: payload.otherContactInfo,
        spot1: payload.spot1,
        spot2: payload.spot2,
      };
      context.commit('setGettingStarted', temp);
      const userInfo = context.getters.getUserInfo;
      const userId = context.getters.getUserId;



      await fetch(
        `https://real-shop-test-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(userInfo),
        }
      );
      context.commit('setFreshAuth', false);
    },
    async login(context, payload) {
      // login
      // get data
      context.commit('setFreshAuth', false);
      const loginResponse = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwiGytG-P7lDkR2bCWXQJkZjm_-XhNSsI', {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      })
      const loginResponseData = await loginResponse.json();
      if (!loginResponse.ok) {
        if (loginResponseData.error.message === 'EMAIL_NOT_FOUND') {
          const error = new Error('no such email registered');
          error.name = 'found';
          throw error;
        } else if (loginResponseData.error.message === 'INVALID_PASSWORD') {
          const error = new Error('incorrect password');
          error.name = 'invalid';
          throw error;
        }
      }
      const token = loginResponseData.idToken;
      const userId = loginResponseData.localId;
      // const refreshToken = loginResponseData.refreshToken;



      const loginUserGetDataResponse = await fetch(`https://real-shop-test-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`);
      const userInfo = await loginUserGetDataResponse.json();

      context.commit('setUser', { userId: userId, token: token, userInfo: userInfo });


      localStorage.setItem('idToken', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

    },
    logout(context) {
      localStorage.removeItem('idToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userInfo');
      context.commit('setUser', { userId: null, token: null, userInfo: {}})
    },
    async tryLogin(context) {
      const idToken = localStorage.getItem('idToken');
      const userId = localStorage.getItem('userId');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!idToken) {
        return;
      }
      context.commit('setUser', { userId: userId, token: idToken, userInfo: userInfo })
    }

  },
  getters: {
    isLoggedIn(state) {
      return !!state.userId;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getUserId(state) {
      return state.userId;
    },
    getFreshAuth(state) {
      return state.freshAuth;
    }
  },
};
