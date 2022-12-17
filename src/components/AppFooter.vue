<template>
  <div class="my-container">
    <div class="container app-footer">
      <div class="logo">
        <AppLogo />
      </div>
      <section class="d-flex justify-content-between">
        
      </section>
    </div>
  </div>
</template>

<script>
import AppLogo from './AppLogo.vue';

export default {
    name: 'AppFooter',
    components: {
        AppLogo
    }
}
</script>

<style scoped>

.app-footer{
  padding-bottom: 2em;
}
.logo{
  cursor: pointer;
  font-size: 2em;
}

</style>