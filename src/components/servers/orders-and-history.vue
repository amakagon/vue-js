<template>
    <div class="orders-and-history">
        <div class="label">
            Funts: <strong>{{ getCurrencyFunds }}</strong>  |  Funts In Orders: <strong>{{ getCurrencyIncOrders }}</strong>
        </div>
        <div class="label">
            Last 7 day: <strong>{{ getStatWeekFromId(curr) }}</strong>  |  Last Month: <strong>{{ getStatMonthFromId(curr) }}</strong> |
            All: <strong>{{ getStatAll(curr) }}</strong>
        </div>
        <div class="history">
            <div class="select-view">
                <div class="select-view-row" :class="getStyle(key)" v-for="(key, index) in getHistoryFromId(curr)">
                    <span class="select-view-cell">{{moment(key.timestamp).format('DD.MM HH:MM:ss')}}</span>
                    <span class="select-view-cell">{{key.rate}}</span>
                    <span class="select-view-cell">{{Math.round(key.amount * 10000) / 10000 }}</span>
                    <span class="select-view-cell">({{Math.round(key.amount * key.rate * 10000) / 10000 }})</span>
                </div>
            </div>
        </div>
        <div class="orders">
            <table class="table">
                <tbody>
                <tr>
                    <td>Pair</td>
                    <td>Amount</td>
                    <td>StartPrice</td>
                    <td>DeadPrice</td>
                    <td>Created</td>
                </tr>
                <tr :class="item.type" v-for="(item, index) in getOrdersFromId(curr)">
                    <td>{{item.pair}}</td>
                    <td>{{Math.round(item.amount * 10000) / 10000}}/ ({{ Math.round(item.amount * item.start_price * 10000 ) / 10000}})</td>
                    <td>{{item.start_price}}</td>
                    <td>{{item.dead_price}}</td>
                    <td>{{item.updated_at}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapActions, mapGetters } from "vuex";

    export default {
        name: "orders-and-history",
        props:{
            curr: {
                type: String,
                required: true
            },
        },
        data() {
          return {
              funds: '',
              funds_inc_orders: '',
              moment: moment,
          }
        },
        computed: {
            ...mapGetters({
                getHistoryFromId: "getHistoryFromId",
                getStatWeekFromId: "getStatWeekFromId",
                getStatMonthFromId: "getStatMonthFromId",
                getOrdersFromId: "getOrdersFromId",
                getCurrencyStatusFromId: "getCurrencyStatusFromId",
                getStatAll: "getStatAll"
            }),

            getCurrencyFunds() {
                if(this.getCurrencyStatusFromId(this.curr.split('_')[0])) {
                    return this.getCurrencyStatusFromId(this.curr.split('_')[0]).funds;
                }
            },
            getCurrencyIncOrders() {
                if(this.getCurrencyStatusFromId(this.curr.split('_')[0])) {
                    return this.getCurrencyStatusFromId(this.curr.split('_')[0]).funds_inc_orders;
                }
            }
        },
        methods: {
            getStyle(item) {
               return item.type === 'sell' ? 'bid' : 'ask'
            },
            history(item) {
                return moment(item.timestamp).format('DD.MM HH:MM:ss') + '....' + item.rate + '....' + Math.round(item.amount * 10000) / 10000 + ' / (' + Math.round(item.amount * item.rate * 10000) / 10000 + ')'
            },
        },
    }
</script>

<style lang="scss" scoped>
    .orders-and-history {
        display: flex;
        flex-direction: column;
        height: 100%;

        .label {
            flex: 1;
            color: #333;
            text-align: left;
            font-size: 14px;
            border-bottom: 1px solid rgba(0,0,0,.15);
            font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
            font-weight: normal;
        }
        .history {
            .select-view {
                height: 12rem;
                width: 70rem;
            }
        }
        .orders {
            flex: 1;
        }
        .buy {
            color: #115a11;
        }
        .sell {
            color: rgba(175, 11, 18, 0.93);
        }
        .select-view {
            width: 32rem;
            height: 23rem;
            overflow: auto;
            font-size: 14px;

            &-row { display: flex;
                &:nth-child(even) { background-color: #f5f5f5; }
            }
            &-cell { flex: 0 0 calc(25% - 10px); margin-right: 10px; word-break: break-word; }

            .ask {
                color: #115a11;
            }
            .bid {
                color: rgba(175, 11, 18, 0.93);
            }
        }
    }
</style>
