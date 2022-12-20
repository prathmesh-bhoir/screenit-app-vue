<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="my-container container">

    </div>
    <div class="container">
      <h2>
        Don't have an account?
      </h2>
      <router-link class="text-decoration-none" :to="{name: 'signup' }">Sign up</router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'LoginPage'
}
</script>

<style>

</style>