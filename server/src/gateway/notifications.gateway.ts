import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationsService } from '../notifications/notifications.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private connectedUsers = new Map<string, string>(); // userId → socket.id

  constructor(private notificationsService: NotificationsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    console.log('WebSocket Initialized');
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.set(userId, client.id);
      console.log(`User ${userId} connected with socket ID ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userId = [...this.connectedUsers.entries()].find(([_, id]) => id === client.id)?.[0];
    if (userId) {
      this.connectedUsers.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  }

  @SubscribeMessage('sendNotification')
  handleSendNotification(
    @MessageBody() data: { toUserId: string; message: string },
    @ConnectedSocket() client: Socket
  ) {
    const { toUserId, message } = data;
    const targetSocketId = this.connectedUsers.get(toUserId);

    if (targetSocketId) {
      client.to(targetSocketId).emit('receiveNotification', {
        from: client.handshake.query.userId,
        message,
      });
    }

    // Optional: store notification in DB
    this.notificationsService.create({
      toUserId,
      fromUserId: client.handshake.query.userId as string,
      message,
    });
  }
}
