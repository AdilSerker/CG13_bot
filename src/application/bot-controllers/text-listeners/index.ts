import { privateChatListeners } from './PrivateChatListeners';
import { chatListeners } from './GroupChatListeners';

export const textListeners: any = [
    ...chatListeners,
    ...privateChatListeners,
];
