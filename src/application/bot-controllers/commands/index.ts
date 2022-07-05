import { privilegeCommands } from './PrivilegeCommands';
import { chatCommands } from './ChatCommands';
import { baseCommands } from './BaseCommands';
import { subscriptionCommands } from './SubscriptionCommands';

export const commands = [
    ...baseCommands,
    ...chatCommands,
    ...subscriptionCommands,
    ...privilegeCommands
];
