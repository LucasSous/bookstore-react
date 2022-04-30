import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const UsersContext = createContext();

function UsersContextProvider({ children }) {
  const [show, setShow] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState('');
  const [titleForm, setTitleForm] = useState('');

  const handleClose = () => {
    if (name) {
      setName('');
    }
    if (address) {
      setAddress('');
    }
    if (city) {
      setCity('');
    }
    if (email) {
      setEmail('');
    }
    if (id) {
      setId('');
    }
    setShow(false);
  };

  const handleShow = () => {
    setTitleForm('Novo usuário');
    setShow(true);
  };

  const closeDeleteConfirm = () => {
    if (name) {
      setName('');
    }
    if (address) {
      setAddress('');
    }
    if (city) {
      setCity('');
    }
    if (email) {
      setEmail('');
    }
    if (id) {
      setId('');
    }
    setShowDeleteConfirm(false);
  };

  const nameHandler = (event) => setName(event.target.value);
  const addressHandler = (event) => setAddress(event.target.value);
  const cityHandler = (event) => setCity(event.target.value);
  const emailHandler = (event) => setEmail(event.target.value);

  const handlerEdit = (userId, userName, userAddress, userCity, userEmail) => {
    setName(userName);
    setAddress(userAddress);
    setCity(userCity);
    setEmail(userEmail);
    setId(userId);
    setTitleForm('Editar Usuário');
    setShow(true);
  };

  const handlerDelete = (userId, userName, userAddress, userCity, userEmail) => {
    setName(userName);
    setAddress(userAddress);
    setCity(userCity);
    setEmail(userEmail);
    setId(userId);
    setShowDeleteConfirm(true);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = () => {
    api.get('usuarios').then(({ data }) => {
      setUsers(data);
    });
  };

  const saveUser = (data) => {
    if (id) {
      api
        .put('usuario', {
          id: id,
          nome: name,
          endereco: address,
          cidade: city,
          email: email
        })
        .then((response) => {
          if (response !== null) {
            return handleClose(), getUser(), toast.success('Editado com sucesso!');
          }
        });
    } else {
      api
        .post('usuario', {
          nome: data.nome,
          endereco: data.endereco,
          cidade: data.cidade,
          email: data.email
        })
        .then((response) => {
          if (response !== null) {
            return handleClose(), getUser(), toast.success('Salvo com sucesso!');
          }
        });
    }
  };

  const deleteUser = () => {
    api
      .delete('usuario', {
        data: {
          id: id,
          nome: name,
          endereco: address,
          cidade: city,
          email: email
        }
      })
      .then((response) => {
        if (response !== null) {
          return closeDeleteConfirm(), getUser(), toast.success('Deletado com sucesso!');
        }
      });
  };

  return (
    <UsersContext.Provider
      value={{
        handleShow,
        handleClose,
        show,
        id,
        setId,
        name,
        setName,
        address,
        setAddress,
        city,
        setCity,
        email,
        setEmail,
        nameHandler,
        addressHandler,
        cityHandler,
        emailHandler,
        saveUser,
        users,
        handlerEdit,
        handlerDelete,
        titleForm,
        setTitleForm,
        showDeleteConfirm,
        setShowDeleteConfirm,
        deleteUser,
        closeDeleteConfirm
      }}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;
