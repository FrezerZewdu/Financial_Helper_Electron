<template>
  <div class="home h-screen">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6 absolute top-2 left-2 cursor-pointer" v-on:click="login()" >
  <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
</svg>
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  methods:{
    login () {
      this.$router.push('/login')
    }
  }
}
</script>
<style>
  .home{
    background-image: url('@/assets/images/background.png');
  }
</style>
