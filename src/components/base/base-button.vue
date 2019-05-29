<template>
    <button
            type="button"
            :class="classb"
            @click="click"
            :disabled="loading"
    >
<slot></slot>
        <span :class="getClass"></span>
    </button>
</template>

<script>
    export default {
        name: "base-button",
        props: {
          classb: {
              type: String
          },
          loading: [Boolean, Array]
        },

        computed: {
          getClass() {
              return this.loading ? 'fa fa-spinner fa-spin' : 'fa fa-spinner'
          }
        },

        methods: {
            click() {
                this.$emit('click');
            }
        },
    }
</script>

<style scoped>

</style>
