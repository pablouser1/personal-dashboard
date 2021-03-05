<template>
  <b-field>
    <b-input id="searchBar" v-model="searchTerm" :placeholder="displaySearch" />
  </b-field>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      searchTerm: ''
    }
  },
  methods: {
    startSearch () {
      let url
      switch (this.searchEngine) {
        case 'google':
          url = `https://google.com/search?q=${this.searchTerm}`
          break
        case 'duckduckgo':
          url = `https://duckduckgo.com/?q=${this.searchTerm}`
          break
        default:
          this.$buefy.toast.open('Invalid search engine')
      }
      if (url) {
        location.href = url
      }
    }
  },
  mounted () {
    document.getElementById('searchBar').focus()
    document.getElementById('searchBar').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.startSearch()
      }
    }, false)
  },
  computed: {
    searchEngine () {
      return this.$store.state.search
    },
    displaySearch () {
      return this.$store.state.search.charAt(0).toUpperCase() + this.$store.state.search.slice(1)
    }
  }
}
</script>
