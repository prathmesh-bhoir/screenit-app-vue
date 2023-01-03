<template>
  <div v-if="valid">
    <div>
        <AppMenu />
    </div>
    <main class="container">
        <section class="my-container main-screen">
            <section class="stock-container">
                <div class="stock-headers">
                    <h1 class="name">{{ searchedFor }}</h1>
                    <p class="price">${{ stockDetails.c }}</p>
                </div>
                <div class="chart-container">
                    <StockChart />
                </div>
                <section class="stock-details">
                    <div>
                        <p class="grey">Opening Price</p>
                        <p><span class="grey">$ </span>{{ stockDetails.o }}</p>
                    </div>
                    <div>
                        <p class="grey">High Price</p>
                        <p><span class="grey">$ </span>{{ stockDetails.h }}</p>
                    </div>
                    <div>
                        <p class="grey">Low Price</p>
                        <p><span class="grey">$ </span>{{ stockDetails.l }}</p>
                    </div>
                    <div>
                        <p class="grey">Current Price</p>
                        <p><span class="grey">$ </span>{{ stockDetails.c }}</p>
                    </div>
                    <div>
                        <p class="grey">Previous Closing Price</p>
                        <p><span class="grey">$ </span>{{ stockDetails.pc }}</p>
                    </div>
                </section>
            </section>
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
import StockChart from '../StockChart.vue'

import {getStock} from '../../services/stockDetails'

export default {
    name: 'ScreenPage',
    components:{
        AppMenu,
        AppFooter,
        StockChart
    },
    data(){
        return{
            searchedFor: 'null',
            stockDetails: '',
            valid: true
        }
    },
    computed:{
        checkPage(){
            return this.$route.path
        }
    },
    watch:{
        checkPage(){
            this.getDetails()
        }
    },  
    created(){
        this.getDetails();
    },    
    // mounted(){
    //     this.getDetails();
    // },  
    methods:{
        async getDetails(){
            let stock = this.$route.params.name;
            this.searchedFor = stock.toUpperCase();
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
p{
    margin: 0;
}

main{
    padding-top: 6em;
    padding-bottom: 4em;
}
.main-screen{
    width: 100%;
    border-radius: 10px;
    padding: 1em 1em 2em 1em;
}
.stock-headers{
    margin-bottom: 1em;
}
.name{
    margin: 0;
}
.price{
    margin-bottom: 0;
    font-weight: 500;
}

.chart-container{
    margin-bottom: 1em;
}

.stock-details{
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 1em 1em 0em 1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5em
}
.stock-details div{
    display: flex;
    justify-content: space-between;
    padding-right: 0.5em;
    padding-bottom: 0.5em;
    margin-bottom: 0.5em;
    font-weight: 500;
}

@media (max-width: 992px) {
    .stock-details{
        grid-template-columns: 1fr;
    }
    .stock-details div:not(:last-child){
        border-bottom: 0.5px solid lightgrey;
    }
}
</style>