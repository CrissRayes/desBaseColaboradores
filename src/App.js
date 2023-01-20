import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { BaseColaboradores } from './BaseColaboradores';

function App () {
  const [colaboradores, setColaboradores] = useState( BaseColaboradores )
  const [nombre, setNombre] = useState( '' )
  const [correo, setCorreo] = useState( '' )
  const [error, setError] = useState( false )
  const [mensajeError, setMensajeError] = useState( '' )
  const [busqueda, setBusqueda] = useState( '' )

  const handleSubmit = ( e ) => {
    e.preventDefault()
    const nuevoColaborador = {
      id: colaboradores.length + 1,
      nombre,
      correo
    }

    if ( nombre.trim() === '' || correo.trim() === '' ) {
      setError( true )
      setMensajeError( '⛔️ Todos los campos son obligatorios' )
      return
    } else {
      setColaboradores( [...colaboradores, nuevoColaborador] )
      setNombre( '' )
      setCorreo( '' )
    }
  }

  const handleSearch = ( e ) => {
    setBusqueda( e.target.value )
  }

  let resultadoBusqueda = []
  if ( !busqueda ) {
    resultadoBusqueda = colaboradores
  } else {
    resultadoBusqueda = colaboradores.filter( colaborador => {
      return colaborador.nombre.toLowerCase().includes( busqueda.toLowerCase() )
    } )
  }

  return (
    <div className="container">
      <nav className='navbar bg-dark'>
        <div className='container-fluid d-flex align-items-end'>
          <h3 className='text-white'>Buscador de colaboradores</h3>
          <div>
            <input
              className='form-control'
              type='text'
              placeholder='Buscar por nombre'
              aria-label='search'
              value={ busqueda }
              onChange={ handleSearch }
            />
          </div>
        </div>
      </nav>

      <form onSubmit={ handleSubmit }>
        { error && <p className='alert alert-danger mt-3'>{ mensajeError }</p> }
        <div className='form-group mt-3'>
          <label>Nombre</label>
          <input
            type='text'
            placeholder='Nombre'
            className='form-control'
            onChange={ ( e ) => {
              setNombre( e.target.value )
              setError( false )
            } }
            value={ nombre }
          />
        </div>
        <div className='form-group'>
          <label>Correo</label>
          <input
            type='email'
            placeholder='Correo'
            className='form-control'
            onChange={ ( e ) => setCorreo( e.target.value ) }
            value={ correo }
          />
        </div>
        <button className='btn btn-primary mt-2'>Agregar</button>
      </form>
      <hr />
      <h3>Listado de Colaboradores</h3>
      <hr />
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          { resultadoBusqueda.map( colaborador => (
            <tr key={ colaborador.id }>
              <td>{ colaborador.id }</td>
              <td>{ colaborador.nombre }</td>
              <td>{ colaborador.correo }</td>
            </tr>
          ) ) }
        </tbody>
      </table>
    </div >
  );
}

export default App;
