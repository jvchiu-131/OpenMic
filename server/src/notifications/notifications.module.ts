import { Module } from "@nestjs/common";
import { NotificationGateway } from "src/gateway/notifications.gateway";
import { JwtModule } from "@nestjs/jwt";
import { NotificationsService } from "./notifications.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [NotificationGateway, NotificationsService],
  exports: [NotificationGateway, NotificationsService],
})
export class NotificationsModule {}
