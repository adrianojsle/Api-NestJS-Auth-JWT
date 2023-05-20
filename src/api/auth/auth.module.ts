import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({ secret: process.env.SECRET, signOptions: { expiresIn: '1d' } })],
  providers: [AuthService, JwtStrategy, UsersService, PrismaService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }