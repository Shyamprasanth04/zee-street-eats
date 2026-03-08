'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-zee-yellow mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-300 mb-4">We're having trouble loading this content. Please try again later.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="btn-primary"
            aria-label="Try again"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
} 