<template>
  <div>
    <AppMenu />
    <main>
        <section class="home-section d-flex flex-column justify-content-center align-items-center">
            <div class="main-logo">
                <AppLogo />
            </div>
            <div>
                <p class="sub-header">Stock analysis and screening tool for investors in India.</p>
            </div>
            <div class="search-box">
                <SearchComp />
            </div>
        </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppLogo from '../AppLogo.vue';
import AppMenu from '../AppMenu.vue';
import SearchComp from '../SearchComp.vue';
import AppFooter from '../AppFooter.vue'

export default {
    name: 'HomePage',
    data(){
        return{
            symbols: ''
        }
    },
    created:{

    },
    components: {
        AppLogo,
        AppMenu,
        SearchComp,
        AppFooter
    }
}
</script>

<style scoped>

section{
    height: 100vh;
}

.main-logo{
    margin-top: 0;
    margin-bottom: 0;
    font-size: 6em;
}
.sub-header{
    font-size: 1.25em;
}
.search-box{
    width: 40%;
    margin-top: 1em;
}



@media (max-width: 992px) {
    .search-box{
        width: 60%;
    }
}

@media (max-width: 500px) {
    .search-box{
        width: 80%;
    }
    .main-logo{
        font-size: 4.5em;
    }
    .sub-header{
        font-size: 0.9em;
        margin-bottom: 0.5rem;
    }
}
</style>