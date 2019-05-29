<template>
  <div class="single-table">
      <div v-if="issetData" class="error">Something wrong with server: {{ server_name }} <br /></div>
      <div v-else class="row" style="margin-left: 1rem">
          <div class="col-lg-1" style="width: 15rem">
              <div class="row custom-row"><strong>{{server_name}}</strong> ({{data_server.currency_count}} / {{data_server.order_count}})</div>
              <div class="row custom-row">In_Orders_Buy</div>
              <div class="row custom-row">In Orders Sell</div>
              <div class="row custom-row">Free</div>
              <div class="row custom-row">In Orders</div>
              <div class="row custom-row">Diff</div>
          </div>
          <div class="col-md-1" v-for="(data, key) in data_server.data" :key="key">
              <div class="row custom-row align-center"><strong>{{data.name.toUpperCase()}}</strong></div>
              <div class="row custom-row align-center bg_green">{{data.amount_buy}}</div>
              <div class="row custom-row align-center bg_red">{{data.amount_sell}}</div>
              <div class="row custom-row align-center"><strong>{{data.funds}}</strong></div>
              <div class="row custom-row align-center">{{data.funds_inc_orders}}</div>
              <div class="row custom-row align-center">{{getAmountDiff(data.amount_buy, data.funds,  data.funds_inc_orders)}}</div>
          </div>
       </div>
    </div>
</template>

<script>
    export default {
        name: "tableSystem",
        props: {
          data: {
              type:Object
          },
        },
        data() {
            return {
                server_name: '',
                data_server: {}
            }
        },

        computed: {
            issetData() {
                if(Object.values(this.data).length ) {
                    this.server_name = Object.keys(this.data)[0]
                    if(this.data[Object.keys(this.data)] !== null) {
                        this.data_server = this.data[Object.keys(this.data)]
                        return false
                    }
                }
                return true
            },
        },

        methods: {
          getAmountDiff(amount, funds, all)
          {
              if(amount !== 0) {
                  return (amount + funds - all).toFixed(2)
              }
              return '-'
          }
        },

    }
</script>

<style lang="scss" scoped>
.error {
    width: 50rem;
    height: 4rem;
    font-size: 22px;
    background-color: #e242427d;
    text-align: center;
    display: table-cell;
    padding: 10px;
    border-radius: 10px;
}

.bg_green {
  background: #CEFFC1;
}
.bg_red {
  background: #FCA7A7;
}
.single-table {
  padding: 1rem;
}

.custom-row {
    border: 1px solid #ddd;
    padding: 8px;
}
.align-center {
    text-align: center;
}
</style>
