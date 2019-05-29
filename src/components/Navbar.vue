<template>
    <loading-cube v-if="loading"></loading-cube>
    <nav v-else class="navbar navbar-default">
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><router-link to="/">Home</router-link></li>
                    <li><a href="/statistic">Statistic</a></li>
                    <li><router-link to="/system">System</router-link></li>
                    <li><router-link to="/add-currency">Add Currency</router-link></li>
                    <li><router-link to="/chart">Chart</router-link></li>
                    <li><a href="/log">Log</a></li>
                    <li class="drop-servers drop-servers-custom">
                    <vue-dropdown v-if="configRealServers.options.length"
                            :config="configCustomServers"
                            @setSelectedOption="setNewSelectedCustomOption($event)"
                    ></vue-dropdown>
                    </li>
                    <li class="drop-servers">
                    <vue-dropdown v-if="configRealServers.options.length"
                            :config="configRealServers"
                            @setSelectedOption="setNewSelectedRealOption($event)"
                    ></vue-dropdown>
                    </li>

                </ul>
            </div>
    </nav>
</template>

<script>
    import VueDropdown from '@/components/base/dropdown/dropdown.vue'
    import { mapActions, mapGetters, mapState } from "vuex";

    export default {
        name: "navbar",
        components: {
            VueDropdown
        },
        data() {
            return {
                configRealServers: {
                    options:[],
                    placeholder: "Real Servers",
                    backgroundColor: "#cde4f5",
                    textColor: "black",
                    borderRadius: "1.5em",
                    border: "1px solid gray",
                    width: 140,
                },
                configCustomServers: {
                    options:[],
                    placeholder: "Custom Servers",
                    backgroundColor: "#cde4f5",
                    textColor: "black",
                    borderRadius: "1.5em",
                    border: "1px solid gray",
                    width: 150,
                }
            }
        },
        created() {
            this.fetchServerConfig()
                .then(responce => {
                    this.configRealServers.options = Object.values(responce)
                    this.configCustomServers.options = Object.values(responce).map((item) => {
                        return {url: '/servers/' + item.value.toLowerCase(), value: item.value}
                    });
                })
            this.fetchServersStatus()
        },
        methods: {
            setNewSelectedRealOption(selectedOption) {
                 this.configRealServers.placeholder = selectedOption.value;
            },
            setNewSelectedCustomOption(selectedOption) {
                 this.configCustomServers.placeholder = selectedOption.value;
            },
            ...mapActions([
                'fetchServerConfig',
                'fetchServersStatus'
            ]),
        },
        computed: {
            ...mapState({
                loading: state => state.server.loading.getLoading
            })
        },
    }
</script>

<style lang="scss" scoped>
.drop-servers {
    margin-top: 6px;
    &-custom {
        margin-right: 16rem;
    }
}
</style>
