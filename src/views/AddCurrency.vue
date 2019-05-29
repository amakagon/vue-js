<template>
    <loading-cube v-if="loading"></loading-cube>
    <div v-else class="container-fluid">
        <div class="row">
            <div class="col-md-4 padding-bottom">
                  <vue-dropdown v-if="selectExchangeList.options.length"
                            :config="selectExchangeList"
                            @setSelectedOption="setExchange($event)"
                   ></vue-dropdown>
            </div>
        </div>
        <div class="row">
            <div v-if="Object.keys(currencyList).length !== 0" class="col-md-4">

                <form-add-currency
                    :currencyList="Object.values(currencyList)"
                    :exchange="exchange"
                >
                </form-add-currency>

                <update-currency
                    :lastUpdate="Object.values(currencyList)"
                    :exchange="exchange"
                ></update-currency>
            </div>
            <div class="col-md-8">
                <table-add-currency>
                </table-add-currency>
            </div>
        </div>
    </div>

</template>

<script>
    import VueDropdown from '@/components/base/dropdown/dropdown.vue'
    import UpdateCurrency from '@/components/update-currency/update-currency.vue'
    import FormAddCurrency from '@/components/update-currency/form-add-currency.vue'
    import { mapActions, mapState } from "vuex";
    import TableAddCurrency from '@/components/update-currency/table-add-currency.vue';

    export default {
        name: "AddCurency",
        components: {
            TableAddCurrency,
            VueDropdown,
            UpdateCurrency,
            FormAddCurrency
        },
        data() {
            return {
                exchangeList: {},
                exchange: '',
                selectExchangeList: {
                    options:[],
                    placeholder: "Exchanges",
                    backgroundColor: "#cde4f5",
                    textColor: "black",
                    borderRadius: "1.5em",
                    border: "1px solid gray",
                    width: 140,
                },
                currencyList: {}
            }
        },
        created() {
            this.fetchExchangeList().then(response => {
                this.selectExchangeList.options = Object.values(response).map((item) => {
                    return {value: item}
                });
            })
        },
        methods: {
            ...mapActions([
                'fetchExchangeList',
                'fetchCurrencyList',
            ]),
            setExchange(val) {
                this.fetchCurrencyList({ name: val.value}).then(response => {
                    this.selectExchangeList.placeholder = val.value.toUpperCase()
                    this.exchange = val.value
                    this.currencyList = {...response}
                })

            }
        },
        computed: {
            ...mapState({
                loading: state => state.server.loading.loading_add_currency
            })
        },
    }
</script>

<style scoped>
.padding-bottom {
    padding-bottom: 5rem;
}
</style>
