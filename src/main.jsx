import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { prefersReducedMotion } from './lib/gsap'

if (!prefersReducedMotion()) document.documentElement.classList.add('js')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
