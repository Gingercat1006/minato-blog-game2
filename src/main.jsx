import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
// GameProvider は {} をつけてインポート（名前付きインポート）
import { GameProvider } from './hooks/useGameLogic'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/*Routerの中にGameProviderを入れ、その中にAppを入れる*/}
      <GameProvider>
        <App />
      </GameProvider>
    </BrowserRouter>
  </React.StrictMode>,
)