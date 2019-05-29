<template>
    <div class="select-view">
        <div class="select-view-row" :class="styles[index]" v-for="(key, index) in times">
            <span class="select-view-cell">{{times[index]}}</span>
            <span class="select-view-cell">{{amount[index]}}</span>
            <span class="select-view-cell">{{price[index]}}</span>
        </div>
        {{getTrades}}
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapActions, mapGetters } from "vuex";

    export default {
        name: "select-view",
        props: {
            curr: {
                type: String,
                required: true
            }
        },
        data() {
          return {
              times:[],
              amount:[],
              price:[],
              styles:[]
          }
        },
        computed:{
            ...mapGetters({
                getTradesFromId: "getTradesFromId",
            }),

            getTrades() {
                if(this.getTradesFromId(this.curr)) {
                    let trades =  this.getTradesFromId(this.curr);
                    trades.forEach(item => {
                        this.times.push(moment.unix(item.timestamp).format("DD.MM HH:mm") + '');
                        this.amount.push(this.round(item.amount) + '/' + this.round(item.amount * item.price) + '');
                        this.price.push(item.price)
                        item.type === 'ask' ? this.styles.push('bid') : this.styles.push('ask')
                    })
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
    .select-view{
        width: 32rem;
        height: 23rem;
        overflow: auto;
        font-size: 12px;

        &-row { display: flex;
            &:nth-child(even) { background-color: #f5f5f5; }
        }
        &-cell { flex: 0 0 calc(33% - 10px); margin-right: 10px; word-break: break-word; }

        .ask {
            color: green;
        }
        .bid {
            color: red;
        }

    }
</style>