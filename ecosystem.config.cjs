const path = require('path')

const envFile = path.join(__dirname, '.env')

module.exports = {
  apps: [
    {
      name: 'arr-spa-dev',
      cwd: __dirname,
      script: 'npm',
      args: 'run dev',
      env_file: envFile,
      env: {
        NODE_ENV: 'development'
      },
      autorestart: true,
      max_memory_restart: '300M',
      exec_mode: 'fork',
      watch: false
    },
    {
      name: 'arr-spa-preview',
      cwd: __dirname,
      script: 'npm',
      args: 'run preview',
      env_file: envFile,
      env: {
        NODE_ENV: 'production'
      },
      autorestart: true,
      max_memory_restart: '300M',
      exec_mode: 'fork',
      watch: false
    }
  ]
};

