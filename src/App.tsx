import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorUI from './components/layouts/global/ErrorUI';

import GameState from './context/game/gameState';
import loader from './components/helpers/loader';


// componets and pages
const Homepage = React.lazy(() => import('./components/pages/Home'));

const App = () => {

  const errorHandler = (err: any, info: any) => {
    console.log(err, 'logged error');
    console.log(info, 'logged error info');
  }

  return (

    <Router>

      <GameState>

          <Suspense fallback={loader.MainLoader()}>

            <ErrorBoundary FallbackComponent={ErrorUI} onReset={() => { window.location.reload() }} onError={errorHandler}>

                <Routes>

                  <Route path='/' element={<Homepage />} />
                  <Route path='*' element={<Homepage />} />

                  
                  
                </Routes>

            </ErrorBoundary>

          </Suspense>

      </GameState>

    </Router>

  )

}

export default App;