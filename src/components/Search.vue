<template>
  <b-field>
    <b-input id="searchBar" v-model="searchTerm" placeholder="Search" />
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
  mounted () {
    document.getElementById('searchBar').focus()
  }
}
</script>
