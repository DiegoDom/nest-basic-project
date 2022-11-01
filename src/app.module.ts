import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfiguration, joiValidationSchema } from './config';

@Module({
  imports: [
    //! SIEMPRE COLOCAR AL INICIO ESTE IMPORT
    ConfigModule.forRoot({
      load: [appConfiguration],
      validationSchema: joiValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //! No se debe utilizar en producción, de otro modo podrias perder los datos
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
