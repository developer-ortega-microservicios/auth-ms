import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  registerUser(@Payload() registerUserDto: RegisterUserDto){
    return this.authService.registerUser(registerUserDto);
  }

  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginUserdto: LoginUserDto){
    return this.authService.loginUser(loginUserdto);
  
  }
  
  @MessagePattern('auth.verify.user')
  verifyToken(){
    return 'verify token'
  }



}
