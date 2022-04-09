import { createApp } from "vue";


import App from "./App.vue";
import store from "@/store";
import router from "@/router";



import BaseButton from "@/components/ui/BaseButton";
import UnsignedHeader from "@/components/layout/UnsignedHeader";
import SignedHeader from "@/components/layout/SignedHeader";
import OnlyLogoHeader from "@/components/layout/OnlyLogoHeader";
import TheFooter from "./components/layout/TheFooter";
import Paginator from "./components/ui/Paginator";
import PicturesViewer from "./components/ui/PicturesViewer";




const app = createApp(App);



app.use(store);
app.use(router);



app.component('base-button', BaseButton);
app.component('unsigned-header', UnsignedHeader);
app.component('signed-header', SignedHeader);
app.component('only-logo-header', OnlyLogoHeader);
app.component('paginator', Paginator);
app.component('the-footer', TheFooter);
app.component('pictures-viewer', PicturesViewer);

app.mount("#app");
