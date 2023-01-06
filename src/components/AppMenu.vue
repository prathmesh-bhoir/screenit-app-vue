<template>
  <div class="my-container my-nav" :class="homePage ? 'homePageMenu' : ''">
    <div class="container d-flex justify-content-between align-items-center" :class="homePage ? 'homePageMenu' : ''">
        <div class="d-flex align-items-center ">
            <div class="logo" :class="homePage ? 'hide' : ''">
                <AppLogo />
            </div>
            <div class="menu-items d-flex justify-content-around">
                <router-link class="text-decoration-none text-secondary" :to="{name: 'home' }">HOME</router-link>
                <router-link class="text-decoration-none text-secondary" :to="{name: 'watchlist' }">WATCHLIST</router-link>
            </div>
        </div>
        <div class="d-flex align-items-center">
            <div class="search-box d-flex" :class="homePage ? 'hide' : ''">
                <div class="icons">
                    <div @click="toggleSearchBar()" class="cancel-icon text-secondary pointer" v-if="showSearchBar">
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </div>
                    <div @click="toggleSearchBar()" class="search-icon text-secondary pointer" v-else>
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </div>
                </div>
                <div class="search" :class="showSearchBar ? '' : 'none'">
                    <SearchComp />
                </div>
            </div>
            <div class="menu-items user-container">
                <div v-if="isLogged" class="d-flex">
                    <button class="user-name my-item my-container d-flex">
                        <font-awesome-icon style="color:#625AFC; margin: 0 0.2em;" icon="far fa-user"/>
                        <div>{{ user.replace(/ +/g, "").toUpperCase() }}</div>
                    </button>
                    <button @click="logout()" class="login-btn my-item my-container d-flex align-items-center">
                        <font-awesome-icon style="color:#625AFC; margin: 0 0.2em;" icon="fas fa-sign-out-alt" />
                        LOGOUT
                    </button>
                </div>
                <div v-else>
                    <button @click="goLogin()" class="login-btn my-item my-container">
                        <font-awesome-icon style="color:#625AFC; margin: 0 0.2em;" icon="far fa-user"/>
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
                    <div class="d-flex flex-column my-item">
                        <font-awesome-icon icon="fa-solid fa-house"/>
                        <div class="">HOME</div>
                    </div>
                </router-link>
            </div>
            <div class="bottom-menu-item">
                <router-link class="text-decoration-none text-secondary font-weight-bolder" :to="{name: 'watchlist' }">
                    <div class="d-flex flex-column my-item">
                        <font-awesome-icon icon="fa-solid fa-list" />
                        <div class="">WATCHLIST</div>
                    </div>
                </router-link>
            </div>
            <div class="bottom-menu-item" v-if="isLogged">
                
                    <div @click="logout()" class="pointer d-flex text-secondary flex-column">
                        <font-awesome-icon icon="fas fa-sign-out-alt" class="my-item" />
                        <div class="my-item">LOGOUT</div>
                    </div>
                
            </div>
            <div class="bottom-menu-item" v-else>
                <router-link class="text-decoration-none text-secondary font-weight-bolder" :to="{name: 'login' }">
                    <div class="d-flex flex-column my-item">
                        <font-awesome-icon icon="user-plus"/>
                        <div class="">LOGIN</div>
                    </div>
                </router-link>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import AppLogo from './AppLogo.vue';
import SearchComp from './SearchComp.vue';

export default {
    name: 'AppMenu',
    data(){
        return{
            homePage: false,
            showSearchBar: true,
            isLogged: false,
            user: ''
        }
    },
    components: {
        AppLogo,
        SearchComp
    },
    computed:{
        checkUser(){
            return this.$store.getters.userName;
        },
        checkPage(){
            return this.$route.path
        }
    },
    watch:{
        checkUser(){
            this.checkLogin()
        },
        checkPage(){
            this.homePageMenu()
        }
    },  
    created(){
        window.addEventListener('resize', this.checkScreen);
        this.homePageMenu();
        this.checkLogin();
    },
    methods:{
        checkLogin(){
            if(localStorage.getItem('name')){
                this.isLogged = true
                this.user = this.$store.getters.userName
            }
        },
        goLogin(){
            this.$router.push('/login')
        },
        homePageMenu(){
            if(this.$route.path == '/'){
                this.homePage = true
            }else{
                this.homePage = false
            }
        },
        checkScreen(){
            if(window.innerWidth >= 500){
              this.showSearchBar = false
            }
        },
        toggleSearchBar(){
            this.showSearchBar = !this.showSearchBar
        },
        logout(){
            localStorage.clear();
            this.isLogged = false;
            this.$router.replace({name: 'home'});
        }
    }
}
</script>

<style scoped>

.homePageMenu{
    height: 50px;
    background-color: transparent;
}
.hide *{
    display: none;
}
.logo{
    cursor: pointer;
    font-size: 1.5em;
    margin-right: 0.5em;
}

.my-nav{
    position: fixed;
    top: 0;
    width: 100vw;
}
.menu-items *{
    margin: 0 1em;
}

.search-box{
    margin-right: 0.5em;
    width: 300px;
}
.search{
    width: 100%;
}
/* .search-box input{
    background-color: inherit;
} */
.user-name,
.login-btn{
    border: 1px solid grey;
    color: inherit;
    border-radius: 5px;
    padding: 0.5em;
    margin-left: 0;
}
.login-btn:hover{
    color: #625AFC;
}
.user-name{
    max-width: 150px;
    overflow: hidden;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
}
.user-name div{
    margin: 0 0 0 2px;
}

.bottom-menu{
    display: none;
    border-top: solid 1px #F2F4F8;
    padding: 0 1.5em;
    width: 100vw;
    position: fixed;
    bottom: 0;
}

.bottom-menu-item{
    padding: 0.75em 0;
}

@media (max-width: 992px) {
    .menu-items *{
        display: none !important;
    }

    .bottom-menu{
        display: block;
    }
}


.icons{
    display: none;
    position: absolute;
    font-size: large;
    top: 30%;
    right: 5%;
}
/* .cancel-icon:hover,
.search-icon:hover{
    color: #625AFC;
} */

@media (max-width: 500px) {
    .none{
        display: none;
    }
    .icons{
        display: block;
    }
    .search{
        position:absolute;
        width: auto;
        top: 55px;
        left: 5%;
        right: 5%;
    }
}

</style>