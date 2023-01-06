<template>
  <div id="app" :class="darkTheme=='dark' ? 'dark-mode' : ''">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      darkTheme: ''
    }
  },
  components: {
    
  },
  computed:{
    getTheme(){
      return this.$store.getters.theme;
    }
  },
  watch:{
    getTheme(){
      this.changeTheme();
    }
  },
  created(){
    // this.getSymbols();
    this.changeTheme();
  },
  methods:{
    async getSymbols(){
      await this.$store.dispatch('getSymbols')
    },
    changeTheme(){
      this.darkTheme = this.$store.getters.theme
    }
  }
}
</script>

<style>
@import url(./styles/normalize.css);

html, body{
  background-color: #F2F4F8;
  color: black;
}

.dark-mode{
  background-color: #0F1017;
  color: #fff;
}
.dark-mode .my-container{
  background-color: #212531;
}
.dark-mode .home-section input{
  background-color: #212531;
}
.dark-mode .my-nav input,
.dark-mode .auth-section input,
.dark-mode .auth-section .submit-btn:hover,
.dark-mode .my-nav .login-btn
{
  background-color: #0F1017;
}
.dark-mode .auth-section input{
  color: white;
}
.dark-mode .auth-section .submit-btn:hover{
  border: 1px solid #625AFC;
}

.my-container{
  background-color: #fff;
}


.my-item:hover{
  color: #625AFC;
}

.pointer{
  cursor: pointer;
}

.grey{
  color: grey;
}

.green{
  color: green;
}

.red{
  color: red;
}
</style>
