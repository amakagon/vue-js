<template>
    <loading-cube v-if="getLoading" />
    <div v-else>
        <table-system v-for="(data, key) in getData" :key="key"
            :data="data"
        ></table-system>

    </div>
</template>

<script>
    import TableSystem from '@/components/system/tableSystem.vue'
    import { mapGetters } from "vuex";
    export default {
        components: {
            TableSystem
        },
        computed: {
            ...mapGetters({
                getServersStatus: 'getServersStatus',
                getLoading: 'getLoading'
            }),

            getData() {
              if(Object.values(this.getServersStatus()).length ) {
                    return this.getServersStatus()
              }
            },
        },
    }
</script>

<style lang="scss">

</style>
