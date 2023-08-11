import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
//import Questionnaire from './Questionnaire';
import Treatments from './Treatments';
import FallbackLoading from './FallbackLoading';
const Questionnaire = React.lazy(() => import('./Questionnaire'));

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<FallbackLoading />}>
                <Questionnaire/>
              </Suspense>
            }/>
            <Route path="/treatments" element={<Treatments/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;