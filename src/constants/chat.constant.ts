export enum SubscribedMessages {
  JOIN_CHAT = 'joinChat',
  LEAVE_CHAT = 'leaveChat',
  IS_TYPING = 'isTyping',
  SEND_MESSAGE = 'sendMessage',
  FIND_ALL_CHATS = 'findAllChats',
  UPDATE_MESSAGE = 'updateMessage',
  REMOVE_MESSAGE = 'removeMessage',
}

export enum ServerEvents {
  USER_JOINED = 'userJoined',
  USER_LEFT = 'userLeft',
  IS_TYPING = 'isTyping',
  MESSAGE_SENT = 'messageSent',
  MESSAGE_UPDATED = 'messageUpdated',
  MESSAGE_REMOVED = 'messageRemoved',
}
