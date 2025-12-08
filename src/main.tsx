import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// PrimeReact стили
import 'primereact/resources/themes/lara-light-blue/theme.css';  // или другой стиль
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Твой Tailwind
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
