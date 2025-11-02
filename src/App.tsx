import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Upload from './components/upload'

function App() {


  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Upload />
    </ThemeProvider>
  )
}

export default App
