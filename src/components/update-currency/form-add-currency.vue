<template>
    <div class="row" style="margin-top: 10px; margin-bottom: 4rem;">
        <div class="col-sm-4">
            <label for="currency">Currency</label>
            <select v-model="form.currency" class="form-control" id="currency" name="currency">
                <option v-for="(item, index) in currencyList" :key="index">{{item.currency.toUpperCase()}}</option>
            </select>
        </div>
        <div class="col-sm-4">
            <label for="currency">Min Vol</label>
            <input v-model="form.min_vol" type="text" class="form-control" id="vol" placeholder="vol" name="vol">
        </div>
        <div class="col-sm-4">
            <label for="currency">Limit %</label>
            <input v-model="form.procent" type="text" class="form-control" id="procent" placeholder="procent" name="procent">
        </div>
        <div class="col-sm-12">
            <base-button
                        classb="btn btn-primary btn-xs btn-search"
                        @click="search()"
                        :loading="loading"
            >
                 Search
            </base-button>
        </div>
    </div>


</template>

<script>
    import { mapActions, mapGetters, mapState } from "vuex";
    import BaseButton from '@/components/base/base-button.vue'
    export default {
        name: "form-add-currency",
        components:{
            BaseButton
        },
        data() {
            return {
                form: {
                    currency: 'usd',
                    min_vol: '',
                    procent: '',
                }

            }
        },
        props: {
            currencyList:{},
            exchange:{}
        },
        computed: {
            ...mapGetters({
                getServersStatus: 'getServersStatus',
            }),
            ...mapState({
                loading: state => state.server.loading.loading_add_currency_table
            }),
        },
        methods: {
            ...mapActions([
                'searchNewCurrency'
            ]),

            search() {
                this.searchNewCurrency({
                    formData: { ...this.form , exchange: this.exchange}
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.btn-search {
    margin-top: 10px; float: right;
}
</style>
