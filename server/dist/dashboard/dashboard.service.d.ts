import { User } from "src/users/interfaces/user.interface";
export declare class DashboardService {
    getDashboardData(user: User): {
        message: string;
        profile: User;
    } | {
        message: string;
        profile?: undefined;
    };
}
