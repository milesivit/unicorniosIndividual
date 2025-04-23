import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnicornRoutes from './layouts/unicorns/index'; 
import { UnicornProvider } from './context/UnicornContext';
import Home from './layouts/home/index';

import './App.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/unicornios/*"
            element={
              <UnicornProvider>
                <UnicornRoutes />
              </UnicornProvider>
            }
          />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
