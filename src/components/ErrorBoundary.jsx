import { Component } from 'react'

// A runtime error in a section effect would otherwise leave the reveal states hidden.
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Portfolio failed to render', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="error-screen" role="alert">
        <p className="error-screen__eyebrow mono">Something went wrong</p>
        <h1 className="error-screen__title">This page failed to load.</h1>
        <p className="error-screen__body">
          Try reloading. If it keeps happening, you can reach me directly at{' '}
          <a href="mailto:rayyan16522@gmail.com">rayyan16522@gmail.com</a>.
        </p>
        <button className="btn btn--primary" type="button" onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    )
  }
}
