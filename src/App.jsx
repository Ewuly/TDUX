import { useState } from 'react'
import { ethers } from 'ethers'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page1 from './pages/chain-info'
import Error from './pages/error'
import FakeBayc from './pages/fakeBayc';
import TokenPage from './pages/TokenPage';


import './App.css'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<>
            <div>
              <Link to="/chain-info">Chain Info</Link>
            </div>
            <div>
              <Link to="/fakeBayc">FakeBayc</Link>
            </div>
          </>} />
          <Route exact path="/chain-info" element={<Page1 />} />
          <Route exact path="/error" element={<Error />} />
          <Route exact path="/fakeBayc" element={<FakeBayc />} />
          <Route exact path="/fakeBayc/:tokenId" element={<TokenPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
