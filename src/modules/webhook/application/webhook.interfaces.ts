/**
 * Interface for the webhook request body
 */
export interface WebhookRequestBody {
  instanceId: string;
  event: string;
  data: WebhookEventData;
}

/**
 * Interface for the webhook event data
 */
export interface WebhookEventData {
  message?: MessageData;
  [key: string]: any;
}

/**
 * Interface for message data
 */
export interface MessageData {
  type: string;
  from: string;
  timestamp: number;
  body: string;
  [key: string]: any;
}