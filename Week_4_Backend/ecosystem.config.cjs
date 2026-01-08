module.exports = {
  apps: [
    {
      name: 'week4-api',
      script: 'src/index.js',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'local',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'email-worker',
      script: 'src/jobs/email.worker.js',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'local',
      },
    },
  ],
};
