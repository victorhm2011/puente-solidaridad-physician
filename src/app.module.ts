import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtGuard } from './physician/guards/jwt.guard';
import { JwtStrategy } from './physician/guards/jwt.strategy';
import { RolesGuard } from './physician/guards/roles.guard';
import { PhysicianModule } from './physician/physician.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // This for development
      autoLoadEntities: true,
    }),
    PhysicianModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtGuard, JwtStrategy, RolesGuard,
  ],
})
export class AppModule {}
