module.exports = {
  apps: [
    {
      name: 'token_tap_app',
      cwd: '/var/www/token-tap-app',
      script: 'node_modules/.bin/next',
      args: 'start -p 3007',
      exec_mode: 'fork',
      instances: 1,
      env: { NODE_ENV: 'production' }
    }
  ]
}
