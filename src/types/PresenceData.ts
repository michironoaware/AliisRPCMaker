import { PresenceButton } from './PresenceButton';

export interface PresenceData {
    state?: string | undefined;
    details?: string | undefined;
    startTimestamp?: number | 'start' | undefined;
    endTimestamp?: number | undefined;
    largeImageKey?: string | undefined;
    largeImageText?: string | undefined;
    smallImageKey?: string | undefined;
    smallImageText?: string | undefined;
    instance?: boolean | undefined;
    partyId?: string | undefined;
    partySize?: number | undefined;
    partyMax?: number | undefined;
    matchSecret?: string | undefined;
    spectateSecret?: string | undefined;
    joinSecret?: string | undefined;
    buttons?: Array<[PresenceButton, PresenceButton?]> | undefined;
}