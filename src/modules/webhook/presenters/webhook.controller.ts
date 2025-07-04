import {Body, Controller, Logger, Post} from '@nestjs/common';
import { WebhookService } from '../application/webhook.service';

@Controller('webhooks')
export class WebhookController {
  private readonly _logger = new Logger(WebhookController.name)
  constructor(private readonly webhookService: WebhookService) {}

  @Post(':id')
   handleWebhook(@Body() body: any) {
    this._logger.log(body)
      return { success: true}
  }
}
