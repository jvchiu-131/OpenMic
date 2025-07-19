import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  create(data: { toUserId: string; fromUserId: string; message: string }) {
    // Save to database if you want
    console.log('Saving notification:', data);
  }
}
