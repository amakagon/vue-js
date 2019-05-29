export default {
    getServerDataFromId: (state) => id => state.server_data[id],
    getServerData: (state) => () => state.server_data,
    getHistoryFromId: (state) => id => state.history[id],
    getStatWeekFromId: (state) => id => state.statWeek[id],
    getStatMonthFromId: (state) => id => state.statMonth[id],
    getOrdersFromId: (state) => id => state.orders[id],
    getCurrencyStatusFromId: (state) => id => state.currency_status[id],

    getStatAll: (state) => id => state.statAll[id],

    getSortCurrencyAll: (state) => () => state.statAll,
    getStatWeekAll: (state) => () => state.statWeek,
    getStatMonthAll: (state) => () => state.statMonth,

    getServersStatus: (state) => () => state.servers_status,
    getLoading: state => state.loading.getLoading,
    getNewCurrencySearch: state => state.new_currency_search,
}
