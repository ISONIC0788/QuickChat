
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter} from 'react-router-dom'

import { AutoProvider } from './context/AutoContext.jsx'

createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
    <AutoProvider>
     <App />
    </AutoProvider>

  </BrowserRouter>
)
