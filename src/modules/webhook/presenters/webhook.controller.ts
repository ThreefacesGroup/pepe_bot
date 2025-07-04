import {Body, Controller, Logger, Post} from '@nestjs/common';
import { WebhookService } from '../application/webhook.service';
import {WhatsAppEventDto} from "../application/webhook.interfaces";

@Controller('webhooks')
export class WebhookController {
  private readonly _logger = new Logger(WebhookController.name)
  constructor(private readonly webhookService: WebhookService) {}

  @Post(':id')
  async handleWebhook(@Body() body: WhatsAppEventDto) {
      if(body.event === 'message') {
           await this.webhookService.handleWebhook(body)
       }
  }
}
