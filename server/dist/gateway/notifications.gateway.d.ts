import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationsService } from '../notifications/notifications.service';
export declare class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private notificationsService;
    private connectedUsers;
    constructor(notificationsService: NotificationsService);
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSendNotification(data: {
        toUserId: string;
        message: string;
    }, client: Socket): void;
}
