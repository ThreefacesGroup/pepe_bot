import { Module } from '@nestjs/common';
import { WebhookController } from './presenters/webhook.controller';
import { WebhookService } from './application/webhook.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
  exports: [WebhookService],
})
export class WebhookModule {}