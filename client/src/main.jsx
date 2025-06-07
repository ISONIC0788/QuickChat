
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter} from 'react-router-dom'

import { AutoProvider } from './context/AutoContext.jsx'
import { ChatProvider } from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
    <AutoProvider>
      <ChatProvider>
            <App />
      </ChatProvider>
    </AutoProvider>

  </BrowserRouter>
)
