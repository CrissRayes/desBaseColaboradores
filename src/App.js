import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { BaseColaboradores } from './BaseColaboradores';

function App () {
  const [colaboradores, setColaboradores] = useState( BaseColaboradores )
  const [nombre, setNombre] = useState( '' )
  const [correo, setCorreo] = useState( '' )

  const enviarFormulario = ( e ) => {
    e.preventDefault()
    const nuevoColaborador = {
      id: colaboradores.length + 1,
      nombre,
      correo
    }
    setColaboradores( [...colaboradores, nuevoColaborador] )
    setNombre( '' )
    setCorreo( '' )
  }



  return (
    <div className="container">
      <form onSubmit={ enviarFormulario }>
        <div className='form-group mt-3'>
          <label>Nombre</label>
          <input
            type='text'
            className='form-control'
            onChange={ ( e ) => setNombre( e.target.value ) }
            value={ nombre }
          />
        </div>
        <div className='form-group'>
          <label>Correo</label>
          <input
            type='email'
            className='form-control'
            onChange={ ( e ) => setCorreo( e.target.value ) }
            value={ correo }
          />
        </div>
        <button className='btn btn-primary mt-2'>Agregar</button>
      </form>
      <hr />
      <ul>
        { colaboradores.map( colaborador => (
          <li key={ colaborador.id }>
            <p>{ colaborador.nombre } - { colaborador.correo }</p>
          </li>
        ) ) }
      </ul>
    </div>
  );
}

export default App;
