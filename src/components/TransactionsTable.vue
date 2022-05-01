<template>
    <p v-if="this.transactions.length === 0">Não transações cadastradas</p>
    <div class="trans-table" v-else>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Type</th>
                <th scope="col">USD</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in transactions" :key="index">
                <th scope="row">{{ index }}</th>
                <td>{{ item.transObj }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.transType }}</td>
                <td>{{ item.transVal }}</td>
                <td>
                <div class="buttons">
                    <button type="button" class="btn btn-primary" @click="sendEdit(index)" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                    <button type="button" class="btn btn-danger ms-1" @click="delTrans(index)">Delete</button>
                </div>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        transactions: {
            type: Array,
            required:true,
            default: null
        }
    },
    methods: {
        delTrans(index) {
            this.$emit('del-item', index)
            },
        sendEdit(index) {
            this.$emit('edit-item', index)
        }
    }
}
</script>
<style scoped>
.trans-table {
    background-color: aliceblue;
}
</style>