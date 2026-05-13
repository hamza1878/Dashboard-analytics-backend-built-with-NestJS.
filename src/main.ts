import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Moviroo Mobility OS API')
    .setDescription('Backend API for the Moviroo ride-hailing platform. Covers rides, drivers, vehicles, passengers, dispatch, support, and analytics.')
    .setVersion('1.0')
    .addTag('dashboard', 'KPI overview & analytics')
    .addTag('rides', 'Ride lifecycle management')
    .addTag('drivers', 'Driver profiles & availability')
    .addTag('vehicles', 'Fleet management')
    .addTag('passengers', 'Passenger profiles')
    .addTag('dispatch', 'Dispatch offers & matching')
    .addTag('support', 'Support tickets & messages')
    .addTag('ratings', 'Ride ratings')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Moviroo API running on http://localhost:${port}/api`);
  logger.log(`Swagger docs at http://localhost:${port}/docs`);
}

bootstrap();
