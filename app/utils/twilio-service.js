import { Client } from 'twilio-chat';
export class TwilioService {
  static serviceInstance;
  static chatClient;

  static getInstance() {
    if (!TwilioService.serviceInstance) {
      TwilioService.serviceInstance = new TwilioService();
    }
    return TwilioService.serviceInstance;
  }

  async getChatClient(twilioToken) {
    if (!TwilioService.chatClient && twilioToken) {
      return Client.create(twilioToken).then((client) => {
        TwilioService.chatClient = client;
        return TwilioService.chatClient;
      });
    }
    return Promise.resolve().then(() => TwilioService.chatClient);
  }

  // manage our token expiration
  addTokenListener() {
    if (!TwilioService.chatClient) {
      throw new Error('Twilio client is null or undefined');
    }
    TwilioService.chatClient.on('tokenAboutToExpire', () => {
      TwilioService.chatClient.updateToken;
    });

    TwilioService.chatClient.on('tokenExpired', () => {
      TwilioService.chatClient.updateToken;
    });
    return TwilioService.chatClient;
  }

  // gracefully shutting down library instance.
  clientShutdown() {
    TwilioService.chatClient?.shutdown();
    TwilioService.chatClient = null;
    TwilioService.serviceInstance = null;
  }

  parseChannels(channels) {
    return channels.map(this.parseChannel);
  }

  parseChannel(channel) {
    return {
      id: channel.sid,
      name: channel.friendlyName,
      createdAt: channel.dateCreated,
      updatedAt: channel.dateUpdated,
      lastMessageTime:
        channel.lastMessage?.dateCreated ??
        channel.dateUpdated ??
        channel.dateCreated,
      lastMessage: channel.lastRecentMessage,
    };
  }
  parseMessages(messages) {
    return messages.map(this.parseMessage).reverse();
  }

  parseMessage(message) {
    return {
      _id: message.sid,
      text: message.body,
      createdAt: message.dateCreated,
      user: {
        _id: message.author,
        name: message.author,
      },
      received: true,
    };
  }
}
