<template>
  <div id="app">
    <Navbar @showConfig="isConfigActive = true"></Navbar>
    <section id="hero-main" class="hero is-fullheight-with-navbar has-bg-img">
      <div class="hero-body">
        <Dashboard></Dashboard>
      </div>
    </section>
    <!-- Config modal --->
    <b-modal
      v-model="isConfigActive"
      has-modal-card
      full-screen>
      <Config></Config>
    </b-modal>
  </div>
</template>

<script>
import Config from './components/Config.vue'
import Dashboard from './components/Dashboard.vue'
import Navbar from './components/Navbar.vue'
import { showBackground } from './helpers/misc.js'

export default {
  name: 'App',
  data () {
    return {
      isConfigActive: false
    }
  },
  components: { Navbar, Dashboard, Config },
  methods: {
    checkConfig () {
      if (localStorage.getItem('dashboard_conf')) {
        const localConfig = JSON.parse(localStorage.getItem('dashboard_conf'))
        this.$store.commit('setConfig', localConfig)
        return true
      } else {
        return false
      }
    },
    firstRun () {
      this.$buefy.dialog.alert('Hi, welcome to my personal dashboard. Click config to start customizing')
      localStorage.setItem('dashboard_conf', JSON.stringify(this.config))
    },
    startUp () {
      if (this.config.background) {
        showBackground(this.config.background)
      }
    }
  },
  created () {
    const haveConfig = this.checkConfig()
    if (!haveConfig) {
      console.log('Doing first run...')
      this.firstRun()
    } else {
      console.log('Config loaded')
    }
  },
  mounted () {
    this.startUp()
  },
  computed: {
    config () {
      return this.$store.state
    }
  }
}
</script>

<style>
.has-bg-img {
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.panel-block {
  color: black;
  background-color: white;
  opacity: 75%;
}
</style>
