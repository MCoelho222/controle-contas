<template>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Wanna change something?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <vee-form>
                    <!--New Name-->
                    <div class="mb-3">
                        <label for="newName" class="form-label">New name</label>
                        <vee-field type="text" class="form-control" id="newName" name="newName" v-model="editedItem.transObj" />
                    </div>
                    <!--Transaction description-->
                    <div class="mb-3">
                        <label for="newDescription" class="form-label">New description</label>
                        <vee-field type="text" class="form-control" id="newDescription" name="newDescription" v-model="editedItem.description" />
                    </div>
                    <!--Transaction type-->
                    <div class="form-group">
                        <label for="transType">Select new type</label>
                        <select class="form-control" id="transType" name="transType" v-model="editedItem.transType">
                        <option v-for="item in types" :key="item">{{ item }}</option>
                        </select>
                    </div>
                    <!--Value of the transaction-->
                    <div class="mb-3">
                        <label class="form-control" for="newValue">New value</label>
                        <vee-field type="number" class="form-control" id="newValue" name="newValue" v-model="editedItem.transVal"/>
                    </div>
                    <!--<button type="submit" class="btn btn-primary">Submit</button>-->
                </vee-form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="saveEdit" :disabled="!ableDisable">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Form, Field, defineRule } from 'vee-validate'

defineRule('required', value => {
    if (!value || value.length === 0) {
        return 'Campo obrigatório'
    }
    return true
})

export default {
    data() {
        
        return {
            schema: {
                newName: 'required',
                newDescription: 'required',
                newType: 'required',
                newValue: 'required'
            },
            editedItem: {
                transObj: null,
                description: null,
                transType: null,
                transVal: null
            },
            
            ableDisable: true,
            itemNames: [],
            types: ['Expenditure', 'Income']
        }
    },
    components: {
        'vee-form':Form,
        'vee-field': Field
    },
    methods: {
        saveEdit() {
            let editedItem = {...this.editedItem}
            this.$emit('saved-edit', editedItem)
            this.editedItem.newName = null
            this.editedItem.newDescription = null
            this.editedItem.newType = null
            this.editedItem.newValue = null
        }
    }
}
</script>