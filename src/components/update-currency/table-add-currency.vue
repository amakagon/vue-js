<template>
      <loading-cube v-if="loading"></loading-cube>
      <v-client-table v-else :columns="columns" :data="getData" :options="options">
           <select v-model="serverName" slot="server" class="form-control">
                <option v-for="(item, index) in server_names" :key="index" >{{item}}</option>
            </select>
           <input v-model="amount" slot="amount" type="number" class="form-control " style="width: 100px" >

            <base-button slot="add" slot-scope="props"
                    :classb="classButton(props.row.key)"
                    @click="updateCurr(props.row)"
                    :loading="props.row.key === activBtn"
            >
                Add
            </base-button>
      </v-client-table>

</template>

<script>
    import BaseButton from '@/components/base/base-button.vue'
    import { mapActions, mapGetters, mapState } from "vuex";

    export default {
        name: "table-add-currency",
        components: {BaseButton},
          data() {
            return {
                columns: ['key', 'vol', 'proc', 'sell', 'buy', 'server', 'amount', 'add'],
                data: [],
                options: {
                  headings: {
                    key: 'key',
                    vol: 'vol',
                    proc: 'proc',
                    sell: 'sell',
                    buy: 'buy',
                    server: 'server',
                    amount: 'amount',
                    add: 'add'
                  },
                  sortable: ['proc', 'vol'],
                  // filterable: ['name', 'code']
                },
                serverName: '',
                amount: '',
                activBtn: '',
                btnResponse: true
            }
          },
        watch: {
            serverName() {
              this.btnResponse = true
              this.activBtn = ''
            },
        },
        computed: {
            ...mapGetters({
                getNewCurrencySearch: 'getNewCurrencySearch',
                getServersStatus: 'getServersStatus',
            }),

            ...mapState({
                loading: state => state.server.loading.loading_add_currency_table
            }),

            getData() {
                return this.getNewCurrencySearch
                    ? Object.values(this.getNewCurrencySearch) : []
            },
            server_names() {
                return Object.values(this.getServersStatus()).map((item) => {
                    return Object.keys(item)[0]
                })
            },

        },

        methods: {
            ...mapActions([
                'addNewCurrency',
            ]),
            change(event) {
                  console.log(event.target.value)
            },
            updateCurr(prop) {
                this.btnResponse = true;
                this.activBtn = prop.key
                this.addNewCurrency({
                    formData: {
                        server: this.serverName,
                        amount: this.amount,
                        currency: prop.key,
                        sell: prop.sell,
                        buy: prop.buy
                    }
                }).then((res) => {
                }).catch((err) => {
                    this.btnResponse = false;
                })

            },

            classButton(val)
            {
                if(this.activBtn === val && this.btnResponse === false) {
                    return 'btn btn-primary btn-xs btn-danger'
                }
                return 'btn btn-primary btn-xs'
            }
        }
    }
</script>

<style scoped>

</style>
