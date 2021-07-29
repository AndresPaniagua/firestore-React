import React, {useState, useEffect} from "react";
import { store } from "./firebaseConfig";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [idUser, setIdUser] = useState("");
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [edicion, setEdicion] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const { docs } = await store.collection('agenda').get();
      const newArray = docs.map(item => ({
        id: item.id,
        ...item.data()
      }));
      setUser(newArray);
    };
    getUsers();
  }, []);

  const setUsers = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Debes rellenar todos los campos');
      setSuccess(null);
      return;
    }

    try {  
      const userData = {
        Name: name,
        Phone: phone
      };

      const data = await store.collection('agenda').add(userData);
      const { docs } = await store.collection('agenda').get();
      const newArray = docs.map(item => ({
        id: item.id,
        ...item.data()
      }));
      setUser(newArray);
      setSuccess('El usuario fue ingresado exitosamente');
    } catch (error) {
      console.log(error);
    }
      
    setName('');
    setPhone('');
    setError(null);
  }

  const DeleteUser = async (id) => {
    try {
      await store.collection('agenda').doc(id).delete();
      const { docs } = await store.collection('agenda').get();
      const newArray = docs.map(item => ({
        id: item.id,
        ...item.data()
      }));
      setUser(newArray);
    } catch (error) {
      console.log(error);
    }
  }

  const SetEditUser = async (id) => {
    try {
      const data = (await store.collection('agenda').doc(id).get());
      const {Name, Phone} = data.data();
      setName(Name);
      setPhone(Phone);
      setIdUser(id);
      setEdicion(true);
    } catch (error) {
      console.log(error);
    }
  }

  const EditUser = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Debes rellenar todos los campos');
      setSuccess(null);
      return;
    }

    try {  
      const userData = {
        Name: name,
        Phone: phone
      };

      const data = await store.collection('agenda').doc(idUser).set(userData);
      const { docs } = await store.collection('agenda').get();
      const newArray = docs.map(item => ({
        id: item.id,
        ...item.data()
      }));
      setUser(newArray);
      setSuccess('El usuario fue editado exitosamente');
    } catch (error) {
      console.log(error);
    }
      
    setName('');
    setPhone('');
    setIdUser('');
    setError(null);
    setEdicion(null);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Formulario usuraio</h2>
          <form onSubmit={edicion ? (e) => {EditUser(e)} : (e) => {setUsers(e)}} className="form-group">
            <input
              onChange={(e) => {setName(e.target.value)}}
              className="form-control"
              placeholder="Introduce el nombre"
              type="text"
              value={name}/>

            <input
              onChange={(e) => {setPhone(e.target.value)}}
              className="form-control mt-2"
              placeholder="Introduce el numero de telefono"
              type="number"
              value={phone}/>

            <div className="d-grid gap-2">
              {
                edicion ?
                (
                  <input type="submit" value="Editar" className="btn btn-dark mt-3"/>
                )
                :
                (
                  <input type="submit" value="Registrar" className="btn btn-dark mt-3"/>
                )
              }
            </div>
          </form>
          {
            error != null ?
            (
              <div className="alert alert-danger mt-3">
                {error}
              </div>
              )
              :
              (
                <span></span>
              )
          }

          {
            success != null ?
            (
              <div className="alert alert-success mt-3">
                {success}
              </div>
              )
              :
              (
                <span></span>
              )
          }
        </div>

        <div className="col">
          <h2>Lista de tu agenda</h2>
          <ul className="list-group">
            {
              user.length !== 0 ?
              (
                user.map( item => (
                  <li className="list-group-item" key={item.id}>
                    {item.Name} --- {item.Phone}
                    <button onClick={(e) => {DeleteUser(item.id)}} className="btn btn-danger me-3 float-end">:(</button>
                    <button onClick={(e) => {SetEditUser(item.id)}} className="btn btn-warning me-3 float-end">-_-</button>
                  </li>
                ))
              )
              :
              (
                <span>
                  Lo siento, no se han encontrado usuarios
                </span>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
