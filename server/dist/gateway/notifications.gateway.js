"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const notifications_service_1 = require("../notifications/notifications.service");
let NotificationGateway = class NotificationGateway {
    notificationsService;
    connectedUsers = new Map();
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    afterInit(server) {
        console.log('WebSocket Initialized');
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (userId) {
            this.connectedUsers.set(userId, client.id);
            console.log(`User ${userId} connected with socket ID ${client.id}`);
        }
    }
    handleDisconnect(client) {
        const userId = [...this.connectedUsers.entries()].find(([_, id]) => id === client.id)?.[0];
        if (userId) {
            this.connectedUsers.delete(userId);
            console.log(`User ${userId} disconnected`);
        }
    }
    handleSendNotification(data, client) {
        const { toUserId, message } = data;
        const targetSocketId = this.connectedUsers.get(toUserId);
        if (targetSocketId) {
            client.to(targetSocketId).emit('receiveNotification', {
                from: client.handshake.query.userId,
                message,
            });
        }
        this.notificationsService.create({
            toUserId,
            fromUserId: client.handshake.query.userId,
            message,
        });
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('sendNotification'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handleSendNotification", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationGateway);
//# sourceMappingURL=notifications.gateway.js.map