<template>
  <router-link class="text-decoration-none logo" :to="{name: 'home' }"><strong>screenit</strong></router-link>
</template>

<script>

export default {
    name: "AppLogo",
}
</script>

<style scoped>
strong{
    font-weight: 600;
}

.logo{
  color: inherit;
}
</style>