import api from '../../../tools/api';
import {
    FETCH_YOBIT_DEPTH,
    FETCH_YOBIT_TRADES,
    FETCH_YOBIT_TICKER
} from '../../../store/mutation-types';

export default {
    fetchYobitData({ commit }, { currency }) {
        return api.get(`/api/v1/platform/yobit/${currency}`)
            .then((response) => {
                commit(FETCH_YOBIT_TICKER, response.ticker);
                commit(FETCH_YOBIT_DEPTH, response.depth);
                commit(FETCH_YOBIT_TRADES, response.trades);
            })
            .catch((err) => {

            });
    }
    // fetchYobitDepth({ commit }, { currency }) {
    //
    //     let split = currency.split('-');
    //     if(split.length >= 40) {
    //        let perChunk = 30
    //
    //         let newArray = split.reduce((resultArray, item, index) => {
    //                 const chunkIndex = Math.floor(index/perChunk)
    //                 if(!resultArray[chunkIndex]) {
    //                     resultArray[chunkIndex] = [] // start a new chunk
    //                 }
    //                 resultArray[chunkIndex].push(item)
    //                 return resultArray
    //             }, []);
    //        newArray.forEach(item => {
    //             api.get(`https://yobit.net/api/3/depth/${item.join('-')}`)
    //                 .then((response) => {
    //                     setTimeout(function(){ console.log("tmeout") }, 3000);
    //                     commit(FETCH_YOBIT_DEPTH, response);
    //                 })
    //         });
    //         return;
    //     }
    //
    //     return api.get(`https://yobit.net/api/3/depth/${currency}`)
    //         .then((response) => {
    //             commit(FETCH_YOBIT_DEPTH, response);
    //         })
    //         .catch((err) => {
    //
    //         });
    // },
    //
    // fetchYobitTrades({ commit }, { currency }) {
    //     let split = currency.split('-');
    //     if(split.length >= 40) {
    //         let perChunk = 30
    //
    //         let newArray = split.reduce((resultArray, item, index) => {
    //             const chunkIndex = Math.floor(index/perChunk)
    //             if(!resultArray[chunkIndex]) {
    //                 resultArray[chunkIndex] = [] // start a new chunk
    //             }
    //             resultArray[chunkIndex].push(item)
    //             return resultArray
    //         }, []);
    //         newArray.forEach(item => {
    //             api.get(`https://yobit.net/api/3/trades/${item.join('-')}`)
    //                 .then((response) => {
    //                     setTimeout(function(){ console.log("tmeout") }, 3000);
    //                     commit(FETCH_YOBIT_TRADES, response);
    //                 })
    //         });
    //         return;
    //     }
    //
    //     return api.get(`https://yobit.net/api/3/trades/${currency}`)
    //         .then((response) => {
    //             commit(FETCH_YOBIT_TRADES, response);
    //         })
    //         .catch((err) => {
    //
    //         });
    // },
    // fetchYobitTicker({ commit }, { currency }) {
    //
    //     if(currency.split('-').length >= 40) {
    //         helperMarkerBig(currency).forEach(item => {
    //             api.get(`https://yobit.net/api/3/ticker/${item.join('-')}`)
    //                 .then((response) => {
    //                     setTimeout(function(){ console.log("tmeout") }, 3000);
    //                     commit(FETCH_YOBIT_TICKER, response);
    //                 })
    //         });
    //         return;
    //     }
    //     return api.get(`https://yobit.net/api/3/ticker/${currency}`)
    //         .then((response) => {
    //             commit(FETCH_YOBIT_TICKER, response);
    //         })
    //         .catch((err) => {
    //
    //         });
    // },


}


function helperMarkerBig(currency) {
    let split = currency.split('-');
    let perChunk = 30
    return split.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index/perChunk)
        if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }
        resultArray[chunkIndex].push(item)
        return resultArray
    }, []);
}
