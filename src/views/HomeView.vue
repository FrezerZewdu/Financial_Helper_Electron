<template>
  <div class="home h-full">
    <div class="absolute left-5 top-48 flex flex-col ">
      <p class="text-8xl text-white">Start Saving</p>
      <p class="text-8xl text-green-700">Effectively</p>
      <button class="self-end py-4 px-8 bg-buttonGreen-100 rounded-xl text-white text-5xl mt-10" v-on:click="login()" >Get Started -></button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  methods:{
    login(){
      this.$router.push('/login')
    }
  }
}
</script>
<style>
  .home{
    background-image: url("@/assets/images/background.png");
  }
</style>
