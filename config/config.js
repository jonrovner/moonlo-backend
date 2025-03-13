module.exports = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DPGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres",
    sslmode: 'require',
    native:true,
    ssl:true,
    dialectOptions: {
      ssl: {
        require: true,
        // Ref.: https://github.com/brianc/node-postgres/issues/2009
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
  },
};
