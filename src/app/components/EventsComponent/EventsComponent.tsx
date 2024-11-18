/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from 'react';
import'./EventsComponent.scss';
import { useEventEmitter } from '@components/Events/Events';


interface EventsComponentProps {
  children?: React.ReactNode
};

export function EventsComponent({children}: EventsComponentProps) {
  const eventEmitter = useEventEmitter();

  React.useEffect(() => {
    const handleEvent = (message: string) => {
      console.log('Event received:', message);
    };

    eventEmitter.subscribe('exampleEvent', handleEvent);
    return () => {
      eventEmitter.unsubscribe('exampleEvent', handleEvent);
    };
  }, [eventEmitter]);

  const publishEvent = (color: string) => {
    eventEmitter.publish('exampleEvent', color);
  };


    return (
      <>
        <div>
        <button onClick={() => publishEvent('lightblue')}>Change to Light Blue</button>
        <button onClick={() => publishEvent('lightgreen')}>Change to Light Green</button>
        <button onClick={() => publishEvent('lightcoral')}>Change to Light Coral</button>
      </div>
      {children}
      </>
    );
};

export default EventsComponent;