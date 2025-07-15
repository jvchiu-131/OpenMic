// src/dashboard/dashboard.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { DashboardService } from './dashboard.service';
import { User } from '../users/interfaces/user.interface';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getDashboard(@Req() req: Request) {
    const user = req.user;
    if (!user) {
      return { message: 'User not found' };
    }
    const userInterface = user as User;
    return this.dashboardService.getDashboardData(userInterface);
  }
}
