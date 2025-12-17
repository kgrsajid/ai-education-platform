import './App.css'
import AppRoutes from './app/router/routes'
import { BaseProvider } from './providers'

function App() {

  return (
    <BaseProvider>
      <AppRoutes/>
    </BaseProvider>
  )
}

export default App
