import { createRouter, createWebHistory } from 'vue-router';
import store from "./store";

import Browse from '@/pages/Products';
import ProductDetails from '@/pages/ProductDetails';
import AddProduct from '@/pages/AddProduct';
import EditProduct from '@/pages/EditProduct';
import Cart from '@/pages/Cart';
import TradeActivities from '@/pages/TradeActivities';
import Settings from '@/pages/Settings';
import Requests from '@/pages/Requests';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import PageNotFound from '@/pages/PageNotFound';
import ShopManagement from './pages/ShopManagement';
import GettingStarted from './pages/GettingStarted';
import Forbidden from "./pages/Forbidden";
import FileUploadTest from "./pages/FileUploadTest";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/test', component: FileUploadTest },
    { path: '/products', component: Browse },
    { path: '/products/:id', component: ProductDetails },
    {
      path: '/management',
      name: 'management',
      component: ShopManagement,
      meta: { requireAuth: true },
    },
    {
      path: '/add_product',
      name: 'add',
      component: AddProduct,
      meta: { requireAuth: true },
    },
    {
      path: '/edit_product/:id',
      name: 'edit',
      component: EditProduct,
      meta: { requireAuth: true },
    },
    { path: '/cart', component: Cart, meta: { requireAuth: true } },
    {
      path: '/trade_activities',
      component: TradeActivities,
      meta: { requireAuth: true },
    },
    { path: '/settings', component: Settings, meta: { requireAuth: true } },
    { path: '/requests', component: Requests, meta: { requireAuth: true } },
    { path: '/signup', component: Signup, meta: { forAuth: true } },
    { path: '/login', component: Login, meta: { forAuth: true } },
    { path: '/start', component: GettingStarted, meta: { forFreshAuthOnly: true, requireAuth: true }},
    { path: '/forbidden', component: Forbidden },
    { path: '/:notFound(.*)', component: PageNotFound },
  ],
});

router.beforeEach((to,from, next) => {
  if ((to.meta.requireAuth || from.meta.reqireAuth) && !store.getters["user/isLoggedIn"]) {
    next('/forbidden');
  } else if (to.meta.forAuth && store.getters['user/isLoggedIn']) {
    next('/forbidden');
  } else if (to.meta.forFreshAuthOnly && !store.getters['user/getFreshAuth']) {
    next('/management');
  } else {
    next();
  }
})

export default router;
