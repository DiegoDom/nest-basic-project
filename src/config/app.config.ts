export const appConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  port: +process.env.PORT || 3000,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  jwt_secret: process.env.JWT_SECRET,
});
