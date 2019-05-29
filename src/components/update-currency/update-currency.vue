<template>
    <table class="table table-sm"><tbody>
        <update-currency-single v-for="(item, index) in lastUpdate" :key="index"
                :item="item"
                :exchange="exchange"
                :done="done"
        ></update-currency-single>
    </tbody></table>
</template>

<script>
    import UpdateCurrencySingle from '@/components/update-currency/update-currency-single.vue'
    import io from 'socket.io-client'

    export default {
        name: "update-currency",
        components: {UpdateCurrencySingle},
        props: {
            lastUpdate: {
                type: Array,
                required: true,
            },
            exchange: {}
        },
        data () {
          return {
              done: '',
          }
        },
        mounted() {
           var socket = io('http://calc-front.artcircus.pl:3000');
           //  var socket = io('http://localhost:3000');
            socket.on('update-single-currency:App\\Events\\UpdateSingleEvent', function (data) {
                console.log("uraaaaaaaaaaaa", data)
                this.done = false
                this.$nextTick(() => {
                    this.done = data.result.name
                })
            }.bind(this))
        },
    }
</script>

<style scoped>

</style>
