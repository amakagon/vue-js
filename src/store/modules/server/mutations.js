import Vue from 'vue';
import {
    FETCH_SERVER_DATA,
    FETCH_HISTORY_DATA,
    FETCH_STATWEEK_DATA,
    FETCH_STATMONTH_DATA,
    FETCH_ORDERS_DATA,
    RESET_ORDERS_DATA,
    FETCH_CURRENCY_STATUS_DATA,
    FETCH_STAT_ALL_DATA,
    DELETE_CURRENCY,
    FETCH_SERVERS_STATUS,
    LOADING,
    NEW_CURRENCY_SEARCH,
    DELETE_ONE_NEW_CURRENCY_SEARCH

} from '../../mutation-types.js';
import initialState from './initial-state';

export default {
    [FETCH_SERVER_DATA] (state, data) {
        state.server_data = {}
        for (const key in data) {
          Vue.set(state.server_data, data[key].name, data[key]);
        }
    },

    [DELETE_CURRENCY] (state, curr) {
        Vue.delete(state.server_data, curr)
    },

    [FETCH_HISTORY_DATA] (state, data) {
        state.history = {}
        for (const key in data) {
            Vue.set(state.history, key, data[key]);
        }
    },
    [FETCH_STATWEEK_DATA] (state, data) {
        state.statWeek = {}
        for (const key in data) {
            Vue.set(state.statWeek, key, data[key]);
        }
    },
    [FETCH_STATMONTH_DATA] (state, data) {
        state.statMonth = {}
        for (const key in data) {
            Vue.set(state.statMonth, key, data[key]);
        }
    },
    [RESET_ORDERS_DATA] (state) {
        Vue.set(state.orders = {})
    },

    [FETCH_ORDERS_DATA] (state, data) {
        state.orders = {}
        for (const key in data) {
            Vue.set(state.orders, key, data[key]);
        }
    },
    [FETCH_CURRENCY_STATUS_DATA] (state, data) {
        state.currency_status = {}
        for (const key in data) {
            Vue.set(state.currency_status, key, data[key]);
        }
    },
    [FETCH_STAT_ALL_DATA] (state, data) {
        state.statAll = {}
        for (const key in data) {
            Vue.set(state.statAll, key, data[key]);
        }
    },

    [FETCH_SERVERS_STATUS] (state, data) {
        state.servers_status = {}
        for (const key in data) {
            Vue.set(state.servers_status, key, data[key]);
        }
    },

    [LOADING] (state, data) {
       Vue.set(state.loading, data.type, data.stan);
    },

    [NEW_CURRENCY_SEARCH] (state, data) {
        state.new_currency_search = {}
        for (const key in data) {
            Vue.set(state.new_currency_search, key, data[key]);
        }
    },

    [DELETE_ONE_NEW_CURRENCY_SEARCH] (state, curr) {
        let key = Object.keys(state.new_currency_search).find(key => state.new_currency_search[key].key === curr)
        Vue.delete(state.new_currency_search, key)
    },
}
