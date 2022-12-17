<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
@import url(./styles/normalize.css);

body{
  background-color: #F2F4F8;
  color: black;
}

.dark-mode{
  background-color: #0F1017;
  color: #fff;
}
.dark-mode .my-container{
  background-color: #212531;
}

.my-container{
  background-color: #fff;
}


.my-item:hover{
  color: #625AFC;
}

.pointer{
  cursor: pointer;
}
</style>
