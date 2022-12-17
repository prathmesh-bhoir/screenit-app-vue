<template>
  <div class="my-container my-nav">
    <div class="container d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center ">
            <div class="logo">
                <AppLogo />
            </div>
            <div class="menu-items d-flex justify-content-around">
                <router-link class="text-decoration-none text-secondary font-weight-bolder" :to="{name: 'home' }">HOME</router-link>
                <div>WISHLIST</div>
            </div>
        </div>
        <div class="d-flex align-items-center">
            <div class="menu-items user-container">
                <div>
                    <button @click="goLogin()" class="login-btn my-item my-container">
                        <font-awesome-icon style="color:#625AFC; margin: 0 0.2em;" icon="faR fa-user"/>
                        LOGIN
                    </button>
                </div>              
            </div>
        </div>
    </div>

    <div class="bottom-menu my-container">
        <div class="bottom-menu-items container d-flex justify-content-between align-items-center">
            <div class="bottom-menu-item">
                <router-link class="text-decoration-none text-secondary font-weight-bolder" :to="{name: 'home' }">
                    <div class="d-flex flex-column">
                        <font-awesome-icon icon="fa-solid fa-house"/>
                        <div class="my-item">HOME</div>
                    </div>
                </router-link>
            </div>
            <div class="bottom-menu-item">
                <router-link class="text-decoration-none text-secondary font-weight-bolder" :to="{name: 'login' }">
                    <div class="d-flex flex-column">
                        <font-awesome-icon icon="user-plus"/>
                        <div class="my-item">LOGIN</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import AppLogo from './AppLogo.vue';

export default {
    name: 'AppMenu',
    components: {
        AppLogo
    },
    methods:{
        goLogin(){
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.logo{
    cursor: pointer;
    font-size: 2.5em;
    margin-right: 1em;
}

.my-nav{
    position: fixed;
    width: 100vw;
}
.menu-items *{
    margin: 0 1em;
}

.login-btn{
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 0.5em;
}

.bottom-menu{
    display: none;
    padding: 0 1.5em;
    width: 100vw;
    position: fixed;
    bottom: 0;
}

.bottom-menu-item{
    padding: 1em 0;
}

@media (max-width: 992px) {
    .menu-items *{
        display: none;
    }

    .bottom-menu{
        display: block;
    }
}


</style>