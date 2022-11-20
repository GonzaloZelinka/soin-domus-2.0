import React from 'react'
// import logo from './logo.svg'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Claim from './pages/Claim'
import Home from './pages/Home'
import { makeStyles } from 'material-ui-core'
const useStyles = makeStyles({
  mainApp: {
    backgroundColor: 'lightGrey',
  },
})
function App() {
  const classes = useStyles()
  return (
    <>
      <div className={classes.mainApp}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Reclamo" element={<Claim />} />
        </Routes>
      </div>
    </>
  )
}

export default App
