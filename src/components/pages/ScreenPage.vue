<template>
  <div v-if="valid">
    <div>
        <AppMenu />
    </div>
    <main class="container">
        <section class="my-container container main-screen">
            {{ searchedFor }}
        </section>
    </main>
    <div>
        <AppFooter />
    </div>
  </div>
  <div v-else>
   <h4>PAGE NOT FOUND</h4>
  </div>
</template>

<script>
import AppFooter from '../AppFooter.vue';
import AppMenu from '../AppMenu.vue';

import {getStock} from '../../services/stockDetails'

export default {
    name: 'ScreenPage',
    data(){
        return{
            searchedFor: 'null',
            stockDetails: '',
            valid: true
        }
    },
    components:{
        AppMenu,
        AppFooter
    },
    created(){
        this.getDetails();
    },
    methods:{
        async getDetails(){
            let stock = this.$route.params.name;
            this.searchedFor = stock
            let res = await getStock(stock.toUpperCase());
            console.log(res)
            if(res.dp){
                this.stockDetails = res;
                this.valid = true
            }else{
                this.valid = false
            }
        }
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