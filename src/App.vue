<template>
  <div id="app">
    <navbar />
    <!--<div id="nav">-->

      <!--&lt;!&ndash;<router-link to="/">Homerir</router-link> |&ndash;&gt;-->
      <!--&lt;!&ndash;<router-link to="/chart">Chart</router-link>&ndash;&gt;-->
    <!--</div>-->
    <router-view/>
  </div>
</template>

<style>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
    import Navbar from "./components/Navbar";
    export default {
        components: {Navbar}
    }
</script>
