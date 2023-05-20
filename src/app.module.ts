import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { InitModule } from './api/init/init.module';
import { PrismaService } from './api/prisma/prisma.service';

@Module({
  imports: [UsersModule, AuthModule, InitModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
