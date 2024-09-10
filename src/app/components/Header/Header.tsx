'use client'
import * as React from 'react'
import { SidebarService } from '@services/SidebarService'
import './header.scss'
// type HeaderProps = {}

// export function Header(props: HeaderProps) {
export default function Header() {
  const toggleButton = React.useRef<HTMLButtonElement>(null);
  const sidebarService = SidebarService.getInstance();

  const handleToggleSidebar = () => {
    // alert('handleToggleSidebar <header>');
    toggleButton.current?.blur(); // Remove focus from the button
    sidebarService.toggleSidebar(); // Call the toggleSidebar function
  };


    return (
      <>
        <nav className="navbar hs-toolbar">
          <div className="container-fluid">
            <span>
              <button
              ref={toggleButton}
                className="navbar-toggler mr-3original summers"
                type="button"
                aria-controls="offcanvasExample"
                onClick={handleToggleSidebar}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
              </button>
              <a className="navbar-brand hs-toolbar-title pl-3">Form Builder <span className="hs-subtitle">Powered by: HeathBot</span></a>
            </span>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </>
    )
}