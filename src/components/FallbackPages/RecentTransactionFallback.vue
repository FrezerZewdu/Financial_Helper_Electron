<template>
    <div class="w-full flex flex-col bg-dashboard bg-opacity-80 rounded-xl border-none z-10 p-3">
        <span class="flex justify-between items-center">
            <p class="text-white text-2xl w-1/4 grayBlob"></p>
            <select class=" py-2 pl-2 pr-4 grayBlob w-1/4">
            </select>
        </span>
        <p class="text-white text-opacity-60 text-base w-2/3"></p>
        <div class="mt-6 h-7 w-full grayBlob">
        </div>
    </div>
</template>
<style>
.grayBlob{
    background-color: #9a9ca1;
    animation: pulse-bg 1s infinite;
}
@keyframes pulse-bg{
    0% {
        background-color: #9a9ca1;
    }
    50% {
        background-color: #ABADB1;
    }
    100% {
        background-color: #9a9ca1;
    }
}
</style>