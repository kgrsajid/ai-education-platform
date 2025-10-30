import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { MainLayout } from './components/main-layout'
import AppRoutes from './routes'

function App() {

  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes/>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
