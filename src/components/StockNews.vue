<template>
  <div v-if="stockNews.length > 0" class="container">
    <h2>Latest News:</h2>
    <div class="latest-news">
        <div v-for="news in stockNews" :key="news.id" class="news-section container">
            <h4>{{ news.headline }}</h4>
            <!-- <p class="news-date text-secondary"><i>Date-</i></p> -->
            <div class="news-image-section d-flex justify-content-center">
                <img :src="news.image" :alt="news.headline" class="news-image">
            </div>
            <p>{{ news.summary }} <a :href="news.url" target="_blank">Click here to read more.</a></p>
        </div>
    </div>
  </div>
</template>

<script>
import {getNews} from '../services/stockDetails'

export default {
    name: 'StockNews',
    props: ['stock'],
    data(){
        return{
            stockNews: ''
        }
    },
    created(){
        this.getNews()
    },
    methods: {
        async getNews(){
            this.stockNews = await getNews(this.stock)
        }
    }

}
</script>

<style scoped >

    .latest-news{
        margin-top: 1em;
        display: grid;
        grid-template-columns: repeat(2, 49%);
        gap: 1.5rem;
    }
    .news-section{
        padding: 1em 1.5em 0 1.5em;
        border: 1px solid grey;
        border-radius: 5px;
        margin-bottom: 1em;
    }
    h4{
        margin-bottom: 0em;
    }
    .news-date{
        margin-bottom: 0.25em;
    }
    .news-image-section{
        /* width: 100%; */
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        height: 200px;
    }
    img{
        width: 100%;
        height: 100%;
    }

    @media (max-width: 992px){
        .latest-news{
            grid-template-columns: 1fr;
        }

    }

    @media (max-width: 992px){
        .news-image-section{
            height: 150px;
        }
    }
</style>