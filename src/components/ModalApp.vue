<template>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div 
    class="modal fade" 
    id="exampleModal" 
    tabindex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 
            class="modal-title" 
            id="exampleModalLabel">
            What do we have for today?
            </h5>
            <button 
            type="button" 
            class="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close">
            </button>
        </div>
        <div class="modal-body">
        <div class="container">
            <vee-form @submit="insertTrans" :validation-schema="schema" v-slot="{ errors }">
            <!--Transactions name-->
            <div class="mb-3">
                <label  
                class="form-label">
                Object
                </label>
                <vee-field 
                type="text" 
                class="form-control" 
                name="itemname" 
                id="itemname" 
                v-model="newTrans.transObj"/>
            </div>
            <!--Error message for transaction name-->
            <span class="text-danger" v-text="errors.itemname" v-show="errors.itemname"></span>
    
            <!--Transaction description-->
            <div class="mb-3">
                <label 
                class="form-label">
                Description
                </label>
                <vee-field 
                type="text" 
                class="form-control" 
                id="itemdescription" 
                name="itemdescription" 
                v-model="newTrans.description"/>
            </div>
            <!--Error message for description-->
            <span class="text-danger" v-text="errors.itemdescription" v-show="errors.itemdescription"></span>
            <!--Transaction type-->
            <div class="form-group">
                <label 
                class="form-label">
                Select a type
                </label>
                <select 
                class="form-control" 
                id="transtype" 
                name="transtype" 
                v-model="newTrans.transType">
                <option v-for="item in types" :key="item">{{ item }}</option>
                </select>
            </div>
            <!--Error message for transaction type-->
            <!--Value of the transaction-->
            <div class="mb-3">
                <label 
                class="form-control">
                Value
                </label>
                <vee-field 
                type="number" 
                class="form-control" 
                id="itemvalue" 
                name="itemvalue" 
                v-model="newTrans.transVal"/>
            </div>
            <!--Error message for transaction Value-->
            <span class="text-danger" v-text="errors.itemvalue" v-show="errors.itemvalue"></span>
            <button type="submit" class="btn btn-primary">Save</button>
            <button class="btn btn-secondary" type="reset">Clear</button>
        </vee-form>
        </div>
        </div>
        <div class="modal-footer">
            <button 
            type="button" 
            class="btn btn-success" 
            data-bs-dismiss="modal">
            Close
            </button>
            <!--<button 
            type="button" 
            class="btn btn-primary" 
            @click="insertTrans" 
            :disabled="!ableDisable">
            Save
            </button>-->
        </div>
        </div>
    </div>
    </div>
</template>
<script>
    import { Form, Field, defineRule } from 'vee-validate'
    
    defineRule('requiredField', value => {
        if (!value) {
            return 'mandatory field'
        }
        return true
    })
    export default {
        data() {
            return {
                schema: {
                    itemname: 'requiredField',
                    itemdescription: 'requiredField',
                    itemvalue: 'requiredField'
                },
                newTrans: {
                    transObj: null,
                    description: null,
                    transType: null,
                    transVal: null
                },
                types: ['Expenditure', 'Income']
            }
        },
        components: {
            'vee-form': Form,
            'vee-field': Field,
        },
        computed: {
            ableDisable() {
                let condOne = this.newTrans.transObj
                let condTwo = this.newTrans.description
                let condThree = this.newTrans.transType
                let condFour = this.newTrans.transVal
                return condOne && condTwo && condThree && condFour
            },
        },
        methods: {
            insertTrans() {
                let emitTrans = {...this.newTrans}
                emitTrans.transVal = Number(this.newTrans.transVal)
                let curr = emitTrans.transVal.toLocaleString('en-US', {style: "currency", currency: "USD"})
                emitTrans.transVal = curr
                this.$emit('add-trans', emitTrans)
                // this.newTrans.transObj = null
                // this.newTrans.description = null
                // this.newTrans.transType = null
                // this.newTrans.transVal = null
            }
        },
        // beforeMount() {
        //     this.validations = validations
        // }

    }
</script>
<style scoped>
.btn {
    margin: 2px;
}
</style>
