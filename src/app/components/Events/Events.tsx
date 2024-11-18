/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import * as React from 'react';

interface EventsProps {
  children: React.ReactNode;
}

export default class EventEmitter {
  private events: { [key: string]: Array<(...args: any[]) => void> } = {};

  subscribe(event: string, listener: (...args: any[]) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  unsubscribe(event: string, listener: (...args: any[]) => void) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  publish(event: string, ...args: any[]) {
    if (!this.events[event]) return;

    this.events[event].forEach(listener => listener(...args));
  }
}

const EventContext = React.createContext<EventEmitter | null>(null);

export const Events: React.FC<EventsProps> = ({ children }) => {
  const eventEmitter = React.useMemo(() => new EventEmitter(), []);

  return (
    <EventContext.Provider value={eventEmitter}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventEmitter = () => {
  const context = React.useContext(EventContext);
  if (!context) {
    throw new Error('useEventEmitter must be used within an Events component');
  }
  return context;
};