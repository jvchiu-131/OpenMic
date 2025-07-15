import { Request } from 'express';
import { DashboardService } from './dashboard.service';
import { User } from '../users/interfaces/user.interface';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(req: Request): {
        message: string;
        profile: User;
    } | {
        message: string;
    };
}
