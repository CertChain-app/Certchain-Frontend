module.exports = {
    apps: [
      {
        name: 'cc-app',
        script: 'yarn',
        args: 'run start',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '256M',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
