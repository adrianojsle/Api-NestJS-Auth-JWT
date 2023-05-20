import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { InitController } from './init.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [InitController],
  providers: [InitService, PrismaService]
})
export class InitModule {}
