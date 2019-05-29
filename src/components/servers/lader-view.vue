<template>
    <div class="lader-container">
        <div class="lader-bid-container">
            <div class="lader-bid"
                 v-for="bid in bidLader"
            >
                {{bid}}
            </div>
        </div>
        <div class="lader-price-container">
            <div class="lader-price"
                 v-for="cena in price"
            >
                {{cena}}
            </div>
        </div>
        <div class="lader-ask-container">
            <div class="lader-ask"
                 v-for="ask in askLader"
            >
                {{ask}}
            </div>
        </div>
        {{getDepth}}
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";

    export default {
        name: "lader-view",
        data() {
            return {
                bidLader: [],
                price: [],
                askLader: [],
                depth: 5
            }
        },
        props: {
            curr: {
                type: String,
                required: true
            }
        },
        computed:{
            ...mapGetters({
                getDepthFromId: "getDepthFromId",
            }),

            getDepth() {
                if(this.getDepthFromId(this.curr)) {

                    let data = this.getDepthFromId(this.curr);

                    this.bidLader=[];
                    this.price=[];
                    this.askLader=[];

                    for (const key in data) {
                        if (key === 'bids') {
                            for (var i = 0; i < this.depth; i++) {
                                this.bidLader.push(this.round(data[key][i][1] * data[key][i][0]))
                                this.price.push(data[key][i][0])
                            }
                        }
                        if (key === 'asks') {
                           for (var i = 0; i < (data.asks.length < 5 ? data.asks.length : this.depth); i++) {
                               this.askLader.unshift(this.round(data[key][i][1] * data[key][i][0]))
                               this.price.unshift(data[key][i][0])
                           }

                        }
                    }
                    for (var i = 0; i < 5; i++) {
                        this.bidLader.unshift('')
                        this.askLader.push('')
                    }
                }
            }
        },
        methods:{
            round(num) {
                return Math.round(num * 100) / 100
            }
        },
    }
</script>

<style lang="scss" scoped>
    .lader-container{
       display: flex;
        .lader-bid-container {
            .lader-bid {
                width: 8rem;
                height: 2.3rem;
                border: 1px solid #eceeef;
                padding-left: 1rem;
                padding-top: 0.3rem;
                font-size: 1.2rem
            }
        }
        .lader-price-container {
            .lader-price {
                width: 10rem;
                height: 2.3rem;
                border: 1px solid #eceeef;
                padding-left: 1rem;
                padding-top: 0.3rem;
                font-size: 1.2rem
            }
        }
        .lader-ask-container {
            .lader-ask {
                width: 8rem;
                height: 2.3rem;
                border: 1px solid #eceeef;
                padding-left: 1rem;
                padding-top: 0.3rem;
                font-size: 1.2rem
            }
        }
    }
</style>