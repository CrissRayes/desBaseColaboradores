import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { BaseColaboradores } from './BaseColaboradores';

function App () {
  const [colaboradores, setColaboradores] = useState( BaseColaboradores )

  return (
    <div className="App">
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
