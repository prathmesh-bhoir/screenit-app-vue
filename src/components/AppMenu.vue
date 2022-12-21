<template>
  <div class="my-container my-nav" :class="homePage ? 'homePageMenu' : ''">
    <div class="container d-flex justify-content-between align-items-center" :class="homePage ? 'homePageMenu' : ''">
        <div class="d-flex align-items-center ">
            <div class="logo" :class="homePage ? 'hide' : ''">
                <AppLogo />
            </div>
            <div class="menu-items d-flex justify-content-around">
                <router-link class="text-decoration-none text-secondary" :to="{name: 'home' }">HOME</router-link>
                <div>WISHLIST</div>
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
                <div>
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
                    <div class="d-flex flex-column">
                        <font-awesome-icon icon="fa-solid fa-house"/>
                        <div class="">HOME</div>
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
import SearchComp from './SearchComp.vue';

export default {
    name: 'AppMenu',
    data(){
        return{
            homePage: false,
            showSearchBar: true
        }
    },
    components: {
        AppLogo,
        SearchComp
    },
    computed:{
        checkPage(){
            return this.$route.path
        }
    },
    watch:{
        checkPage(){
            this.homePageMenu()
        }
    },  
    created(){
        window.addEventListener('resize', this.checkScreen);
        this.homePageMenu()
    },
    methods:{
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

.bottom-menu{
    display: none;
    border-top: solid 1px #F2F4F8;
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