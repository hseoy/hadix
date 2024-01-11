// import * as path from 'path';
import {
  Injectable,
  Logger,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { clientConfig, databaseConfig, jwtConfig, oauthConfig } from './config';
import { S3Module } from './s3/s3.module';
import awsConfig from './config/aws.config';
import { NextFunction, Request, Response } from 'express';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;

    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.log(
        `${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`,
      );
    });

    next();
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, oauthConfig, jwtConfig, clientConfig, awsConfig],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mysql',
    //     entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
    //     url: configService.get<string>('database.url'),
    //     logging: configService.get<boolean>('database.logging'),
    //     synchronize: configService.get<boolean>('database.autoDDL'),
    //     namingStrategy: new SnakeNamingStrategy(),
    //   }),
    // }),
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
