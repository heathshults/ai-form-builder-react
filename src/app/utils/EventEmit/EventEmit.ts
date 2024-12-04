export enum EventType {
  ERROR_MESSAGE = 'errorMessage',
}

/**
 * Event emitter to subscribe, dispatch, and unsubscribe to events.
 */
export default class EventEmit {
  // This is event object to store events.
  events: Record<string, Array<(data?: unknown) => void>> = {};

  // Internal function to get event name from type and suffix
  getEventKey(eventType: EventType, uniqueEventName: string | number) {
    return `${eventType} ${uniqueEventName}`;
  }

  // This will dispatch the event and call the callback for every event.
  publish(event: EventType, uniqueEventName: string | number, data?: unknown) {
    const eventName = this.getEventKey(event, uniqueEventName);
    if (!this.events[eventName]) return;
    this.events[eventName].forEach((callback) => callback(data));
  }

  // This will subscribe the event with a specific callback
  subscribe(event: EventType, uniqueEventName: string | number, callback: (data?: string | number | [] | Record<string, unknown>) => void) {
    const eventName = this.getEventKey(event, uniqueEventName);
    if (!this.events[eventName]) this.events[eventName] = [];
    if (!this.events[eventName].includes(callback)) this.events[eventName].push(callback);
  }

  // This will unsubscribe the event to avoid unnecessary event calls
  unsubscribe(event: EventType, uniqueEventName: string | number) {
    const eventName = this.getEventKey(event, uniqueEventName);
    if (!this.events[eventName]) return;
    delete this.events[eventName];
  }
}
/**
 * dispatch and unsubscribe
 * 
 * eventEmitter.dispatch(EventType.ERROR_MESSAGE, uniqueEventName, data)
 * eventEmitter.unsubscribe(EventType.ERROR_MESSAGE, uniqueEventName)
 */
/** 
 * subscribe
 * 
 * eventEmitter.subscribe(EventType.ERROR_MESSAGE, uniqueEventName, (data) => fetchLatestPostComments(data))
*/
