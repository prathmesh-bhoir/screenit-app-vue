<template>
  <div>
    <div>
      <AppMenu />
    </div>
    <div class="auth-section d-flex justify-content-center align-items-center">
    <div class="auth-container my-container d-flex">
      <div class="main-section my-container container d-flex flex-column justify-content-center align-items-center">
        <h3>
          Login
        </h3>
        <b-form @submit.prevent="login">
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
          </div>

          <div class="d-flex justify-content-center">
            <button class="submit-btn">Login</button>
          </div>
        </b-form>
      </div>
      <div class="secondary-section container d-flex flex-column justify-content-center align-items-center">
        <h2>
          Hello, Friend
        </h2>
        <p>Don't have an account?</p>
          <router-link class="text-decoration-none auth-link" :to="{name: 'signup' }"><button>Sign up</button></router-link>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import AppMenu from '../AppMenu.vue';
import Vue from 'vue';
import { required, email, maxLength } from 'vuelidate/lib/validators';

export default {
  name: 'LoginPage',
  components:{
    AppMenu
  },
  data(){
    return{
      form:{
        email: '',
        password: ''
      },
      showPassword: false
    }
  },
  validations: {
      form: {
        email: {
          required,
          email,
          maxLength: maxLength(30)
        },
        password: {
          required
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
    async login(){
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        Vue.$toast.open({
          type: 'error',
          message: 'Please correct the errors and then try again!',
          duration: 5000
        })
        return;
      }

      try {
        await this.$store.dispatch('login', this.form)
        this.$router.push({
          name: 'home'
        });
        Vue.$toast.open({
          type: 'success',
          message: "User logged in successfully!",
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
@import '@/styles/auth.css';

@media (max-width: 992px) {
    .auth-container{
      flex-direction: column;
    }
}

.main-section{
    border-radius: 5px 0 0 5px;
}
.secondary-section{
    border-radius: 0 5px 5px 0;
}
.icon{
  left: 45%;
}

</style>