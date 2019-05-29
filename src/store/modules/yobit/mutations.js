import Vue from 'vue';
import {
    FETCH_YOBIT_DEPTH,
    FETCH_YOBIT_TRADES,
    FETCH_YOBIT_TICKER,

} from '../../mutation-types.js';
import initialState from './initial-state';

export default {
    [FETCH_YOBIT_DEPTH] (state, depths) {
        state.depth = {}
        for (const key in depths) {
           Vue.set(state.depth, key, depths[key]);
        }
    },

    [FETCH_YOBIT_TRADES] (state, trades) {
        state.trade = {}
        for (const key in trades) {
            Vue.set(state.trade, key, trades[key]);
        }
    },
    [FETCH_YOBIT_TICKER] (state, ticker) {
        state.ticker = {}
        for (const key in ticker) {
            Vue.set(state.ticker, key, ticker[key]);
        }
    },

}
