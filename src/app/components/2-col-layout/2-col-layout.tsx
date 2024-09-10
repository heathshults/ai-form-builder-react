/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from 'react';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import SidebarService from '@services/SidebarService';
import './2-col-layout.scss';

export interface TwoColumnLayoutProps {
  children?: React.ReactNode;
}

function TwoColumnLayout({ children }: TwoColumnLayoutProps) {
  const gridSidebar = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const sidebarService = SidebarService.getInstance();
    const subscription = sidebarService.sidebarToggleEvent.subscribe((state) => {
      // alert('sidebarToggleEvent <layout>');
      if (gridSidebar.current) {
        if (state === 'hide-sidebar') {
          gridSidebar.current.classList.add('hide-sidebar');
        } else {
          gridSidebar.current.classList.remove('hide-sidebar');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);



  return (<>

    <div id='root' className='container-fluid m-0 p-0'>
      <div className='hs-wrap'>
        <div className='grid-header'> <Header/> </div>

        <div className='grid-body'>

          <div ref={gridSidebar} className='hs-body-container hide-sidebar'>

            <div className='grid-sidebar'><Sidebar /> </div>
            <div className='grid-content'>


              {children}
            </div>
          </div>
        </div>
        <div className='grid-footer hs-toolbar'></div>

      </div>
    </div>
  </>);
};

export default TwoColumnLayout;
