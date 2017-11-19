module.exports = {
  apps: [{
    name: 'analyticus-insight',
    script: './bin/www'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-217-12-69.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/key1026.pem',
      ref: 'origin/master',
      repo: 'git@github.com:professorbashorun/analyticus-insight-app.git',
      path: '/analyticus-insight',
      'post-deploy': 'sudo npm install && sudo pm2 startOrRestart ecosystem.config.js'
    }
  }
}
