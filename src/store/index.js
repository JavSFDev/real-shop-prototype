import { createStore } from 'vuex';
import productsModule from './products';
import userModule from './user';
import cartModule from './cart';
import requestsModule from './requests';
import tradeActivitiesModule from './trade-activities';
import filterModule from './filter';

const store = createStore({
  modules: {
    products: productsModule,
    user: userModule,
    cart: cartModule,
    requests: requestsModule,
    tradeActivities: tradeActivitiesModule,
    filter: filterModule,
  },
  state() {
    return {
      screenWidth: null
    }
  }
});
export default store;
