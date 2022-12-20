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
      console.log(this.darkTheme)
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

body{
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

.my-container{
  background-color: #fff;
}


.my-item:hover{
  color: #625AFC;
}

.pointer{
  cursor: pointer;
}
</style>
