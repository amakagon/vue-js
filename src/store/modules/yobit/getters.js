export default {
    getDepthFromId: (state) => id => state.depth[id],

    getTradesFromId: (state) => id => state.trade[id],

    getTickerFromId: (state) => id => state.ticker[id],

    getTickerAll: (state) => () => state.ticker,
}
