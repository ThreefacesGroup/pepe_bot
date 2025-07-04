import { Module } from "@nestjs/common";
import { WebhookModule } from "./webhook/webhook.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [WebhookModule, ConfigModule.forRoot({ isGlobal: true})],
})
export class CoreModule {}
