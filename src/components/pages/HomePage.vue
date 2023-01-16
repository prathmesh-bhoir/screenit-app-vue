<template>
  <div>
    <AppMenu />
    <main>
        <section class="home-section d-flex flex-column justify-content-center align-items-center">
            <div class="main-logo">
                <AppLogo />
            </div>
            <div class="d-flex justify-content-center flex-wrap">
                <p class="sub-header text-center">Stock analysis and screening tool for investors in India.</p>
            </div>
            <div class="">
                <p class="text-secondary search-guide text-center">( Search with company's NASDAQ Symbol For e.g. WMT, NKE, AAPL )</p>
            </div>
            <div class="search-box">
                <SearchComp />
            </div>
            <div class="d-flex flex-wrap justify-content-center container">
                <div>
                    <p class="mr-right text-secondary">Or view:</p>
                </div>
                <div class="d-flex flex-wrap justify-content-center">
                    <p class="view-item">
                        <router-link class="text-decoration-none" :to="{ name: 'screen', params: {name: 'AAPL'}}">Apple</router-link>
                    </p>
                    <p class="view-item">
                        <router-link class="text-decoration-none" :to="{ name: 'screen', params: {name: 'TSLA'}}">Tesla</router-link>
                    </p>
                    <p class="view-item">
                        <router-link class="text-decoration-none" :to="{ name: 'screen', params: {name: 'IBM'}}">IBM</router-link>
                    </p>
                    <p class="view-item">
                        <router-link class="text-decoration-none" :to="{ name: 'screen', params: {name: 'META'}}">Meta</router-link>
                    </p>
                    <p class="view-item">
                        <router-link class="text-decoration-none" :to="{ name: 'screen', params: {name: 'MSFT'}}">Microsoft</router-link>
                    </p>
                    <p class="view-item">
                        <router-link class="text-decoration-none" :to="{ name: 'screen', params: {name: 'NKE'}}">Nike</router-link>
                    </p>
                    <p class="view-item">
                        <router-link class="text-decoration-none" :to="{ name: 'screen', params: {name: 'AMZN'}}">Amazon</router-link>
                    </p>
                </div>
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
.search-guide{
    font-size: 1em;
    margin-bottom: 0;
}
.search-box{
    width: 40%;
    margin-top: 1em;
    margin-bottom: 1em;
}

.mr-right{
    margin-right: 0.5em;
}

.view-item{
    margin-right: 0.5em;
}



@media (max-width: 992px) {
    .search-box,
    .view-stocks-section{
        width: 60%;
    }
}

@media (max-width: 500px) {
    .search-box,
    .view-stocks-section{
        width: 80%;
    }
    .main-logo{
        font-size: 4.5em;
    }
    .sub-header{
        font-size: 0.9em;
        margin-bottom: 0.5rem;
    }
    .search-guide{
        font-size: 0.7em;
    }

    .mr-right,
    .view-item{
        font-size: 0.9em;
    }

}
</style>