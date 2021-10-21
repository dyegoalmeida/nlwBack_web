/**
 * Esse arquivo renderiza a partir do reactDOM nossa aplicação dentro da DIV
 * com id=root que fica em nosso index.html
 * Cada componente no react nada mais é que um função que retorna HTML
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

import './styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
