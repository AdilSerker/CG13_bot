import { chatCommands } from './ChatCommands';
import { baseCommands } from './BaseCommands';
import { subscriptionCommands } from './SubscriptionCommands';

export const commands = [
    ...baseCommands,
    ...chatCommands,
    ...subscriptionCommands,
];
