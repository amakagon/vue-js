<template>
    <div>
        <label>{{server.name}}</label>
        <loading-cube v-if="loading" />
        <div v-else class="log-container" ref='logDisplay'>
            <div v-for="line in lines">{{ line }}</div>
        </div>
     </div>
</template>

<script>

    import { mapActions } from "vuex";

    export default {
        name: "ServersView",
        components: {

        },
        props:{
            server: {},
            interval: {
                type: Number
            }
        },
        data() {
            return {
                lines: [],
                seek: 0,
                intervalObj: {},
                loading: true
            }
        },
        methods : {
            ...mapActions([
                'fetchLogs',
            ]),
            load () {
                this.fetchLogs({
                    formData: {
                        seek: this.seek,
                        url: this.server.url
                    },
                }).then((response) => {
                    this.lines = [...this.lines, ...response.lines];
                    this.seek = response.seek;
                    if(this.loading) {
                        this.loading = false;
                        this.$nextTick(() => {
                             this.scrollToEnd();
                        });
                    }
                });
            },
            customClearInterval()
            {
                clearInterval(this.intervalObj)
                this.intervalObj = setInterval(this.load, this.interval);
            },
            clearLog()
            {
                this.lines = [];
                this.seek = 0;
                this.loading = true;
            },
            scrollToEnd() {
                var container = this.$refs.logDisplay;
                if(container) {
                   container.scrollTop = container.scrollHeight;
                }
           },
        },
        watch: {
            interval: function() {
                this.customClearInterval()
            },
            server: function () {
                this.clearLog()
                this.customClearInterval()
            },

        },
        mounted () {
            this.load();
            this.intervalObj = setInterval(this.load, this.interval);
        },
    }
</script>

<style lang="scss" scoped>
.log-container{
    width: auto;
    background-color: rgba(241, 240, 253, 0.38);
    max-height: 50rem;
    overflow: scroll;
}
</style>
