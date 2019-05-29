import api from '../../../tools/api';
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

} from '../../../store/mutation-types';

export default {


    refreshServerData({ commit }, { serverName , curr }) {
        return api.put(`/api/v1/order/refresh-single/${serverName}`, curr)
            .then((response) => {
                if(response.success === 1) {
                    commit(FETCH_CURRENCY_STATUS_DATA, response.currStatus);
                }
                return Promise.resolve(response);
            })
            .catch((err) => {

            });
    },

    updateServerData({ commit }, { serverName , formData }) {
        return api.put(`/api/v1/currency/update-single/${serverName}`, formData)
            .then((response) => {
                //commit(FETCH_SERVER_DATA, response);
            })
            .catch((err) => {

            });
    },
    calulateServerData({ commit }, { serverName, formData }) {
        return api.post(`/api/v1/currency/calculate/${serverName}`, formData)
            .then((response) => {
                return Promise.resolve(response);
            })
            .catch((err) => {

            });
    },
    deleteServerData({ commit }, { serverName , curr }) {
        return api.delete(`/api/v1/currency/${serverName}/${curr}`)
            .then((response) => {
               commit(DELETE_CURRENCY, curr);
            })
            .catch((err) => {

            });
    },

    fetchHistoryData({ commit }, { currency }) {
        return api.get(`/api/v1/platform/history/${currency}`)
            .then((response) => {
                commit(FETCH_HISTORY_DATA, response.history);
                commit(FETCH_STATWEEK_DATA, response.stat.statWeek);
                commit(FETCH_STATMONTH_DATA, response.stat.statMonth);
                commit(FETCH_STAT_ALL_DATA, response.stat.statAll);
            })
            .catch((err) => {

            });
    },

    fetchSystemData({ commit }, { serverName }) {
        return api.get(`/api/v1/platform/system/${serverName}`)
            .then((response) => {
                commit(RESET_ORDERS_DATA);
                commit(FETCH_ORDERS_DATA, response.algoOrder);
                commit(FETCH_SERVER_DATA, response.algoCurrency);
                commit(FETCH_CURRENCY_STATUS_DATA, response.currStatus);
            })
            .catch((err) => {

            });
    },

    fetchSystemDataLoop({ commit }, { serverName }) {
        return api.get(`/api/v1/platform/system/${serverName}`)
            .then((response) => {
                commit(RESET_ORDERS_DATA);
                commit(FETCH_ORDERS_DATA, response.algoOrder);
                commit(FETCH_CURRENCY_STATUS_DATA, response.currStatus);
            })
            .catch((err) => {

            });
    },

    fetchChartData({ commit }, {serverName, currency, period}) {
        //console.log(serverName, currency, period, "serverName, currency, period")
        return api.get(`/chart/${serverName}/${currency}/${period}`)
            .then((response) => {
                return Promise.resolve(response);
                // commit(RESET_ORDERS_DATA);
                // commit(FETCH_ORDERS_DATA, response.algoOrder);
                // commit(FETCH_CURRENCY_STATUS_DATA, response.currStatus);
            })
            .catch((err) => {

            });
    },
    fetchChartConfig() {
        return api.get(`/api/v1/chart/config`)
            .then((response) => {
                return Promise.resolve(response);
            })
            .catch((err) => {

            });
    },
    fetchServerConfig({ commit }) {
      commit(LOADING, true);
      return api.get(`/api/v1/servers-config`)
            .then((response) => {
                commit(LOADING, false);
                return Promise.resolve(response);
            })
            .catch((err) => {

            });
    },

    fetchLogs({ commit }, { formData }) {
      return api.post(`/api/v1/logs`, formData)
            .then((response) => {
                return Promise.resolve(response);
            })
            .catch((err) => {

            });
    },

    resetServerOrders({ commit }, { formData}) {
        return api.post('api/v1/order/refresh-all', formData)
            .then((response) => {
                return Promise.resolve(response);
            })
            .catch((err) => {

            });
    },


    fetchServersStatus({ commit }) {
        commit(LOADING, { type: 'getLoading', stan: true });
        return api.get(`/api/v1/server-status`)
            .then((response) => {
                commit(LOADING, { type: 'getLoading', stan: false });
                commit(FETCH_SERVERS_STATUS, response);
            })
            .catch((err) => {

            });
    },

    fetchExchangeList({ commit }) {
        commit(LOADING, { type: 'loading_add_currency', stan: true });
        return api.get(`/api/v1/add-currency/exchange-list`)
            .then((response) => {
                commit(LOADING, { type: 'loading_add_currency', stan: false });
                return Promise.resolve(response);
                // commit(FETCH_SERVERSdata_STATUS, response);
            })
            .catch((err) => {

            });
    },

    fetchCurrencyList({ commit }, { name }) {
        commit(LOADING, { type: 'loading_add_currency', stan: true });
        console.log("name", name)
        return api.get(`/api/v1/add-currency/currency-list/${name}`)
            .then((response) => {
                commit(LOADING, { type: 'loading_add_currency', stan: false });
                return Promise.resolve(response);
                // commit(FETCH_SERVERSdata_STATUS, response);
            })
            .catch((err) => {

            });
    },
    updateCurrencyFromExchange({ commit }, { exchange, name }) {
        // commit(LOADING, { type: 'loading_add_currency', stan: true });
        console.log("name", name)
        return api.get(`/api/v1/add-currency/update-single/${exchange}/${name}`)
            .then((response) => {
                // commit(LOADING, { type: 'loading_add_currency', stan: false });
                return Promise.resolve(response);
                // commit(FETCH_SERVERSdata_STATUS, response);
            })
            .catch((err) => {

            });
    },

    searchNewCurrency({ commit }, { formData }) {
        commit(LOADING, { type: 'loading_add_currency_table', stan: true });
        return api.post(`/api/v1/add-currency/search-new-currency`, formData)
            .then((response) => {
                commit(LOADING, { type: 'loading_add_currency_table', stan: false });
                commit(NEW_CURRENCY_SEARCH, response);
                //return Promise.resolve(response);
            })
            .catch((err) => {

            });
    },

    addNewCurrency({ commit }, { formData }) {
        return api.post(`/api/v1/add-currency/add`, formData)
            .then((response) => {
                console.log(response, "response", formData)
                if(response === true) {
                    commit(DELETE_ONE_NEW_CURRENCY_SEARCH, formData.currency)
                }
                return Promise.resolve(response);
            })
            .catch((err) => {
                return Promise.reject(err)
            });
    }
}
