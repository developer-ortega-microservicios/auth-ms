import { Module } from '@nestjs/common';
import { NatsModule } from '../transports/nats.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../config/envs.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [NatsModule, 
    JwtModule.register({
      global: true,
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '30d' }
    })
  ],
})
export class AuthModule {}
