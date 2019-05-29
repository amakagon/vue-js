<template>


    <modal
            class="confirm-modal"
            :name="`confirm-modal-${keyId}`"
    >
        <div>
            <div>
                <p class="text"><strong>Czy jesteś pewny, że chcesz usunąć ?</strong></p>
            </div>
            <base-button
                    classb="btn btn-success mysla"
                    type="button"
                    @click="onConfirm"
            >
                Usuń
            </base-button>

            <base-button
                    classb="btn btn-danger mysla"
                    @click="closeModal"
            >
                Anuluj
            </base-button>
        </div>
    </modal>

</template>

<script>

    import BaseButton from "../base-button";
    export default {
        components: {
            BaseButton
        },
        props: {
            hours: {
                type: Array,
            },
            keyId: {
                type: String,
            },
            userId: {
                type: Number,
            },
            date: {

            }
        },
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {
            closeModal: function () {
                this.$modal.hide(`confirm-modal-${this.keyId}`);
            },
            onConfirm() {
                this.$modal.hide(`confirm-modal-${this.keyId}`);
                this.$emit('confirm');
            }
        },
    }
</script>

<style lang="scss">

    .confirm-modal {
        .v--modal-box {
            box-shadow: none;
            width: 40rem!important;
            height: 10rem!important
        }
        .mysla {
            width: 49%;
            margin-top: 2rem;
        }
        .text {
            margin-left: 9rem;
            margin-top: 1rem;
        }

    }



    /*.v--modal-overlay[data-modal="confirm-modal"] {*/
    /*background: transparent;*/
    /*.v--modal-box {*/
    /*box-shadow: none;*/
    /*}*/
    /*}*/

</style>
