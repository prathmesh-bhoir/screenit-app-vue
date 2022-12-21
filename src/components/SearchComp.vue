<template>
  <div>
    <form @submit.prevent="screenit()">
      <div class="d-flex search-form">
        <div class="text-secondary search-icon">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </div>
        <div class="search-box">
          <input class="search-input" type="text" placeholder="Search for a company"
          v-model="form.searchFor"
          @blur="$v.form.searchFor.$touch()"
          >
          <div v-if="$v.form.searchFor.$error">
            <div class="text-danger" v-if="!$v.form.searchFor.required">
            </div>
          </div>
        </div>
        <input class="submit" type="submit">
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

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
      screenit(){
        this.$v.form.$touch();
        if( this.$v.form.$invalid ) {
            return;
        }else{
          this.$router.push({ name: 'screen', params: {name: this.form.searchFor}})
        }
      }
    }
    
}
</script>

<style scoped>

.submit{
  position:absolute;
  visibility: hidden;
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