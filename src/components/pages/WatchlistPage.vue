<template>
  <div>
    <AppMenu />
    <main class="container">
        <section class="my-container watchlist-screen">
            <div class="d-sm-flex">
                <h1 class="header-name">Watchlist</h1>
                <form @submit.prevent="addToList()">
                    <div class="search-box d-flex">
                        <input class="search-input" type="text" placeholder="Add to Watchlist" 
                            v-model="form.addThis"
                            @blur="$v.form.addThis.$touch()">
                        <div v-if="$v.form.addThis.$error">
                            <div class="text-danger" v-if="!$v.form.addThis.required">
                            </div>
                        </div>

                        <button type="submit">Add</button>
                        </div>
                </form>
            </div>
            <div class="watchlist">
                <div class="d-flex">
                    <p>Sr.No.</p>
                    <p>Name</p>
                    <p>Current Price</p>
                </div>
                <div v-for="(item, index) in watchlist" :key="item" class="d-flex">
                    <p>{{index+1}}</p>
                    <p>{{item}}</p>
                    <p>{{stockDetails[index].c}}</p>
                    <div @click.prevent="delFromList(item)" class="pointer"><font-awesome-icon icon="fa-solid fa-trash" /></div>
                </div>
            </div>
        </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppMenu from '../AppMenu.vue';
import AppFooter from '../AppFooter.vue';

import Vue from 'vue';
import { getStock } from '@/services/stockDetails';
import {getWatchlist, addToList, delFromList } from '@/services/watchlist';
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'WatchlistPage',
    components: {
        AppMenu,
        AppFooter
    },
    data(){
        return {
            form: {
                addThis: ''
            },
            watchlist: '',
            stockDetails: []
        }
    },
    validations: {
      form: {
        addThis: {
          required
        }
      }
    },
    created(){
        this.getWatchlist()
    },
    methods: {
        async getWatchlist(){
            const response = await getWatchlist();

            this.watchlist = response.data

            this.watchlist.forEach(async(item) => {
                const data = await getStock(item);
                console.log(data)
                this.stockDetails.push(data);
            })

        },
        async addToList(){
            try {
                const valid = await getStock(this.form.addThis)
                if(!valid.c){
                    Vue.$toast.open({
                    type: 'error',
                    message: "Does not exist!",
                    duration: 5000
                    })
                    this.form.addThis = ''
                    return
                }
                const stock = this.form.addThis.toUpperCase()
                await addToList(stock) 
                this.getWatchlist()

                this.form.addThis = ''

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
        async delFromList(item){
            try {
                await delFromList(item)
                this.getWatchlist()

                Vue.$toast.open({
                type: 'success',
                message: "Removed from watchlist successfully!",
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

<style scoped >

main{
    padding-top: 6em;
    padding-bottom: 5em;
    height: 100vh;
}

.watchlist-screen{
    border-radius: 10px;
    padding: 1em 1em 2em 1em;
}
.header-name{
    margin: 0;
}
.watchlist{
    padding-top: 1em;
}
</style>