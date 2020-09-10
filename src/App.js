import React, {useState} from 'react';
import shortid from 'shortid'
function App() {
  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  const [edicion, setEdicion] = useState(false)
  const [idEdicion, setIdEdicion] = useState(null)
  const [error, setError] = useState('')

  const agregarTarea = (e) => {

    e.preventDefault()
    if(!tarea.trim()){
      console.log("Elemento vacio")
      setError("Elemento vacio")
      return
    }
    setError(null)
    setTareas([
      ...tareas, {id: shortid.generate(), name: tarea}
    ])
    setTarea('')
  }

  const eliminarTarea = (id) => {
    const nuevaLista = tareas.filter( item => item.id != id )
    setTareas(nuevaLista)
  }

  const editar = (item) => {
    setEdicion(true)
    setTarea(item.name)
    setIdEdicion(item.id)
  }

  const editarTarea = (e) => {
    e.preventDefault()
    if(!tarea.trim()){
      setError("Elemento vacio")
      console.log("Elemento vacio")
      return
    }
    setError(null)
    const arrayModificado = tareas.map( item => item.id === idEdicion ? { idEdicion , name:tarea} : item)
    setTareas(arrayModificado)
    setEdicion(false)
    setIdEdicion('')
    setTarea('')
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? (<li className="list-group-item">No hay tareas</li>) : 
              (
              tareas.map( item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.name}</span>
                  <button className="btn btn-danger btn-sm float-right mx-2" 
                  onClick = { () => eliminarTarea(item.id) } >Eliminar</button>
                  <button className="btn btn-warning btn-sm float-right"
                  onClick = {() => editar(item) } >Editar</button>
                </li> 
              ) ) )
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <form onSubmit={edicion ? editarTarea : agregarTarea}>
            <input className="form-control mb-2" type="text" placeholder="Tarea" onChange={e => setTarea(e.target.value)} value={tarea}/>
          <button className="btn btn-dark btn-block" type="submit">{edicion ? "Editar" : "Agregar" }</button>
          {
            error != null ? <span className="text-danger">{error}</span> : null
          }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;