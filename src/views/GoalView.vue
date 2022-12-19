<template>
    <div class="h-full w-full">
        <div class="flex justify-between text-white">
            <p>Goals</p>
            <button>New Goals</button>
        </div>
       <div class="grid grid-cols-2 w-full">
            <div 
            class=""
            v-for="goal in goals" :key="goal" 
            v-on:click="viewGoal(goal.id)">

            </div>
       </div>
    </div>
</template>
<script>
import {ref} from 'vue'
const loadedData = async() =>{
    return await window.electronAPI.getGoals
}
export default {
    data () {
        return {
            goals:[]
        }
    },
    methods: {
        viewGoal(id){
            // think of something here
        }
    },
    async created () {
        this.goals =  ref(await loadedData)
    }    
}
</script>
