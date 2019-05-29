<template>
    <div class="container-fluid">
        <div class="drop-interval">
            <vue-dropdown
            :config="configInterval"
            @setSelectedOption="setNewSelectedInterval($event)"
         ></vue-dropdown>
         </div>
         <div class="drop-server">
            <vue-dropdown
            :config="configServers"
            @setSelectedOption="setNewSelectedServers($event)"
         ></vue-dropdown>
         </div>
        <log-view
            :server = parseServers[i]
            :interval="interval"
        >
        </log-view>
    </div>
</template>

<script>
    import LogView from './log-view';
    import VueDropdown from '../base/dropdown/dropdown'
    import { mapActions } from "vuex";

    export default {
        props:{
            servers: {},
        },
        components: {
            LogView,
            VueDropdown
        },
        data() {
            return {
              configInterval: {
                    options:[
                        {value:5},
                        {value:10},
                        {value:30},
                        {value:60},
                    ],
                    placeholder: "Interval (10)",
                    backgroundColor: "#cde4f5",
                    textColor: "black",
                    borderRadius: "1.5em",
                    border: "1px solid gray",
                    width: 120,
                    class: 'drop-my'
                },
                configServers: {
                    options:[],
                    placeholder: "Servers",
                    backgroundColor: "#cde4f5",
                    textColor: "black",
                    borderRadius: "1.5em",
                    border: "1px solid gray",
                    width: 100,
                    class: 'drop-my'
                },
                interval:10000,
                i:0
            }
        },
        computed: {
            parseServers() {
                let parse = JSON.parse(this.servers);
                this.configServers.options = parse.map((item) => {
                   return {value: item.name, id: item.id}
                })
                return JSON.parse(this.servers);
            },
        },
        methods: {
            ...mapActions([
                'fetchServerConfig',
            ]),
            setNewSelectedInterval(selectedOption) {
                 this.configInterval.placeholder = selectedOption.value;
                 this.interval = selectedOption.value * 1000;
            },
            setNewSelectedServers(selectedOption) {
                 this.configServers.placeholder = selectedOption.value;
                 this.i = selectedOption.id - 1
            },
        },
    }
</script>

<style lang="scss" scoped>
    .drop-interval {
        float: right;
        margin-right: 14rem;
        margin-top: -1.5rem;
    }
    .drop-server {
        float: right;
        margin-right: 25rem;
        margin-top: -1.5rem;
    }
</style>
