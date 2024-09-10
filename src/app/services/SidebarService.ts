/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from "react";
import { BehaviorSubject } from "rxjs";

export class SidebarService {
  private static instance: SidebarService;
  public sidebarToggleEvent: BehaviorSubject<string>;

  private constructor() {
    this.sidebarToggleEvent = new BehaviorSubject<string>('hide-sidebar'); // Initial value is 'hide-sidebar'
  }

  public static getInstance(): SidebarService {
    if (!SidebarService.instance) {
      SidebarService.instance = new SidebarService();
    }
    return SidebarService.instance;
  }

   public toggleSidebar() {
    // alert('toggleSidebar <service>', this.sidebarToggleEvent.value);
    const currentState = this.sidebarToggleEvent.value;
    const newState = currentState === 'hide-sidebar' ? 'show-sidebar' : 'hide-sidebar';
    this.sidebarToggleEvent.next(newState);
  }

  
}


export default SidebarService;