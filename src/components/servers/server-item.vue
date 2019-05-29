<template>
    <div v-if="show">
        <div class="header-vol">
            {{getMarkerTicker}}
            {{ ticker.name }}<span class="ticker"> v: <strong>{{ ticker.vol }}</strong></span>
        </div>
        <div class="row">
            <div class="col-xs-3 width-auto">
                <lader-view
                        :curr=cur
                >
                </lader-view>
            </div>
            <div class="col-xs-3 width-auto">
                <select-view
                        :curr=cur
                >
                </select-view>
            </div>
            <div class="col-xs-2 width-auto">
                <form-view
                        :curr=cur
                        :serverName=serverName
                        @delete="hideSlot"
                >
                </form-view>
            </div>
            <div class="col-xs-4 width-auto nice-border">
                <orders-and-history
                       :curr=cur
                >
                </orders-and-history>
            </div>
        </div>
        <hr >
    </div>
</template>

<script>

    import LaderView from "./lader-view";
    import SelectView from "./select-view";
    import FormView from "./form-view";
    import OrdersAndHistory from "./orders-and-history";
    import { mapGetters } from "vuex";

    export default {
        name: "server-item",
        components: {OrdersAndHistory, FormView, SelectView, LaderView},
        props: {
          cur:{} ,
          serverName:{},
          showRules:'',
        },
        data () {
            return {
                ticker: {
                    name: '',
                    high: '',
                    low: '',
                    vol: '',
                    vol_cur: ''
                },
                show: true,
                formData: '',
            }
        },
        methods: {
            hideSlot() {
                this.show = false
            },

            canShow() {
                if(this.formData.prove_send_buy === false && this.showRules === 'active') {
                    return false;
                }
                else if(this.formData.prove_send_buy === true && this.showRules === 'inactive') {
                    return false;
                }
                return true;
            },
        },
        watch: {
          showRules: function () {
                this.show = this.canShow()
          },
        },
        computed: {
            ...mapGetters({
                getTickerFromId: "getTickerFromId",
                getServerDataFromId: "getServerDataFromId",
            }),

            canShowElement()
            {
                if(this.getServerDataFromId(this.cur)) {
                    this.formData = {...this.getServerDataFromId(this.cur)}
                    this.show = this.canShow()
                }
            },
            getMarkerTicker() {
                if(this.getTickerFromId(this.cur)) {
                    this.ticker.name = this.cur;
                    this.ticker.high = this.getTickerFromId(this.cur).high;
                    this.ticker.low = this.getTickerFromId(this.cur).low;
                    this.ticker.vol = this.getTickerFromId(this.cur).vol;
                    this.ticker.vol_cur = this.getTickerFromId(this.cur).vol_cur;
                }
            },
        },
        created() {
            this.canShowElement
        },
    }
</script>

<style lang="scss" scoped>
    .width-auto {
        width: auto;
    }
    .nice-border{
        border: 1px solid rgba(0,0,0,.15);
    }
    .ticker {
        font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
        font-size: 1.25rem;
    }
</style>
