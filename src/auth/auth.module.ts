import { Module } from '@nestjs/common';
import { NatsModule } from '../transports/nats.module.js';
import { AuthController } from './auth.controller.js';

@Module({
  controllers: [AuthController],
  providers: [NatsModule],
})
export class AuthModule {}
