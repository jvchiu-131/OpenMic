import { User } from "src/users/interfaces/user.interface";

export class DashboardService {
  getDashboardData(user: User) {
    if (user.role === 'musician') {
      return {
        message: 'Welcome to the musician dashboard',
        profile: user,
        // You can add more data like projects, gigs, etc.
      };
    }

    if (user.role === 'client') {
      return {
        message: 'Welcome to the client dashboard',
        profile: user,
        // Client-related data
      };
    }

    return {
      message: 'Unknown role',
    };
  }
}
