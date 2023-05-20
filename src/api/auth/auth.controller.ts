import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    login(@Request() req) {
        return this.authService.login(req.body);
    }

    @Post('/register')
    register(@Request() req) {
        return this.authService.register(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    getHello(@Request() req) {
        return {
            status: 'success',
            user: req.user,
        };
    }

    @Get()
    start() {
        return {
            status: 'success'
        };
    }
}