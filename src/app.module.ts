import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { RidesModule } from './modules/rides/rides.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { PassengersModule } from './modules/passengers/passengers.module';
import { DispatchModule } from './modules/dispatch/dispatch.module';
import { SupportModule } from './modules/support/support.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 8001),
        database: config.get('DB_NAME', 'Moviroo_DB_V2'),
        username: config.get('DB_USER', 'postgres'),
        password: config.get('DB_PASSWORD', ''),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // never true in production — schema is managed externally
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
    DashboardModule,
    RidesModule,
    DriversModule,
    VehiclesModule,
    PassengersModule,
    DispatchModule,
    SupportModule,
    RatingsModule,
    UsersModule,
  ],
})
export class AppModule {}
