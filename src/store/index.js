import Vue from 'vue';
import Vuex from 'vuex';

import yobit from './modules/yobit';
import server from './modules/server';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        yobit,
        server
    }
});