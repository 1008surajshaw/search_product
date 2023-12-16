import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './redux/Store.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
        <Toaster/>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
  
)
