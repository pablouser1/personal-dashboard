<template>
  <div class="container">
    <p class="title">Welcome home</p>
    <Clock></Clock>
    <Search></Search>
    <div class="columns is-centered is-vcentered">
      <Card v-for="(element, index) in dashboardItems" :key="`element${index}`" :element="element"></Card>
    </div>
  </div>
</template>

<script>
import Clock from './Clock.vue'
import Search from './Search.vue'
import Card from './Card.vue'
export default {
  name: 'Dashboard',
  components: { Card, Clock, Search },
  computed: {
    dashboardItems () {
      return this.$store.state.dashboard
    }
  }
}
</script>
