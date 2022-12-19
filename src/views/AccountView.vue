<template>
    <div class="relative h-full w-full">
        <div class="flex justify-end p-3">
            <button v-on:click="revileNewAccount = true" class="self-end items-center text-buttonGreen-100 border-2 border-buttonGreen-100 bg-transparent pr-3 pl-1 py-2 text-2xl rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline-block">
                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>
            Add Account
        </button>       
        </div>
        <hr class="border border-gray-200 mt-2" />
        <div class="p-5">
            <div class="bg-dashboard rounded-xl p-2 pb-6">
                <table class="w-full">
                    <thead>
                        <tr class="border-none text-xl">
                            <th class="py-2 px-4 text-white ">Bank Name</th>
                            <th class="py-2 px-4 text-white ">Account type</th>
                            <th class="py-2 px-4 text-white ">Personal Identifier</th>
                            <th class="py-2 px-4 text-white ">Account Number</th>
                            <th class="py-2 px-4 text-white ">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class=" text-white bg-transparent odd:bg-white odd:bg-opacity-20" v-for="account in accounts" :key="account">
                            <td>{{account.bankName}}</td>
                            <td class="text-center">{{account.accountType}}</td>
                            <td class="text-center">{{account.personalIdentifier}}</td>
                            <td class="text-center">{{account.accountNumber}}</td>
                            <td class="text-center">{{account.balance}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="revileNewAccount" class="w-full h-full absolute top-0 flex justify-center items-center bg-black bg-opacity-60" >
            <div class="bg-black flex flex-col space-y-5 py-5 px-9">
                <span class="flex justify-between">
                    <p class="text-white text-2xl">New account</p>
                    <button v-on:click="revileNewAccount = false">   
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </span>                
                
                <span class="flex space-x-4 text-white">
                    <label for="bankName">Bank Name</label>
                    <input name="bankName" type="text" class="px-4 py-2 bg-black placeholder-buttonGreen-200 text-buttonGreen-100" placeholder="eg. Commercial bank of Ethiopia" v-model="account.bankName">
                </span>
                <span class="flex space-x-4 text-white">
                    <label for="accountType">Account type</label>
                    <select class="px-4 py-2 text-center text-buttonGreen-100 bg-black" name="accountType" id="" v-model="account.accountType">
                        <option v-for="types in accountTypes" :key="types" :value="types">{{types}}</option>
                    </select>
                </span>
                <span class="flex space-x-4 text-white">
                    <label for="personalIdentifier">Personal Identifier</label>
                    <input name="personalIdentifier" type="text" class="px-4 py-2 bg-black placeholder-buttonGreen-200 text-buttonGreen-100" placeholder="eg. My car savings" v-model="account.personalIdentifier">
                </span>
                <span class="flex space-x-4 text-white">
                    <label for="bankName">Account Number</label>
                    <input name="bankName" type="text" class="px-4 py-2 bg-black placeholder-buttonGreen-200 text-buttonGreen-100" placeholder="eg. 1000334495586764" v-model="account.accountNumber">
                </span>
                <span class="flex space-x-4 text-white">
                    <label for="bankName">balance</label>
                    <input name="bankName" type="text" class="px-4 py-2 bg-black placeholder-buttonGreen-200 text-buttonGreen-100" placeholder="eg. 2000.00" v-model="account.balance">
                </span>
                <span class="flex space-x-4 text-white">
                    <label for="bankName">Description</label>
                    <!-- make this a text area -->
                    <textarea class="w-full h-1/6 bg-black text-buttonGreen-100 placeholder-buttonGreen-200 px-3 py-1" placeholder="eg. Write something that describes the purpose of this account" v-model="account.description" ></textarea>
                </span>
                <span class="flex space-x-4 text-white items-center">
                    <label for="bankName">Active</label>
                    <input name="bankName" type="checkbox" class="px-4 py-2" v-model="checkValue">
                </span>
                <span class="flex justify-end">
                    <button v-on:click="createAccount()" class="bg-buttonGreen-100 rounded-md border-none hover:scale-50 px-5 py-2 text-white">Submit</button>
                </span>
            </div>

        </div>
    </div>
</template>
<script>
import {ref} from 'vue'
const loadedData = async()=>{
    return await window.electronAPI.getAccounts()
}
export default {
    data () {
        return {
            checkValue: false,
            account: {
                bankName: '',
                accountType: '',
                personalIdentifier: '',
                accountNumber: '',
                balance: '',
                description: '',
                accountOpenDate: '',
                active: 0
            },
            accountTypes: ['Savings','Checking', 'Current','Fixed deposit','Non-residential'],
            revileNewAccount: false,
            // accounts: [
            //     {"bankName": "Bank of Abysinia", "accountType": "Savings", "personalIdentifier": "Savings", "accountNumber": "10000254584513","balance": "10,000.00"},
            //     {"bankName": "Berehan Bank", "accountType": "Savings", "personalIdentifier": "bills", "accountNumber": "10000254584513","balance": "10,000.00"},
            //     {"bankName": "United Bank", "accountType": "Savings", "personalIdentifier": "Investment", "accountNumber": "10000254584513","balance": "10,000.00"},
            //     {"bankName": "Commercial bank of Ethiopia", "accountType": "Savings", "personalIdentifier": "lesure", "accountNumber": "10000254584513","balance": "10,000.00"}
            // ]
            accounts: []
        }
    },
    methods: {
        createAccount (){
            //here we add the add acounts logic
            if(this.isValidated()){
                if(this.checkValue === true ){
                    this.accountOpenDate = 1
                }
                else{
                    this.accountOpenDate = 0
                }
                const accountNew = JSON.parse(JSON.stringify(this.account))
                var message = window.electronAPI.createAccount(accountNew)
                console.log(message)
            }
        },
        isValidated(){
            return true
        }
    },
    async created(){
        this.accounts = ref(await loadedData())
    }
}
</script>
<style>
tr:nth-child(even){
    background: white;
    opacity: 30%;
    color: black;
}
</style>