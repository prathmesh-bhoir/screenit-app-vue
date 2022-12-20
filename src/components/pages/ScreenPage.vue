<template>
  <div>
    <div>
        <AppMenu />
    </div>
    <main class="container">
        <section class="my-container container main-screen">
            hello
        </section>
    </main>
    <div>
        <AppFooter />
    </div>
  </div>
</template>

<script>
import AppFooter from '../AppFooter.vue';
import AppMenu from '../AppMenu.vue';

export default {
    name: 'ScreenPage',
    components:{
        AppMenu,
        AppFooter
    }
}
</script>

<style scoped>
main{
    padding-top: 6em;
    padding-bottom: 3em;
}
.main-screen{
    width: 100%;
    border-radius: 4px;
}
</style>