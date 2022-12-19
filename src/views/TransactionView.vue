<template>
    <div class="h-full w-full">
        <div class="flex justify-between border-b border-gray-700 shadow-md pb-3">
            <p class="text-white text-5xl">Ledgers</p>
            <button class="text-buttonGreen-100 border-2 border-buttonGreen-100 bg-transparent pr-3 pl-1 py-2 text-2xl rounded-lg" v-on:click="revileNewLedger=true">Create Ledger</button>
        </div>
        <div class="mt-5 w-full">
            <table class="w-full">
                <thead class="border border-gray-600 text-center text-white">
                    <th class="py-3 pl-3 pr-6">Date</th>
                    <th class="py-3 pl-3 pr-6">Status</th>
                    <th class="py-3 pl-3 pr-6">Status changed date</th>
                    <th class="py-3 pl-3 pr-6">Amount</th>
                    <th class="py-3 pl-3 pr-6">Category</th>
                </thead>
                <tbody>
                    <tr class="text-white text-center" v-for="transaction in transactions" :key="transaction">
                        <td>{{transaction.registeredDate}}</td>
                        <td v-if="transaction.done == 0" class="text-yellow-300">Not Recieved</td>
                        <td v-else-if="transaction.done == 1" class="text-green-500">Recieved</td>
                        <td v-else-if="transaction.done == 2" class="text-yellow-600">Not Payed out</td>
                        <td v-else-if="transaction.done == 3" class="text-red-500">Payed out</td>
                        <td v-if="transaction.done == 0" class="text-yellow-300">-</td>
                        <td v-else-if="transaction.done == 1" class="text-green-500">{{transaction.doneDate}}</td>
                        <td v-else-if="transaction.done == 2" class="text-yellow-600">-</td>
                        <td v-else-if="transaction.done == 3" class="text-red-500">{{transaction.doneDate}}</td> 
                        <td>{{transaction.ammount}}</td>
                        <td>{{transaction.category}}</td>                
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            transactions : []
        }
    }
}
</script>