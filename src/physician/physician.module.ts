import { Module } from '@nestjs/common';
import { PhysicianService } from './services/physician.service';
import { PhysicianController } from './controllers/physician.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicianEntity } from './models/physician.entity';
import { HttpModule } from '@nestjs/axios';
import { JwtGuard } from './guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhysicianEntity]),
    HttpModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  providers: [PhysicianService],
  controllers: [PhysicianController]
})
export class PhysicianModule {}
