'use strict'

module.exports = {
  apps: [
    {
      name: 'wello-b2b-front-nuxt',
      script: 'npm',
      args: 'run start',
      autorestart: true,
      watch: false,
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
      max_memory_restart: '500M',
      time: true,
      merge_logs: true,
      log_type: 'raw',
      HOST: '0.0.0.0',
      port: 9001,
      output: './logs/console.log',
      error: './logs/consoleError.log',
      env_stage: {
        NODE_ENV: 'development',
        HOST: '0.0.0.0',
        port: 9001,
      },
      env_production: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        port: 9001,
      },
    },
  ],
}
