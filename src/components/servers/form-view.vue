<template>
    <div class="form-row">
        {{initData}}
        <div class="form-group margin-auto">
            <label>Dead Sell</label>
            <input type="text" class="form-control"
                v-model="form.dead_sell"
            >
        </div>
        <div class="form-group margin-auto">
            <label>Dead Buy</label>
            <input type="text" class="form-control"
                v-model="form.dead_buy"
            >
        </div>
        <div class="form-group margin-auto">
            <label>Amount</label>
            <input type="text" class="form-control"
                v-model="form.amount"
            >
        </div>
        <div class="form-group margin-top">
            <base-button
                    classb="btn btn-default btn-xs"
                    @click="calulate()"
                    :loading="loadingCalculate"
            >
                Calculate
            </base-button>
            <base-button
                    classb="btn btn-primary btn-xs"
                    @click="updateCurr()"
                    :loading="loadingSave"
            >
                Save
            </base-button>
            <toggle-button
                    v-model="form.prove_send_buy"
                    :labels="{checked: 'Allow', unchecked: 'Reject'}"
                    :width="80"
                    :height="24"
                    :sync="true"
                    class="test"
            />
            <br />
            <base-button
                    classb="btn btn-warning btn-xs"
                    @click="refreshOrders()"
                    :loading="loadingRefresh"
            >
                Refresh
            </base-button>
            <base-button
                    classb="btn btn-danger btn-xs"
                    @click="deleteCurrConfirm()"
                    :loading="loadingDelete"
            >
                Delete
            </base-button>

        </div>
        <confirm-modal
                :keyId="keyId"
                @confirm="deleteCurr"
        />
        <flash-message
                :transitionName="keyId"
                class="myCustomClass"
        >
        </flash-message>
    </div>
</template>

<script>
    import ToggleButton from 'vue-js-toggle-button/src/Button'
    import { mapActions, mapGetters } from "vuex";
    import BaseButton from "../base/base-button";
    import ConfirmModal from "../base/modal/confirm-modal";
    import uuidv1 from 'uuid/v1';

    export default {
        name: "form-view",
        props: {
            curr: {
                type: String,
                required: true
            },
            serverName: {
                type:String,
                required: true
            }
        },
        data() {
            return {
                form: {
                    amount: '',
                    dead_buy: '',
                    dead_sell: '',
                    name: '',
                    prove_send_buy: ''
                },
                loadingSave: false,
                loadingDelete: false,
                loadingCalculate: false,
                loadingRefresh: false,
                keyId: uuidv1()
            }
        },
        components: {
            ConfirmModal,
            BaseButton,
            ToggleButton
        },
        computed: {
            ...mapGetters({
                getServerDataFromId: "getServerDataFromId",
                getDepthFromId: "getDepthFromId",
            }),

            initData() {
                if(this.getServerDataFromId(this.curr)) {
                    this.form = {...this.getServerDataFromId(this.curr)}
                }

            },
        },
        methods: {
            ...mapActions([
                "updateServerData",
                'deleteServerData',
                'calulateServerData',
                'refreshServerData'
            ]),
            refreshOrders() {

                this.loadingRefresh = true;
                this.refreshServerData({
                    serverName: this.serverName,
                    curr: {currency: this.curr}
                }).then((responce) => {
                    this.flashSuccess(responce)
                    this.loadingRefresh = false
                    // if(responce.success === 1) {
                    //     this.flashSuccess("Order Canceled")
                    // }
                    // else this.flashWarning(responce)
                    // this.flashInfo = false
                })
            },
            calulate() {
                this.loadingCalculate = true

               let formData = {
                   ...this.form,
                   askPrice: this.getDepthFromId(this.curr).asks[0][0],
                   bidPrice: this.getDepthFromId(this.curr).bids[0][0]
               };
                this.calulateServerData({
                    serverName: this.serverName,
                    formData: formData
                }).then((responce) => {
                    this.form.dead_buy = responce.dead_buy
                    this.form.dead_sell = responce.dead_sell
                    this.loadingCalculate = false
                })
            },
            updateCurr() {
                this.loadingSave = true

                this.updateServerData({
                    serverName: this.serverName,
                    formData: this.form
                }).then(() => {
                    this.loadingSave = false
                })
            },
            deleteCurrConfirm() {
                this.$modal.show(`confirm-modal-${this.keyId}`);
            },
            deleteCurr() {
                this.loadingDelete = true
                this.deleteServerData({
                    serverName: this.serverName,
                    curr: this.curr
                }).then(() => {
                    this.loadingDelete = false
                    this.$emit('delete');
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .margin-auto {
        margin:auto;
        label {
            display: inline;
        }
    }
    .margin-top {
        margin-top: 15px
    }
    .test {
        margin-top: 4px
    }
    .myCustomClass{
        position:fixed;
        top: 0px;
        left: 80%;
    }
</style>
