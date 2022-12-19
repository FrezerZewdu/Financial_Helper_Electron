<template>
    <div class="relative pt-2 w-full h-full">
        <div class="flex justify-between border-b border-gray-700 shadow-md pb-3">
            <p class="text-white text-5xl">Ledgers</p>
            <button class="text-buttonGreen-100 border-2 border-buttonGreen-100 bg-transparent pr-3 pl-1 py-2 text-2xl rounded-lg" v-on:click="revileNewLedger=true">Create Ledger</button>
        </div>
        <div class="mt-5 w-full">
            <table class="w-full">
                <thead class="border border-gray-600 text-center text-white">
                    <th class="py-3 pl-3 pr-6">Name</th>
                    <th class="py-3 pl-3 pr-6">Profit</th>
                    <th class="py-3 pl-3 pr-6">Created date</th>
                    <th class="py-3 pl-3 pr-6">Active</th>
                </thead>
                <tbody>
                    <tr class="text-white text-center" v-for="ledger in ledgers" :key="ledger.id">
                        <td>{{ledger.name}}</td>
                        <td>{{ledger.net}}</td> 
                        <td>{{ledger.createdDate}}</td>
                        <td v-if="ledger.active == 1" class="text-green-600">Active</td>
                        <td v-else class="text-red-500">Closed</td>                      
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="revileNewLedger" class="w-full h-full absolute top-0 flex justify-center items-center bg-black bg-opacity-60" >
            <div class="bg-black flex flex-col space-y-5 py-5 px-9">
                <span class="flex justify-between">
                    <p class="text-white text-2xl">New Ledger</p>
                    <button v-on:click="revileNewLedger = false">   
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </span>                
                
                <span class="flex space-x-4 text-white">
                    <label for="ledgerName">Ledger Name</label>
                    <input name="ledgerName" type="text" class="px-4 py-2 bg-black placeholder-buttonGreen-200 text-buttonGreen-100" placeholder="eg. Sales ledger" v-model="ledger.name">
                </span>
                <span class="flex space-x-4 text-white">
                    <label for="bankName">Description</label>
                    <textarea class="w-full h-1/6 bg-black text-buttonGreen-100 placeholder-buttonGreen-200 px-3 py-1" placeholder="eg. Write something that describes the purpose of this ledger" v-model="ledger.description" ></textarea>
                </span>
                <span class="flex space-x-4 text-white items-center">
                    <label for="bankName">Active</label>
                    <input name="bankName" type="checkbox" class="px-4 py-2" v-model="ledger.active">
                </span>
                <span class="flex justify-end">
                    <button v-on:click="createLedger()" class="bg-buttonGreen-100 rounded-md border-none hover:scale-50 px-5 py-2 text-white">Create</button>
                </span>
            </div>

        </div>

    </div>
</template>
<script>
import {ref} from 'vue'
const loadedData = async()=>{
    return await window.electronAPI.getLedgers()
}
export default {
    data () {
        return {
            ledger: {
                name: '',
                description: '',
                active: 0
            },
            revileNewLedger: false,
            ledgers: [],
            active: true,
            notActive: false
        }
    },
    methods:{
        createLedger () {
            const ledgerNew = JSON.parse(JSON.stringify(this.ledger))
            var message = window.electronAPI.createLedger(ledgerNew)
            console.log(message)
        }
    },
    async created(){
        this.ledgers = ref(await loadedData())
    }
}
</script>