<template>
    <div class="home h-full flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6 absolute top-2 left-2 cursor-pointer" v-on:click="home()" >
  <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
</svg>

        <div class="p-8 bg-white bg-opacity-20 blur-2xl flex flex-col space-y-10 self-center">
            <p class="self-start text-6xl text-white">Login</p>
            <input class="bg-gray-100 bg-opacity-80 py-3 px-5 text-4xl placeholder-black placeholder-opacity-50 border-none rounded-lg " type="text" placeholder="Username"/>
            <input class="bg-gray-100 bg-opacity-80 py-3 px-5 text-4xl placeholder-black placeholder-opacity-50 border-none rounded-lg" type="password" placeholder="Password"/>
            <button class="self-end py-2 px-12 bg-buttonGreen-100 rounded-xl text-white text-5xl" v-on:click="loginButton()">Login</button>
            <p class="text-white self-start">Do have an account?<span class="ml-1 inline-block text-buttonGreen-100 hover:underline decoration-buttonGreen-100 cursor-pointer" v-on:click="signup()">Sign up</span></p>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        home () {
            this.$router.push('/');
        },
        loginButton(){
            // login process here
            this.$router.push('/main/dashboard')
        },
        signup() {
            this.$router.push('/signup')
        }
    }
}
</script>
<style>
.home{
    background-image: url('@/assets/images/background.png');
}
</style>