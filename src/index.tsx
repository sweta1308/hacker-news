import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NewsProvider } from 'context/NewsContext'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <NewsProvider>
    <App />
  </NewsProvider>,
)
