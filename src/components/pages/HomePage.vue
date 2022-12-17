<template>
  <div>
    <AppMenu />
    <main>
        <section class="d-flex flex-column justify-content-center align-items-center">
            <div class="main-logo">
                <AppLogo />
            </div>
            <SearchComp />
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
    font-size: 5em;
}
</style>