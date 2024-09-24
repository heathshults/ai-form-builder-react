'use client'
import * as React from 'react'
import './Toaster.scss'
import { v4 as uuidv4 } from 'uuid';


interface ToasterProps {
  show: boolean
  message: string
}

export const Toaster = ({show, message}: ToasterProps) => {
  const toastRef = React.useRef<HTMLDivElement>(null)
  const messageRef = React.useRef<string>(message)
  const toasts = React.useRef<Record<string,string>>({})


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showToast, setShowToast] = React.useState(true)
  const getTime = () => new Date().toLocaleDateString()
  

  React.useEffect(() => {
    messageRef.current = message
    const toastNow = { id: uuidv4(), type:'error', time: getTime(), message: messageRef.current }
    toasts.current = { ...toasts.current, toastNow }
    if (showToast) {
       setInterval(setShowToast(false), 2000)
    }
      
      
      
  }, [message, showToast])
    return (
      <>
      { show ? <div ref={toastRef} className="toast-container position-fixed bottom-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
          <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app-indicator" viewBox="0 0 16 16">
              <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z"/>
              <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            </svg>
              <strong className="me-auto">Form Builder Bot</strong>
              <small>{getTime()}</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              {messageRef.current}
            </div>
          </div>
        </div>
      :null } 
      </>
    )
}
export default Toaster