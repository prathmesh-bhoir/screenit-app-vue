<template>
  <div>
    <div>
      <AppMenu />
    </div>
    <div class="auth-section d-flex justify-content-center align-items-center">
    <div class="auth-container my-container d-flex">
      <div class="secondary-section container d-flex flex-column justify-content-center align-items-center">
        <h2>
          Hello, Friend
        </h2>
        <p>Already have an account?</p>
          <router-link class="text-decoration-none auth-link" :to="{name: 'login' }"><button>Login</button></router-link>
      </div>
      <div class="main-section my-container container d-flex flex-column justify-content-center align-items-center">
        <h3>
          Sign up
        </h3>
        <b-form @submit.prevent="register">
          <b-form-group id="input-group-3" label="Username:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.name"
              @blur="$v.form.name.$touch()"
              type="text"
              placeholder="enter username"
            ></b-form-input>
          </b-form-group>
          <div v-if="$v.form.name.$error">
            <div class="text-danger" v-if="!$v.form.name.required">
              <small>The name is required</small>
            </div>
            <div class="text-danger" v-else-if="!$v.form.name.maxLength">
              <small>The name should not contain more than 35 characters</small>
            </div>
          </div>

          <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.email"
              @blur="$v.form.email.$touch()"
              type="email"
              placeholder="enter email"
            ></b-form-input>
          </b-form-group>
          <div v-if="$v.form.email.$error">
            <div class="text-danger" v-if="!$v.form.email.required">
              <small>The email is required</small>
            </div>
            <div class="text-danger" v-else-if="!$v.form.email.email">
              <small>Invalid email address</small>
            </div>
            <div class="text-danger" v-else-if="!$v.form.email.maxLength">
              <small>The email should not contain more than 30 characters</small>
            </div>
          </div>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2" v-if="showPassword">
            <div class="d-flex">
              <b-form-input
                id="input-2"
                type="text"
                placeholder="enter password"
                v-model="form.password"
                @blur="$v.form.password.$touch()"
              ></b-form-input>
              <div @click="hidePass()" class="icon text-secondary">
                <font-awesome-icon icon="fa-regular fa-eye" />
              </div>
            </div>
          </b-form-group>
          <b-form-group id="input-group-2" label="Password:" label-for="input-2" v-else>
            <div class="d-flex">
              <b-form-input
              id="input-2"
              type="password"
              placeholder="enter password"
              v-model="form.password"
              @blur="$v.form.password.$touch()"
              ></b-form-input>
              <div @click="showPass()" class="icon text-secondary">
                <font-awesome-icon icon="far fa-eye-slash" />
              </div>
            </div>
          </b-form-group>
          <div v-if="$v.form.password.$error">
            <div class="text-danger" v-if="!$v.form.password.required">
              <small>The password is required</small>
            </div>
            <div class="text-danger" v-else-if="!$v.form.password.minLength">
              <small>The password must have at least 8 characters</small>
            </div>
            <div class="text-danger" v-else-if="!$v.form.password.maxLength">
              <small>The password should not contain more than 30 characters</small>
            </div>
            <div class="text-danger" v-else-if="!$v.form.password.containsUppercase">
              <small>The password must have at least 1 uppercase character</small>
            </div>
            <div v-else-if="!$v.form.password.containsLowercase" class="text-danger">
              <small>The password must have at least 1 lowercase character</small>
            </div>
            <div v-else-if="!$v.form.password.containsNumber" class="text-danger">
              <small>The password must have at least 1 digit</small>
            </div>
            <div v-else-if="!$v.form.password.containsSpecial" class="text-danger">
              <small>The password must have at least 1 special character</small>
            </div>
          </div>

          <div class="d-flex justify-content-center">
            <button class="submit-btn">Sign up</button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
  </div>    
  
</template>
  
<script>
import AppMenu from '../AppMenu.vue';
import Vue from 'vue';
import { register } from '@/services/auth';
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';

  export default {
    name: 'SignupPage',
    components:{
      AppMenu
    },
    data(){
      return{
        form:{
          name: '',
          email: '',
          password: ''
        },
        showPassword: false
      }
    },
    validations: {
      form: {
        name: {
          required,
          maxLength: maxLength(35)
        },
        email: {
          required,
          email,
          maxLength: maxLength(30),
        },
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(16),
          containsUppercase: function(value){
            return /[A-Z]/.test(value)
          },
          containsLowercase: function(value){
            return /[a-z]/.test(value)
          },
          containsNumber: function(value) {
              return /[0-9]/.test(value)
          },
          containsSpecial: function(value) {
              return /[@#$?!&*-^]/.test(value)
          } 
        }
      }
    },
    methods:{
        hidePass(){
          this.showPassword = false
        },
        showPass(){
          this.showPassword = true
        },
        async register(){
          this.$v.form.$touch();
            if( this.$v.form.$invalid ) {
              Vue.$toast.open({
                type: 'error',
                message: 'Please correct the errors and then try again!',
                duration: 5000
              })
              return;
            }

          try {
            await register(this.form)
            this.$router.push({
              name: 'login'
            });
            Vue.$toast.open({
              type: 'success',
              message: 'User created successfully! Login to continue.. ',
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
  @import '@/styles/auth.css';

  @media (max-width: 992px) {
    .auth-container{
      flex-direction: column-reverse;
    }
  }

.main-section{
    border-radius: 0 5px 5px 0;
}
.secondary-section{
    border-radius: 5px 0 0 5px;
}

  .icon{
    right: 24%;
  }
</style>