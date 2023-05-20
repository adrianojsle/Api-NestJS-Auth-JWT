import { Controller, Get } from '@nestjs/common';
import { InitService } from './init.service';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) { }

  @Get()
  init() {
    return this.initService.init();
  }
}
