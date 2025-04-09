import { useState, Fragment } from 'react'
import UnicornsContainer from './unicorns'
import './App.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'; // Puedes elegir otro tema si quieres
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function App() {

  return (
    <Fragment>
      <UnicornsContainer/>
    </Fragment>
  )
}

export default App
