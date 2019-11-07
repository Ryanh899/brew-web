//set the development config for knex to connect to pgsql 
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : 'ec2-54-221-215-228.compute-1.amazonaws.com',
      user : 'mxqchuznyjooit',
      password : '7d9afdd8b8ca128b0663917f48b8e97045589cad5d377f110f6c723eec405eb2',
      database : 'df43ba9t22510r',
      charset: 'utf8', 
      ssl: true
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },
  staging: {
    client: 'pg',
    connection: {
      host : 'ec2-54-221-215-228.compute-1.amazonaws.com',
      user : 'mxqchuznyjooit',
      password : '7d9afdd8b8ca128b0663917f48b8e97045589cad5d377f110f6c723eec405eb2',
      database : 'df43ba9t22510r',
      charset: 'utf8', 
      ssl: true
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  production:{
    client: 'pg',
    connection: {
      host : 'ec2-54-221-215-228.compute-1.amazonaws.com',
      user : 'mxqchuznyjooit',
      password : '7d9afdd8b8ca128b0663917f48b8e97045589cad5d377f110f6c723eec405eb2',
      database : 'df43ba9t22510r',
      charset: 'utf8', 
      ssl: true
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },
};
