<template>
  <div class="my-container">
    <div class="container app-footer">
      <div class="logo">
        <AppLogo />
      </div>
      <section class="d-flex footer-section justify-content-between">
        <div class="info-section">
          <div class="info">
            <p class="bolder" style="font-size: 1.20em;">Stock analysis and screening tool</p>
            <p class="text-secondary">Made with &#10084; in India.</p>
            <p class="text-secondary">Data provided by Finnhub.io</p>
          </div>
        </div>
        <div class="right-section d-flex justify-content-around">
          <div class="d-flex flex-column">
            <p class="bolder">Product</p>
            <router-link class="text-decoration-none text-secondary" :to="{name: 'home' }">Home</router-link>
            <router-link v-if="isLogged" class="text-decoration-none text-secondary" :to="{name: 'watchlist' }">Watchlist</router-link>
            <div @click="unauthorized()" v-else  class="text-secondary pointer">Watchlist</div>
          </div>
          <div>
            <p class="bolder">Team</p>
            <router-link class="text-decoration-none text-secondary" :to="{name: 'home' }">Contact us</router-link>
          </div>
          <div>
            <p class="bolder">Theme</p>
            <div @click.prevent="themeDark()" class="text-secondary pointer">
              <font-awesome-icon icon="fa-regular fa-moon" />
              <span>    Dark</span>
            </div>
            <div @click.prevent="themeLight()" class="text-secondary pointer">
              <font-awesome-icon icon="fa-regular fa-sun" />
              <span>    Light</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AppLogo from './AppLogo.vue';

import Vue from 'vue';

export default {
    name: 'AppFooter',
    data(){
      return{
        isLogged: false
      }
    },
    components: {
      AppLogo
    },
    computed:{
      checkUser(){
        return localStorage.getItem('name')
      }
    },
    watch:{
      checkUser(){
        this.userStatus()
      }
    },
    created(){
      this.userStatus()
    },
    methods:{
      userStatus(){
        if(localStorage.getItem('name')){
          this.isLogged = true
        }
      },
      themeLight(){
        this.$store.dispatch('setTheme', 'light')
      },
      themeDark(){
        this.$store.dispatch('setTheme', 'dark')
      },
      unauthorized(){
        this.$router.replace({name: 'login'});
        Vue.$toast.open({
          type: 'error',
          message: `Loggin to use Watchlist!`,
          duration: 5000
        })
      }
    }
}
</script>

<style scoped>
.bolder{
  font-weight: 500;
}
.app-footer{
  padding-top: 1em;
  padding-bottom: 5em;
}
.logo{
  cursor: pointer;
  font-size: 1.4em;
  font-weight: 450 !important;
}

.right-section{
  width: 60%;
}

p{
  margin-bottom: 0.5rem;
}

@media (max-width: 992px)  {
  .app-footer{
    padding-bottom: 6em;
  }
  .info-section{
    padding-top: 1em;
    border-top: 1px solid grey;
  }

  .right-section{
    justify-content: space-between !important;
    padding-top: 0.5em;
    padding-bottom: 1.5em;
    min-width: 80%;
  }
  .footer-section{
    flex-direction: column-reverse;
  }
}

</style>