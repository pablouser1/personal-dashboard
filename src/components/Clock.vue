<template>
  <p v-if="date" class="subtitle">{{ date }}</p>
</template>

<script>
export default {
  name: 'Clock',
  data () {
    return {
      interval: null,
      date: null
    }
  },
  methods: {
    updateDate () {
      const today = new Date()
      this.date = today.toLocaleTimeString()
    }
  },
  created () {
    this.updateDate()
    this.interval = setInterval(() => {
      this.updateDate()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
