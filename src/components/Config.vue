<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Config</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Background">
        <b-input v-model="background"></b-input>
      </b-field>
      <b-field label="Search engine (WIP)">
        <b-input v-model="search"></b-input>
      </b-field>
      <b-field label="Dashboard (WIP)">
        <textarea id="dashboard_textbox" spellcheck="false" class="textarea" v-model="dashboard" rows="15"></textarea>
      </b-field>
      <b-field label="Backup">
        <div class="buttons">
          <b-button>Import</b-button>
          <b-button type="is-success" @click="exportConfig()">Export</b-button>
        </div>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <b-button label="Close" @click="$parent.close()" />
      <b-button @click="sendConfig()" label="Save" type="is-primary" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Config',
  data () {
    return {
      background: this.$store.state.background,
      dashboard: JSON.stringify(this.$store.state.dashboard),
      search: '' // WIP
    }
  },
  methods: {
    sendConfig () {
      try {
        const dashboardObj = JSON.parse(this.dashboard)

        const newConfig = {
          background: this.background,
          dashboard: dashboardObj
        }
        this.$store.commit('setConfig', newConfig)
        localStorage.setItem('dashboard_conf', JSON.stringify(newConfig))
        this.$buefy.toast.open({
          message: 'Saved successfully',
          type: 'is-success'
        })
        this.$parent.close()
      } catch (error) {
        this.$buefy.toast.open({
          message: `Error saving changes, ${error}`,
          type: 'is-danger'
        })
      }
    },
    exportConfig () {
      const configString = JSON.stringify(this.config, null, 2)
      const blob = new Blob([configString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      window.open(url)
    }
  },
  mounted () {
    document.getElementById('dashboard_textbox').addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault()
        var start = this.selectionStart
        var end = this.selectionEnd
        // set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) + '\t' + this.value.substring(end)

        // put caret at right position again
        this.selectionStart =
        this.selectionEnd = start + 1
      }
    })
  },
  beforeDestroy () {
    document.getElementById('dashboard_textbox').removeEventListener('keydown')
  },
  computed: {
    config () {
      return this.$store.state
    }
  }
}
</script>
