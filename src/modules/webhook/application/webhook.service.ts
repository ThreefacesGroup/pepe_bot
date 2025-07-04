import { Injectable, Logger } from '@nestjs/common';
import { WhatsAppEventDto } from "./webhook.interfaces";
import { ConfigService } from "@nestjs/config";
import { OpenAI } from "openai";
import axios from 'axios';

@Injectable()
export class WebhookService {
    private readonly openai: OpenAI;
    private readonly logger = new Logger(WebhookService.name);
    private readonly instance: string;
    private readonly whatsappApiToken: string;
    private readonly victorPhone: string = '5355715873@c.us'
    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get('OPENAI_API_KEY') ?? '',
        });
        this.instance= this.configService.get('WHATSAPP_API_URL') ?? '';
        this.whatsappApiToken = this.configService.get('WHATSAPP_API_TOKEN') ?? '';
    }

    async handleWebhook(data: WhatsAppEventDto) {
        try {
            // Extract message content and sender information
            const message = data.data.message.body;
            const sender = data.data.message.from;

            this.logger.log(`Received message: "${message}" from ${sender}`);

            if (!message || message.trim() === '') {
                this.logger.warn('Empty message received, skipping processing');
                return;
            }

            // Generate response using OpenAI
            const response = await this.generateAIResponse(message);

            // Send response back to the sender
            await this.sendWhatsAppMessage(sender, response);

            this.logger.log(`Sent response to ${sender}`);
        } catch (error) {
            this.logger.error(`Error processing webhook: ${error.message}`, error.stack);
        }
    }

    private async generateAIResponse(message: string): Promise<string> {
        try {
            const completion = await this.openai.chat.completions.create({
                messages: [
                    { role: "system", content: `Eres Pepe un asistente amable y útil que solo habla de la grandeza de Osmel y buscas apoyar a la causa de subirle el salario.` },
                    { role: "user", content: message }
                ],
                model: "gpt-4o-mini",
                temperature: 0.2,
            });
            return completion.choices[0].message.content || 'Lo siento, no pude generar una respuesta.';
        } catch (error) {
            this.logger.error(`Error generating AI response: ${error.message}`, error.stack);
            return 'Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.';
        }
    }

    private async sendWhatsAppMessage(to: string, message: string): Promise<void> {
        try {
            if (!this.instance|| !this.whatsappApiToken) {
                throw new Error('WhatsApp API configuration is missing');
            }

            await axios.post(
                `https://waapi.app/api/v1/instances/${this.instance}/client/action/send-message`,
                {
                    chatId: to,
                    message: message,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.whatsappApiToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error) {
            this.logger.error(`Error sending WhatsApp message: ${error.message}`, error.stack);
            throw error;
        }
    }
}
