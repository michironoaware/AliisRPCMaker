import { Presence } from 'discord-rpc';
import { PresenceData } from './types';

export function processPresenceData(activity: PresenceData): Presence {
	if(activity.startTimestamp === 'start') activity.startTimestamp = Date.now();

	return activity as Presence;
}