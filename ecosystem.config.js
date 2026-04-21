module.exports = {
  apps: [
    {
      name: 'zelect-site',
      script: 'server.js',
      cwd: '/home/developer/projects/zelect',
      env: {
        PORT: 3777,
        HOST: '0.0.0.0',
        NODE_ENV: 'production',
      },
      max_memory_restart: '200M',
      autorestart: true,
      watch: false,
    },
  ],
};
