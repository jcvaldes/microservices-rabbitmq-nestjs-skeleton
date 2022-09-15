import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptors';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptors';
import * as momentTimezone from 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor(), new TimeoutInterceptor());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Buenos_Aires')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };
  await app.listen(3009);
}
bootstrap();
