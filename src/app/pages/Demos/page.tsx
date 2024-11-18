'use client'
import * as React from 'react';
import './Demos.scss';
import EventEmitter, { EventType } from '@app/utils/EventEmit';

interface DemosProps {
  children: React.ReactNode
};

export const Demos = ({ children }: DemosProps) => {
  const eventEmitter = React.useMemo(() => new EventEmitter(), []);
  const box1 = React.useRef<HTMLDivElement>(null);
  const [ bgColor, setBgColor ] = React.useState<string>('bg-white');

  React.useEffect(() => {
    const handleEvent = (color: string) => {
      setBgColor(color);
    };

    eventEmitter.subscribe(EventType.COLOR_CHANGE, 'exampleEvent', (data) => handleEvent(data));
    return () => {
      eventEmitter.unsubscribe(EventType.COLOR_CHANGE, 'exampleEvent');
    };
  }, [eventEmitter]);

  const handleColors = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const color = form?.elements['color'].value;
    console.log('color', color);
    eventEmitter.publish(EventType.COLOR_CHANGE, 'exampleEvent', color);
    // setBgColor(color);
  };

  return (
    <>
      <div className="Demos container">
        <div ref={box1} className={`box1 ${bgColor}`}></div>
        <form className='row' onSubmit={handleColors}>
          <div className="input-group col-md-6">
            <div className="input-group-text">
              <input className="form-check-input m-2" type="radio" id="white" value="bg-white" name="color" aria-label="Radio button for following text input"/>White
              <input className="form-check-input m-2" type="radio" id="blue" name="color" value="bg-blue" />Blue
              <input className="form-check-input m-2" type="radio" id="red" name="color" value="bg-red" />Red
              <input className="form-check-input m-2" type="radio" id="green" name="color" value="bg-green" />Green
            </div>
          </div>
          <button className="btn btn-primary inline-block" style={{width: '150px', whiteSpace: 'nowrap'}}>Change Color</button>
        </form>
      </div>
      {children}
    </>
  );
};

export default Demos;