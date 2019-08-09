module.exports = {
    apps: [{
        name: 'web-excel',
        script: 'ts-node',
        args: './server.ts',
        instances: 1,
        autorestart: true,
        watch: ['server', 'client'],
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'dev',
        },
        env_production: {
            NODE_ENV: 'prod',
        }
    }],

};
