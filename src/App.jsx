import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UnicornsContainer from './layouts/unicorns'
import { UnicornProvider } from './context/UnicornContext'
import './App.css'
import 'primereact/resources/themes/lara-dark-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

// Si tienes más vistas, puedes importarlas aquí
// import AnotherPage from './pages/AnotherPage'

function App() {
  return (
    <UnicornProvider>
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<UnicornsContainer />} />
          </Routes>
        </Fragment>
      </Router>
    </UnicornProvider>
  )
}

export default App
