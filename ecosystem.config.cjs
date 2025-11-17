module.exports = {
  apps: [
    {
      name: 'arr-spa-dev',
      cwd: __dirname,
      script: 'npm',
      args: 'run dev -- --host 0.0.0.0 --port 5173',
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
      args: 'run preview -- --host 0.0.0.0 --port 4173',
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

