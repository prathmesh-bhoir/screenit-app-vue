<template>
  <div>
    <form @submit.prevent="screenit()">
      <div class="d-flex search-form">
        <div class="text-secondary search-icon">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </div>
        <div class="search-box">
          <input class="search-input" type="text" placeholder="Enter company's symbol"
          v-model="form.searchFor"
          @blur="$v.form.searchFor.$touch()"
          >
          <div class="input-error" v-if="$v.form.searchFor.$error">
            <div class="text-danger" v-if="!$v.form.searchFor.required">
            </div>
          </div>
        </div>
        <button class="submit" type="submit">Search</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import Vue from 'vue';
import { getStock } from '@/services/stockDetails';

export default {
    name: 'SearchComp',
    data(){
      return{
        form: {
          searchFor: ''
        }
      }
    },
    validations: {
      form: {
        searchFor: {
          required
        }
      }
    },
    methods:{
      async screenit(){
        this.$v.form.$touch();
        if( this.$v.form.$invalid ) {
            return;
        }else{
          const valid = await getStock(this.form.searchFor)
          if (!valid.c) {
            Vue.$toast.open({
              type: 'error',
              message: "Does not exist!",
              duration: 5000
            })
            this.form.searchFor = ''
            return;
          }
          this.$router.push({ name: 'screen', params: {name: this.form.searchFor.toLowerCase()}})
          this.form.searchFor = ''
        }
      }
    }
    
}
</script>

<style scoped>
.input-error{
  position: absolute;
}
/* .submit{
  position:absolute;
  visibility: hidden;
} */
.submit{
  border: none;
    border-radius: 5px;
    padding: 0.25em 0.75em 0.25em 0.75em;
    background-color: #625AFC;
    color: white;
}

.search-icon{
  padding-top: 6px;
  padding-left: 10px;
  position: absolute;

}
.search-box{
  width: 100%;
  height: 100%;
}

.search-input{
  padding-top: 0.45em;
  padding-bottom: 0.45em;
  padding-left: 2.5em;
  color: inherit;
  border: 1px solid grey;
  border-radius: 4px;
  width: 100%;
  height: 100%;
}
</style>