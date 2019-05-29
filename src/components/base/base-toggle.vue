<template>
    <toggle-switch
            :options="myOptions"
            name="name"
            @change="updateMap($event.value)"

    />
</template>

<script>
    export default {
        name: "base-toggle",
        props: {
            labels: {
                type: Array,
                required: true
            },
            width:{
                type: Number,
                default:400
            },
            name:{
                type: String
            }
        }
        ,

        data() {
            return {
                myOptions: {
                    layout: {
                        color: 'black',
                        backgroundColor: 'lightgray',
                        selectedColor: 'white',
                        selectedBackgroundColor: 'green',
                        borderColor: 'black',
                        fontFamily: 'Arial',
                        fontWeight: 'normal',
                        fontWeightSelected: 'bold',
                        squareCorners: false,
                        noBorder: false,
                        responsive: true,
                        maintainAspectRatio: false
                    },
                    size: {
                        fontSize: 1.2,
                        height: 3.4,
                        padding: 0.7,
                        width: this.width / 10
                    },
                    items: {
                        delay: .4,
                        preSelected: 'unknown',
                        disabled: false,
                        labels: this.labels
                    },
                },
            }
        },
        methods:{
            updateMap(val) {
                this.$emit('change', val, this.name)
            }
        },
}
</script>

<style scoped>

</style>
