require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "pediatrics",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: 5432,
    define: {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "pediatrics",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: 5432,
    define: {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "pediatrics",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: 5432,
    define: {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  },
};
