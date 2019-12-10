module.exports = {
  apps: [
    {
      name: 'prodserver',
      script: './build',
      instances: 1,
      autorestart: true,
      exec_mode: 'fork',
      watch: false
    }
  ]
}
