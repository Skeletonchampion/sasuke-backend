import eventEmitter from "./getEventEmiter";

export function emitEvent(eventLog: EventLog) {
    eventEmitter.emit('message', eventLog);
}