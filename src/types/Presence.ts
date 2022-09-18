import { PresenceData } from './PresenceData';

export interface Presence {
    data: PresenceData;
    image?: Buffer | undefined;
}