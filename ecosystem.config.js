/*
module.exports = {
  apps: [{
    name: 'analyticus-insight',
    script: '../bin/www'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-217-12-69.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/key1026.pem',
      ref: 'master',
      repo: 'https://github.com/professorbashorun/analyticus-insight-app',
      path: '/analyticus-insight',
      'post-deploy': 'sudo git pull https://github.com/professorbashorun/analyticus-insight-app && sudo npm install && sudo pm2 startOrRestart /analyticus-insight/ecosystem.config.js'
    }
  }
}
*/



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
      ref: 'master',
      repo: 'git@github.com:professorbashorun/analyticus-insight-app.git',
      path: '/analyticus-insight',
      'post-deploy': /*'sudo git pull https://github.com/professorbashorun/analyticus-insight-app && */'sudo npm install && sudo pm2 startOrRestart /analyticus-ingsight/ecosystem.config.js'
    }
  }
}