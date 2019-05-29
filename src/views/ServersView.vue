<template>
    <div class="container-fluid">
        <div class="server-nav" v-if="!serverLoading">
            <div class="radio-btn-group">
              <div class="radio">
                <input type="radio" name="radio" value="all" checked="checked" v-model="showRules" id="all"/>
                <label for="all">All</label>
              </div>
              <div class="radio">
                <input type="radio" name="radio" value="active" checked="checked" v-model="showRules" id="active"/>
                <label for="active">Active</label>
              </div>
              <div class="radio">
                <input type="radio" name="radio" value="inactive" v-model="showRules" id="in_active"/>
                <label for="in_active">Inactive</label>
              </div>
                <div class="total">
                    <label>Total: {{currencyActive + currencyInactive}} ( {{currencyActive}} / {{currencyInactive}} )</label>
                </div>
               <div class="filterLabel">
                    <label>Sort by: </label>
                </div>
               <div class="radio">
                <input type="radio" name="sort" value="none" checked="checked" v-model="filterRules" id="none" @click="sortNone()"/>
                <label for="none">None</label>
              </div>
              <div class="radio">
                <input type="radio" name="sort" value="tradeVol" v-model="filterRules" id="tradeVol" @click="sortVol()"/>
                <label for="tradeVol">TradeVol</label>
              </div>
              <div class="radio">
                <input type="radio" name="sort" value="profitAll" v-model="filterRules" id="profitAll" @click="sort(getSortCurrencyAll)"/>
                <label for="profitAll">Profit All</label>
              </div>
              <div class="radio">
                <input type="radio" name="sort" value="profitLastMonth" v-model="filterRules" id="profitLastMonth" @click="sort(getStatMonthAll)"/>
                <label for="profitLastMonth">Profit Last Month</label>
              </div>
              <div class="radio">
                <input type="radio" name="sort" value="profit7Days" v-model="filterRules" id="profitLast7Days" @click="sort(getStatWeekAll)"/>
                <label for="profitLast7Days">Profit 7 Days</label>
              </div>
              <button class="btn btn-primary btn-xs js-button-add reset" :disabled="disabledButton" @click="resetOrders">{{ labelReset }}
              </button>
            </div>
        </div>
        <loading-cube v-if="serverLoading || renderLoading" />

        <server-item v-else
            v-for="(item,index) in currList"
            :key="index"
            :cur="item"
            :serverName=serverName
            :showRules = showRules
        >
        </server-item>

    </div>
</template>

<script>
    import LaderView from '@/components/servers/lader-view.vue'
    import SelectView from '@/components/servers/select-view.vue'
    import FormView from '@/components/servers/form-view.vue'
    import OrdersAndHistory from '@/components/servers/orders-and-history.vue'
    import ServerItem from '@/components/servers/server-item.vue'

    import { mapActions, mapGetters } from "vuex";

    export default {
        name: "ServersView",
        components: {
            ServerItem,
            OrdersAndHistory,
            FormView,
            SelectView,
            LaderView
        },
        data() {
            return {
               depth: {},
               trades: {},
               serverLoading: false,
               renderLoading: false,
               showRules: 'all',
               filterRules: '',
               serverData: {},
               tradingVol: {},
               profitAll: {},
               profitLast7Days: {},
               profitLastMonth: {},
               customList: '',
               labelReset: 'RESET ORDERS',
               disabledButton: false,
               serverName: this.$route.params.server,

            }
        },
        watch: {
          showRules() {
              this.serverLoading = true;
          },
          '$route' (to, from) {
                console.log(to, from, "aaaaa")
              this.serverName = to.params.server
              this.renderComponent()

           }
        },
        computed: {
            ...mapGetters({
                getServerData: "getServerData",
                getSortCurrencyAll: "getSortCurrencyAll",
                getStatWeekAll: "getStatWeekAll",
                getStatMonthAll: "getStatMonthAll",
                getTickerAll: "getTickerAll"
            }),
            currList() {
                return this.customList.split('-')
            },

            currencyList() {
                if(this.getServerData()) {
                    return this.customList = Object.keys(this.getServerData()).map(item => item).join('-')
                }
            },

            currencyActive() {
               return this.currencyStan(true)
            },

            currencyInactive() {
                return this.currencyStan(false)
            },
        },
        methods : {
            ...mapActions([
                'fetchHistoryData',
                "fetchSystemData",
                "fetchYobitData",
                "fetchSystemDataLoop",
                "resetServerOrders"
            ]),

            resetOrders() {
                this.labelReset = 'Working ...'
                this.disabledButton = true
                this.resetServerOrders({
                    formData: {
                        currency: this.currencyList,
                        server: this.serverName
                    },
                })
            },
            currencyStan(stan) {
                if(this.getServerData())
                return Object.values(this.getServerData()).filter((item) => item.prove_send_buy === stan).length;
            },

            allowChange(val, cur) {
                this.serverData[cur].prove_send_buy = val
            },

            sortNone() {
                this.serverLoading = true;
                this.customList = this.currencyList
            },

            sortVol() {
                this.serverLoading = true;
                let arr = [];
                let obj = this.getTickerAll();
                for (let prop in obj) {

                    if (obj.hasOwnProperty(prop)) {
                        arr.push({'key': prop,'value': obj[prop].vol});
                    }
                }
                arr.sort(function(a, b) {
                    return b.value - a.value;
                });

                this.customList = arr.map(item => item.key).join('-')
            },
            sort(func) {
                this.serverLoading = true;
                this.customList = Object.keys(func()).map(item => item).join('-')
            },

            loopForSystemDataRequest() {
                setInterval(() => {
                    this.fetchSystemDataLoop({
                        serverName: this.serverName
                    });
                }, 15000)

            },
            renderComponent() {
                this.renderLoading = true;
                this.fetchSystemData({
                                serverName: this.serverName
                            }).then(() => {
                                this.fetchHistoryData({
                                    currency: this.currencyList,
                                });

                                this.fetchYobitData({
                                    currency: this.currencyList,
                                }).then(() => {
                                    this.renderLoading = false;
                                    this.serverLoading = false;
                                });
                            });
            },

        },
        updated()
        {
            this.$nextTick(() => {
                console.log("inside the updated")
                this.serverLoading = false;
            });
        },
        created() {
            this.serverLoading = true;
            this.loopForSystemDataRequest();

            this.renderComponent()

       }
    }
</script>

<style lang="scss" scoped>
.width-auto {
    width:auto;
}
.reset {
    margin-left: 1rem;
}
.total {
    margin-top: 0.5rem;
    margin-left: 2rem;
    word-spacing: 5px
}
.filterLabel {
    margin-top: 0.5rem;
    margin-left: 5rem;
    margin-right: 1rem;
}
.server-nav {
    background-color: #f8f8f8;
    width: auto;
    height: 5rem;
}
.radio-btn-group {
  display: flex;
  padding-top: 1rem;
  padding-left: 1rem;
  .radio {
    margin: 0 .25rem;

    label {
      background: #fff;
      border: 1px solid #ddd;
      padding: .5rem 1.25rem;
      border-radius: 5px;
      cursor: pointer;
      color: #444;
      transition: box-shadow 400ms ease;

      &:hover {
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
      }
    }

    input[type="radio"] {
      display: none;
    }

    input[type="radio"]:checked+label {
      background: #cde4f5;
      color: #000;
      border-color: #cde4f5;
    }
  }
}
</style>
