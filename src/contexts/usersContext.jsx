import { createContext, useState } from 'react';
import api from '../services/api';

export const UsersContext = createContext();

function UsersContextProvider({ children }) {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nameHandler = (event) => setUserName(event.target.value);
  const addressHandler = (event) => setUserAddress(event.target.value);
  const cityHandler = (event) => setUserCity(event.target.value);
  const emailHandler = (event) => setUserEmail(event.target.value);

  const saveUser = () => {
    api.post('usuario', {
      nome: userName,
      endereco: userAddress,
      cidade: userCity,
      email: userEmail
    });

    setShow(false);
  };

  return (
    <UsersContext.Provider
      value={{
        handleShow,
        handleClose,
        show,
        userName,
        setUserName,
        userAddress,
        setUserAddress,
        userCity,
        setUserCity,
        userEmail,
        setUserEmail,
        nameHandler,
        addressHandler,
        addressHandler,
        cityHandler,
        emailHandler,
        saveUser
      }}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;
