<template>
    <tr>
        <td>{{item.currency.toUpperCase()}}</td>
        <td>{{diffForHuman(item.updated_at)}}</td>
        <td>
            <base-button
                    classb="btn btn-primary btn-xs"
                    @click="updateCurr(item.currency)"
                    :loading="loading"
            >
                Update
            </base-button>
        </td>
    </tr>
</template>

<script>
    import moment from 'moment';
    import BaseButton from '@/components/base/base-button.vue'
    import { mapActions } from "vuex";

    export default {
        name: "update-currency",
        components: {BaseButton},
        props: {
            item: {
                type: Object,
                required: true,
            },
            exchange: {},
            done: {}
        },
        data () {
          return {
              loading: false
          }
        },
        computed: {

        },
        watch: {
            done: function (val) {
                if(this.item.currency === val) {
                    this.loading = false
                }
            }
        },
        methods: {
            ...mapActions([
                'updateCurrencyFromExchange',
            ]),

            diffForHuman(val) {
                return moment.duration(moment().subtract(2, 'hours').diff(moment(val))).humanize();
            },
            updateCurr(currency) {
              this.loading = true;
              this.updateCurrencyFromExchange({
                 exchange: this.exchange,
                 name: currency
              });
            },
        },
    }
</script>

<style scoped>

</style>
