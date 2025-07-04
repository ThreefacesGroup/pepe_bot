import { Controller, Post} from '@nestjs/common';
import { WebhookService } from '../application/webhook.service';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
   handleWebhook() {
      return { success: true}
  }
}
