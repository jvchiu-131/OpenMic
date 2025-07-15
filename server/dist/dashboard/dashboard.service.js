"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
class DashboardService {
    getDashboardData(user) {
        if (user.role === 'musician') {
            return {
                message: 'Welcome to the musician dashboard',
                profile: user,
            };
        }
        if (user.role === 'client') {
            return {
                message: 'Welcome to the client dashboard',
                profile: user,
            };
        }
        return {
            message: 'Unknown role',
        };
    }
}
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map