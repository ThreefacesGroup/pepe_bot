export class WhatsAppEventDto {
  event: string;
  instanceId: string;
  data: {
    message: {
      _data: {
        id: {
          fromMe: boolean;
          remote: string;
          id: string;
          _serialized: string;
        };
        viewed: boolean;
        body: string;
        type: string;
        t: number; // timestamp
        notifyName?: string;
        from: string;
        to: string;
        ack: number;
        isNewMsg: boolean;
        isForwarded: boolean;
        hasReaction: boolean;
        mentionedJidList: string[];
        groupMentions: string[];
        links: string[];
      };
      id: {
        fromMe: boolean;
        remote: string;
        id: string;
        _serialized: string;
      };
      body: string;
      type: string;
      timestamp: number;
      from: string;
      to: string;
      deviceType: string;
      isForwarded: boolean;
      hasMedia: boolean;
      isStarred: boolean;
      hasQuotedMsg: boolean;
      mentionedIds: string[];
      groupMentions: string[];
      links: string[];
    };
    media: any;
  };
}
