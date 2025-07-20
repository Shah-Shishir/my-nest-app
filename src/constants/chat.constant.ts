export enum Config {
  PORT = 3001,
}

export enum SubscribedMessages {
  JOIN_CHAT = 'joinChat',
  LEAVE_CHAT = 'leaveChat',
  IS_TYPING = 'isTyping',
  CREATE_CHAT = 'createChat',
  FIND_ALL_CHATS = 'findAllChats',
  UPDATE_CHAT = 'updateChat',
  REMOVE_CHAT = 'removeChat',
}

export enum ServerEvents {
  USER_JOINED = 'userJoined',
  USER_LEFT = 'userLeft',
  IS_TYPING = 'isTyping',
}

// export enum ClientEvent {
//   MESSAGE_EVENT = 'message',
//   USER_JOINED_EVENT = 'USER_JOINED',
//   USER_LEFT_EVENT = 'USER_LEFT',
// }
