import React, { useState } from 'react'
import { crearNuevoInquilino } from '../../helpers/communications';

const Home = () => {
  const [ isDisabled, setIsDisabled ] = useState(false)
  const handleNewInquilino = () => {
    setIsDisabled(true);
    crearNuevoInquilino({
      apellido: 'Probando',
      nombre: 'Probando',
      email: 'testing',
      telefono: '12345678',
    }).then((response) => {
      console.log('response', response);
    }).catch(() => {})
    setIsDisabled(false);
  }
  return (
    <div>
      <h1>REACT ROUTER</h1>
      <img src="https://giffiles.alphacoders.com/209/209533.gif" alt="nyan cat" />
      <div>
        <button onClick={handleNewInquilino} disabled={isDisabled}>Crear nuevo inquilino</button>
      </div>
    </div>
  )
}

export default Home
