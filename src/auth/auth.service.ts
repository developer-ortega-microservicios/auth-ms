import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from './dto/register-user.dto.js';
import bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto.js';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface.js';
import { envs } from '../config/envs.js';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService
  ) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('MongoDB connected')
  }

  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }

  async verifyToken(token: string){
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret
      });

      return {
        user: user,
        token: await this.signJWT(user)
      }
    } catch (error) {
      throw new RpcException({
        status: 401,
        message: 'Invalid token'
      })
    }
  }


  async registerUser(registerUserDto: RegisterUserDto) {

    const { email, name, password } = registerUserDto

    try {
      const user = await this.user.findUnique({
        where: {
          email
        }
      });

      if (user) {
        throw new RpcException({
          status: 400,
          message: `User already exists`
        })
      };

      const newUser = await this.user.create({
        data: {
          email: email,
          password: bcrypt.hashSync(password, 10),
          name: name
        }
      });

      const { password: __, ...rest } = newUser;

      return {
        user: rest,
        token: await this.signJWT(rest)
      }

    } catch (error: any) {
      throw new RpcException({
        status: 400,
        message: error.message
      })
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto

    try {
      const user = await this.user.findUnique({
        where: {
          email
        }
      });

      if (!user) {
        throw new RpcException({
          status: 400,
          message: `User/Password not valid`
        })
      };

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new RpcException({
          status: 400,
          message: `User/Password not valid`
        })
      }

      const { password: __, ...rest } = user;

      return {
        user: rest,
        token: await this.signJWT(rest)
      }

    } catch (error: any) {
      throw new RpcException({
        status: 400,
        message: error.message
      })
    }
  }

  

}


