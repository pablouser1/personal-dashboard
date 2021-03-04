<template>
  <b-navbar type="is-info">
    <template #brand>
      <b-navbar-item>
        Dashboard
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item @click="emitConfig()">
        Config
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    emitConfig () {
      this.$emit('showConfig')
    }
  }
}
</script>
