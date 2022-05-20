import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentationConfig = new DocumentBuilder()
    .setTitle('WebMovies - API')
    .setVersion('1.0')
    .build();

  const documentation = SwaggerModule.createDocument(app, documentationConfig);

  SwaggerModule.setup('docs', app, documentation);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
