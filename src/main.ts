import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const porta = configService.get<number>('PORT') || 3000;
  // app.enableCors({
  //     origin: 'http://localhost:3000',
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //     credentials: true,
  //   });

  app.useGlobalInterceptors(new TransformInterceptor());
  
  app.enableCors();
  await app.listen(porta);

  console.log('aplicação rodando na porta:', porta);
}
bootstrap();
