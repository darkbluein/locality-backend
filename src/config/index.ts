export default {
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    mongodb: {
      connectionString:
        process.env.NODE_ENV === "production"
          ? process.env.MONGODB_URL_PROD
          : process.env.MONGODB_URL_DEV,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};
