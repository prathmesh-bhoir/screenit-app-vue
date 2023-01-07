<template>
  <div>
    <AppMenu />
    <main class="container">
        <section class="my-container watchlist-screen">
            <div class="header-section d-flex justify-content-between align-items-center ">
                <div>
                    <h1 class="header-name">Watchlist</h1>
                </div>
                <div>
                    <form @submit.prevent="addToList()">
                        <div class="search-box">
                            <input class="search-input" type="text" placeholder="Add to Watchlist" 
                                v-model="form.addThis"
                                @blur="$v.form.addThis.$touch()">
                            <div class="input-error" v-if="$v.form.addThis.$error">
                                <div class="text-danger" v-if="!$v.form.addThis.required">
                                </div>
                            </div>
    
                            <button type="submit" class="addToList-btn">Add</button>
                            </div>
                    </form>
                </div>
            </div>
            <div class="watchlist container">
                
                <table class="watchlist-table table table-bordered" :class="theme=='light' ? 'table-striped' : ''">
                    <thead>
                        <tr>
                            <th class="text-center">Sr.No</th>
                            <th class="text-center">Company</th>
                            <th class="text-end">Current Price</th>
                            <th class="text-end">Opening Price</th>
                            <th class="text-end">Previous Closing Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>                       
                        <tr v-for="(item, index) in watchlist" :key="item">
                            <td class="text-center">{{ index+1 }}</td>
                            <td class="text-center"><router-link class="text-decoration-none" :to="{ name: 'screen', params: {name: item}}">{{item}}</router-link></td>
                            <td class="text-end">$ {{stockDetails[index].c}}</td>
                            <td class="text-end">$ {{stockDetails[index].o}}</td>
                            <td class="text-end">$ {{stockDetails[index].pc}}</td>
                            <td @click.prevent="delFromList(item)" class="pointer red text-center"><font-awesome-icon icon="fa-solid fa-trash" /></td>
                        </tr>
                    </tbody>
                </table>
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
import { addToList, delFromList } from '@/services/watchlist';
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'WatchlistPage',
    components: {
        AppMenu,
        AppFooter,
    },
    data(){
        return {
            form: {
                addThis: ''
            },
            watchlist: '',
            stockDetails: [],
            theme: ''
        }
    },
    validations: {
      form: {
        addThis: {
          required
        }
      }
    },
    computed:{
    getTheme(){
      return this.$store.getters.theme;
    }
    },
    watch: {
        getTheme() {
            this.changeTheme();
        }
    },
    created(){
        this.changeTheme()
        this.getWatchlist()
    },
    methods: {
        async getWatchlist(){
            const response = await this.$store.dispatch('getWatchlist');

            this.watchlist = response

            this.watchlist.forEach(async(item) => {
                const data = await getStock(item);
                data["name"] = item
                this.stockDetails.push(data);
            })

        },
        async addToList(){
            this.$v.form.$touch();
            if( this.$v.form.$invalid ) {
                return;
            }
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
                type: 'warning',
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
        },
        changeTheme(){
            this.theme = this.$store.getters.theme
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
.watchlist-table{
    margin-top: 1em;
    color: inherit;
}
.watchlist-table th.text-end,
.watchlist-table td.text-end{
    padding-right: 1em;
}
.search-input{
    outline: none;
    border: none;
    border-bottom: 1px solid grey;
    background-color: transparent;
    color: inherit;
    padding: 0.25em;
    margin-right: 1em;
}

.addToList-btn{
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.25em 0.75em 0.25em 0.75em;
    background-color: #625AFC;
    color: white;
}

.input-error{
    position: absolute;
}

@media (max-width: 992px)  {
    .watchlist{
        overflow-x: scroll;
        white-space:nowrap;
    }
}

@media (max-width: 575px)  {
    .header-section{
        flex-direction: column;
        justify-content: flex-start;
    }
    .header-section div{
        width: 100%;
    }
    .header-name{
        margin-bottom: 0.5em;
    }
}
</style>