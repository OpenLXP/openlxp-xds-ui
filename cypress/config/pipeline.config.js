require('dotenv').config()
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
        console.log(config) // see everything in here!
  
        // modify config values
        config.defaultCommandTimeout = 10000
        config.baseUrl = process.env('ZAP_URL')

        config.env.ZAP_URL = process.env('ZAP_URL')
  
        // IMPORTANT return the updated config object
        return config
      },
  
  },
})