import React, { useEffect, useState } from 'react';
import { useEventEmitter } from '@components/Events/Events';


const ColorChanger: React.FC = () => {
  const eventEmitter = useEventEmitter();
  const [backgroundColor, setBackgroundColor] = useState<string>('white');

  useEffect(() => {
    const handleEvent = (color: string) => {
      setBackgroundColor(color);
    };

    eventEmitter.subscribe('exampleEvent', handleEvent);
    return () => {
      eventEmitter.unsubscribe('exampleEvent', handleEvent);
    };
  }, [eventEmitter]);

  return (
    <div style={{ backgroundColor, width: '100%', height: '100vh' }}>
      Background Color Changer
    </div>
  );
};

export default ColorChanger;