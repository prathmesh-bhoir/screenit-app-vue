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
        <b-form>
          <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
            <b-form-input
              id="input-1"
          
              type="email"
              placeholder="enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2" v-if="showPassword">
            <div class="d-flex">
              <b-form-input
                id="input-2"
                type="text"
                placeholder="enter password"
                v-model="form.password"
                required
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
              required
              ></b-form-input>
              <div @click="showPass()" class="icon text-secondary">
                <font-awesome-icon icon="far fa-eye-slash" />
              </div>
            </div>
          </b-form-group>

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
import AppMenu from '../AppMenu.vue'

export default {
  name: 'LoginPage',
  components:{
    AppMenu
  },
  data(){
    return{
      form:{
        password: ''
      },
      showPassword: false
    }
  },
  methods:{
    hidePass(){
      this.showPassword = false
    },
    showPass(){
      this.showPassword = true
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