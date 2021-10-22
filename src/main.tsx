/**
 * Esse arquivo renderiza a partir do reactDOM a nossa aplicação dentro da DIV
 * com id=root localizado em index.html.
 * Cada componente no react nada mais é que um função que retorna HTML
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { AuthProvider } from './contexts/auth'

import './styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
