require('vue-flash-message/dist/vue-flash-message.min.css');
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VModal from 'vue-js-modal';

import LoadingCube from '@/components/base/loading/loading-cube.vue'
import ToggleSwitch from 'vuejs-toggle-switch';
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
import VueFlashMessage from 'vue-flash-message';
Vue.config.productionTip = false


Vue.use(ToggleSwitch)
Vue.use(ClientTable);
Vue.use(VueFlashMessage);
Vue.use(VModal);

Vue.component('loading-cube', LoadingCube);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

