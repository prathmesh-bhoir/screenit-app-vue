<template>
  <div v-if="valid">
    <div>
        <AppMenu />
    </div>
    <main class="container">
        <section class="my-container main-screen">
            <section class="stock-container">
                <div class="stock-headers d-flex justify-content-between">
                    <div>
                        <h1 class="name">{{ searchedFor }}</h1>
                        <div class="d-flex">
                            <p class="price">${{ stockDetails.c }}</p>
                            <span :class="positive ? 'green' : 'red'">
                                <small v-if="positive"><font-awesome-icon icon="fa-solid fa-arrow-up" /></small>
                                <small v-else><font-awesome-icon icon="fa-solid fa-arrow-down" /></small>
                                <small class="pecrentage-change">{{ stockDetails.dp }}%</small>
                            </span>
                        </div>
                    </div>
                    <div class="">
                        <button v-if="addedToList" @click.prevent="remFromList()" class="remFromList-btn">- Remove from List</button>
                        <button v-else @click.prevent="addToList()" class="addToList-btn">Add to Watchlist</button>
                    </div>
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
                    <div>
                        <p class="grey">Change</p>
                        <p><span class="grey">$ </span>{{ stockDetails.d }}</p>
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

import Vue from 'vue';
import {getStock} from '../../services/stockDetails'
import { addToList, delFromList } from '@/services/watchlist';

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
            valid: true,
            positive: false,
            watchlist: '',
            addedToList: false
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
        this.checkWatchlist();
    },     
    methods:{
        async checkWatchlist(){
            await this.$store.dispatch('getWatchlist')
            this.watchlist = localStorage.getItem('watchlist').split(",")
            if(this.watchlist.includes(this.searchedFor)){
                this.addedToList = true
            }
        },
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

            if(res.dp > 0){
                this.positive = true
            }else{
                this.positive = false
            }
        },
        async addToList(){
            try {
                const data = await addToList(this.searchedFor);

                if(data){
                    this.addedToList = true
                }
                this.checkWatchlist();

                Vue.$toast.open({
                type: 'success',
                message: "Added to watchlist successfully!",
                duration: 5000
                })
            } catch (error) {
                Vue.$toast.open({
                type: 'error',
                message: error.response.data,
                duration: 5000
              })
            }
        },
        async remFromList(){
            try {
                const data = await delFromList(this.searchedFor);

                if(data){
                    this.addedToList = false
                }
                this.checkWatchlist()

                Vue.$toast.open({
                type: 'success',
                message: "Removed from watchlist!",
                duration: 5000
                })
            } catch (error) {
                Vue.$toast.open({
                type: 'error',
                message: error.response.data,
                duration: 5000
              })
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
    padding-bottom: 5em;
    height: 100vh;
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
.addToList-btn{
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.25em 0.75em 0.25em 0.75em;
    background-color: #625AFC;
    color: white;
    
}
.remFromList-btn{
    border: none;
    border-radius: 5px;
    padding: 0.25em 0.75em 0.25em 0.75em;
    background-color: crimson;
    color: white;
}

.price{
    margin-bottom: 0;
    margin-right: 10px;
    font-size: 18px;
    font-weight: 500;
}
.pecrentage-change{
    margin-left: 2.5px;
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

.stock-details div:not(:last-child) {
    border-bottom: 0.5px solid lightgrey;
}
.stock-details div:nth-last-child(2){
    border: none;
}

@media (max-width: 992px) {
    .stock-details{
        grid-template-columns: 1fr;
    }

    .stock-details div:not(:last-child) {
        border-bottom: 0.5px solid lightgrey;
    }
}
@media (max-width: 400px) {
    .stock-headers{
        flex-direction: column;
    }
    .addToList-btn,
    .remFromList-btn{
        margin-top: 0.5em;
    }
    .stock-details{
        font-size: 14px;
    }
}
</style>