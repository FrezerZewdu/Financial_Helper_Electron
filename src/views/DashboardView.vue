<template>
    <div class="h-full w-full">
        <p class="text-white text-4xl">dashboard</p>
        <div class="grid grid-rows-3 grid-flow-col gap-x-6 gap-y-2 h-full w-full">
            <Suspense class="">
                <template #default>
                            <RecentTransactionView/>
                        </template>
                        <template #fallback>
                           <RecentTransactionFallback/>
                        </template>
            </Suspense>
           
            <div class="flex flex-col">
                <p class="text-white">Recent Transactions</p>
                <!-- <div>this  will be dynamically loaded</div> -->
            </div>
            
            <div class="flex flex-col row-span-2">
                <p class="text-white text-4xl">Tax Tab</p>
                <!-- how to deal with this  -->
            </div>
            
            <div class="text-white">
                <!-- this will be a doughnut graph that shows which type of expense is in terms of percentages -->
                <p>Expenses</p>
                <!-- then on the bottom wil be a toogle to change between income and expenses same thing tho with a little sparkle of css -->
            </div>
        </div>
    </div>
</template>
<script>
import RecentTransactionView from '@/components/RecentTransactionComp.vue'
import RecentTransactionFallback from '@/components/FallbackPages/RecentTransactionFallback.vue'
export default {
    components: {
        RecentTransactionView,
        RecentTransactionFallback
    }
}
</script>