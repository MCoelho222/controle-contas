<template>
<div id="app">
  <div class="transactions">
    <div id="btn-addTrans">
      <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
      New Transaction
      </button>
    </div>
     <hr>
    <ModalApp id="exampleModal" @add-trans="addTrans"></ModalApp>
    <TransactionsTable :transactions="transactions" @del-item="delTrans" @edit-item="editItem"></TransactionsTable>
    <EditModal id="editModal" @saved-edit="changeItem"></EditModal>
   
    <div class="footer">
      <p>Expenditures: {{ expendSum }}</p>
      <p>Income: {{ incomeSum }}</p>
      <p>Balance: {{ balance }}</p>
    </div>
  </div>
</div>
</template>

<script>

import ModalApp from './components/ModalApp.vue'
import TransactionsTable from './components/TransactionsTable.vue'
import EditModal from './components/EditModal.vue'
export default {
  name: 'App',
  components: {
    ModalApp,
    TransactionsTable,
    EditModal
},
  data() {
    return {
      transactions:[],
      toEdit: null
    }
  },
  computed: {
    expendSum() {
      let expend = this.transactions.filter(item => item.transType == 'Expenditure')
      return this.sum(expend).toLocaleString("en-US", {style:"currency", currency:"USD"})
    },
    incomeSum() {
      let income = this.transactions.filter(item => item.transType == 'Income')
      return this.sum(income).toLocaleString("en-US", {style:"currency", currency:"USD"})
    },
    balance() {
      let expend = this.transactions.filter(item => item.transType == 'Expenditure')
      let income = this.transactions.filter(item => item.transType == 'Income')
      let balance = this.sum(income) - this.sum(expend)
      return balance.toLocaleString("en-US", {style:"currency", currency:"USD"})
    }
  },
  methods: {
    delTrans(index) {
      this.transactions.splice(index, 1)
    },
    addTrans(item) {
      let newTransaction = {...item} 
      this.transactions.push(newTransaction)
    },
    sum(item) {
      for (let i = 0; i < item.length; i++) {
        const element = item[i]
        if (!element.counted == true) {
          element.counted = true
          let num = element.transVal.split('$')
          let pureNum = ''
          for (let i = 0; i < num[1].length; i++) {
            const element = num[1][i];
            if (element != ',') {
              pureNum += element
            }
          }
          element.transVal = pureNum
        }  
      }
      let thisSum = item.reduce((acc, item) => Number(item.transVal) + acc, 0)
      return thisSum
    },
    editItem(index) {
      this.toEdit = index
    },
    changeItem(item) {
      let inEdition = this.transactions[this.toEdit]
      for (var prop in item) {
        if (item[prop] != null) {
          inEdition[prop] = item[prop]
        }
      }
    } 
  },
}
</script>

<style>
body {
  background-color: cadetblue;
}
#btn-addTrans {
  margin-bottom: 50px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.footer {
  background-color: rgb(138, 231, 234);
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
}
.footer p {
  margin: 2px;
}
</style>
