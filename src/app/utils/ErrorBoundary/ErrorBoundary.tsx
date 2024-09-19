'use client'
// eslint-disable @typescript-eslint/no-extra-semi
import React, { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch = (error, errorInfo) => catchFunc(error, errorInfo, this)

  render() {
    if (this.state.errorInfo) {
      return handleError(this)
    }
    // Normally, just render children
    // eslint-disable-next-line react/prop-types
    return this.props.children
  }
}

export const withErrorBoundary = (WrappedComponent) => (
  class extends Component {
    displayName = 'withErrorBoundary'
    constructor(props) {
      super(props)
      this.state = { error: null, errorInfo: null }
    }

    componentDidCatch = (error, errorInfo) => catchFunc(error, errorInfo, this)

    render() {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      if (this.state.errorInfo) {
        return handleError(this)
      }
      // Normally, just render children
      return <WrappedComponent {...this.props} />
    }
  }
)

const catchFunc = (error, errorInfo, ctx) => {
  // catch errors in any components below and re-render with error message
  ctx.setState({
    error: error,
    errorInfo: errorInfo
  })
  // log error messages, etc.
}

const handleError = (ctx) => (
  // Error path
  <div style={ctx.props.style || styles.error}>
    <h2>Something went wrong.</h2>
    <details style={{ whiteSpace: 'pre-wrap' }}>
      {ctx.state.error && ctx.state.error.toString()}
      <br />
      {ctx.state.errorInfo.componentStack}
    </details>
  </div>
)

const styles = {
  error: {
    backgroundColor: '#f98e7e',
    borderTop: '1px solid #777',
    borderBottom: '1px solid #777',
    padding: '12px',
  }
}
export default ErrorBoundary

