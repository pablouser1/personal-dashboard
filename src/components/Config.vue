<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Config</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Background">
        <b-input v-model="background"></b-input>
        <p class="control">
          <b-button @click="sendBackground()" type="is-primary" label="Save" />
        </p>
      </b-field>
      <b-field label="Search engine">
        <b-input v-model="search"></b-input>
        <p class="control">
          <b-button @click="sendSearch()" type="is-primary" label="Save" />
        </p>
      </b-field>
      <b-field label="Dashboard (WIP)">
        <textarea id="dashboard_textbox" spellcheck="false" class="textarea" v-model="dashboard" rows="15"></textarea>
      </b-field>
      <b-button @click="sendDashboard()" type="is-primary" label="Save" />
      <b-field label="Backup">
        <div class="file">
          <label class="file-label">
            <input id="importInput" @change="importConfig()" class="file-input" type="file">
            <span class="file-cta">
              <span class="file-label">Import config (WIP)</span>
            </span>
          </label>
        </div>
        <b-button type="is-success" @click="exportConfig()">Export</b-button>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <b-button label="Close" @click="$parent.close()" />
    </footer>
  </div>
</template>

<script>
import { showBackground } from '../helpers/misc.js'
export default {
  name: 'Config',
  data () {
    return {
      background: this.$store.state.background,
      dashboard: JSON.stringify(this.$store.state.dashboard),
      search: this.$store.state.search,
      file: null // Import JSON file
    }
  },
  methods: {
    sendBackground () {
      this.$store.commit('setBackground', this.background)
      showBackground(this.background)
      this.saveCommon()
    },
    sendSearch () {
      this.$store.commit('setSearch', this.search)
      this.saveCommon()
    },
    sendDashboard () {
      try {
        const dashboardObj = JSON.parse(this.dashboard)
        this.$store.commit('setDashboard', dashboardObj)
        this.saveCommon()
      } catch (error) {
        this.$buefy.toast.open({
          message: `Error saving dashboard, ${error}`,
          type: 'is-danger'
        })
      }
    },
    saveCommon () {
      localStorage.setItem('dashboard_conf', JSON.stringify(this.config))
      this.$buefy.toast.open({
        message: 'Saved successfully',
        type: 'is-success'
      })
    },
    importConfig () {
      const files = document.getElementById('importInput').files
      const file = files[0]
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = e => {
        const text = e.target.result
        try {
          const configJSON = JSON.parse(text)
          this.$store.commit('setConfig', configJSON)
          this.saveCommon()
        } catch (error) {
          this.$buefy.toast.open({
            message: `Error saving config, ${error}`,
            type: 'is-danger'
          })
        }
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
  computed: {
    config () {
      return this.$store.state
    }
  }
}
</script>
