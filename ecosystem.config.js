module.exports = {
  apps: [
    {
      name: 'tokentap-app',
      cwd: '/var/www/token-tap-app',
      script: './start.sh',
      interpreter: '/bin/bash',
      env: {
        NODE_ENV: 'production',
        NEXT_DISABLE_PWA: '1',
        PNPM_NON_INTERACTIVE: '1',
        CI: 'true',
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 5,
      merge_logs: true,
    },
  ],
};
