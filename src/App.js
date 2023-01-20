import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { BaseColaboradores } from './BaseColaboradores';
import userAvatar from './img/user.png'

function App () {
  const [colaboradores, setColaboradores] = useState( BaseColaboradores )
  const [nombre, setNombre] = useState( '' )
  const [correo, setCorreo] = useState( '' )
  const [error, setError] = useState( false )
  const [mensajeError, setMensajeError] = useState( '' )
  const [busqueda, setBusqueda] = useState( '' )

  const handleChange = ( e ) => {
    if ( e.target.name === 'nombre' ) {
      setNombre( e.target.value )
      setError( false )
    } else if ( e.target.name === 'correo' ) {
      setCorreo( e.target.value )
      setError( false )
    }
  }

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
    <div className="container" style={ { maxWidth: "800px" } }>
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
            name='nombre'
            type='text'
            placeholder='Nombre'
            className='form-control'
            onChange={ handleChange }
            value={ nombre }
          />
        </div>
        <div className='form-group'>
          <label>Correo</label>
          <input
            name='correo'
            type='email'
            placeholder='Correo'
            className='form-control'
            onChange={ handleChange }
            value={ correo }
          />
        </div>
        <button className='btn btn-primary mt-2'>Agregar</button>
      </form>
      <hr />
      <h3>Listado de Colaboradores</h3>
      <hr />
      { resultadoBusqueda.map( colaborador => (
        <div className="card mb-3" key={ colaborador.id }>
          <div className="row no-gutters">
            <div className="col-md-3 d-flex align-items-center justify-content-center">
              <img
                className='card-img rounded-circle border border-primary'
                src={ userAvatar }
                alt={ colaborador.nombre }
                style={ { maxWidth: "100px" } }
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <h5 className="card-title">{ colaborador.nombre }</h5>
                <p className="card-text">{ colaborador.correo }</p>
                <p className="card-text"><small className="text-muted">id: { colaborador.id }</small></p>
              </div>
            </div>
          </div>
        </div>
      ) ) }

    </div >
  );
}

export default App;
