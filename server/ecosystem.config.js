module.exports = {
  apps: [
    {
      name: 'backend',
      script: './index.js',
      cwd: '/home/ubuntu/backend',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
