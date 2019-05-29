<template>
    <loading-cube v-if="chartLoading" />
    <div v-else>
        <div class="but-menu">
        <base-toogle
            :labels="servers"
            :width="500"
            name="serverVal"
            @change="updateVal"
        />
        <base-toogle
            :labels="currency"
            name="currencyVal"
            @change="updateVal"
        />
        <base-toogle
            :labels="period"
            name="periodVal"
            @change="updateVal"
        />
        </div>
        <div class="small">
            <line-chart
                    :chart-data="datacollection"
                    :width="1200"
                    :height="800"
            ></line-chart>
        </div>
    </div>
</template>

<script>
    import LineChart from '@/components/chart/LineChart.js'
    import BaseToogle from '@/components/base/base-toggle.vue'
    import { mapActions } from "vuex";
    export default {
        components: {
            LineChart,
            BaseToogle
        },
        watch: {
            state: function(val) {
                this.state = val
            }
        },
        data () {
            return {
                datacollection: null,
                period: [
                    {name: 'Week'},
                    {name: 'Two-Weak'},
                    {name: 'Month'},
                    {name: 'Year'},
                ],
                serverVal: null,
                currencyVal: null,
                periodVal: null,
                state: [
                    100, 150
                ],
                currency: {},
                servers: {},
                chartLoading: true
             }
        },
        created() {
            this.fetchChartConfig().then(response => {
                this.currency = response.currency
                this.servers = response.servers
                this.chartLoading = false
            })
        },
        mounted () {
            this.fillData();
        },
        methods: {
            ...mapActions([
                'fetchChartData',
                'fetchChartConfig'
            ]),
            updateVal(val, name) {
                this[name] = val;
                this.submit()
            },
            submit() {
                if(this.serverVal && this.currencyVal && this.periodVal) {
                    this.fetchChartData({
                        serverName: this.serverVal,
                        currency: this.currencyVal,
                        period: this.periodVal
                    }).then(responce => {

                        this.datacollection = {
                            labels: responce.date,
                            datasets: [
                                {
                                    label: 'State',
                                    backgroundColor: [
                                        //'rgba(255, 99, 13, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 8, 0.2)',
                                        'rgba(75, 192, 19, 0.2)',
                                        'rgba(153, 102, 25, 0.2)',
                                        'rgba(255, 159, 6, 0.2)'
                                    ],
                                    data: responce.state
                                },
                                {
                                    label: 'Free',
                                    backgroundColor: [
                                        'rgba(0,0,255,0.3)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 8, 0.2)',
                                        'rgba(75, 192, 19, 0.2)',
                                        'rgba(153, 102, 25, 0.2)',
                                        'rgba(255, 159, 6, 0.2)'
                                    ],
                                    data: responce.free
                                },
                                {
                                    label: 'In Buy',
                                    backgroundColor: [
                                         'rgba(0,128,0 ,0.8)',
                                    ],
                                    data: responce.in_buy
                                },
                                {
                                    label: 'In sell',
                                    backgroundColor: [
                                        'rgba(255,0,0,0.3)',
                                    ],
                                    data: responce.in_sell
                                },
                            ]
                        }
                    });
                }
            },

            fillData () {
                this.datacollection = {
                    labels: [],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: [
                                'rgba(255, 99, 13, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 8, 0.2)',
                                'rgba(75, 192, 19, 0.2)',
                                'rgba(153, 102, 25, 0.2)',
                                'rgba(255, 159, 6, 0.2)'
                            ],
                            data: []
                        },
                    ]
                }
            }
        }
    }
</script>

<style lang="scss">
    .small {
        max-width: 1200px;
        margin:  0px auto;
    }
    .but-menu {
        float: left;
    }
</style>
