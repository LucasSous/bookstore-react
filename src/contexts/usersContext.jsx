import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import FormModal from '../Pages/UsersPage/FormModal/FormModal';

export const UsersContext = createContext();

function UsersContextProvider({ children }) {
  const [show, setShow] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [id, setId] = useState('');
  const [usersInitialValues, setUsersInitialValues] = useState('');
  const [users, setUsers] = useState('');
  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [titleForm, setTitleForm] = useState('');
  const [userDefautFormValues, setUserDefaultFormValues] = useState({});
  const [userDeleteValues, setUserDeletValues] = useState({});
  const [search, setSearch] = useState('');

  const pages = Math.ceil(users.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = users.slice(startIndex, endIndex);

  const handleClose = () => {
    setUserDefaultFormValues({});
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
    if (id) {
      setId('');
    }
    setShowDeleteConfirm(false);
  };

  const handlerEdit = (userId, userName, userAddress, userCity, userEmail) => {
    const user = {
      nome: userName,
      endereco: userAddress,
      cidade: userCity,
      email: userEmail
    };
    setUserDefaultFormValues(user);
    setId(userId);
    setTitleForm('Editar Usuário');
    setShow(true);
  };

  const handlerDelete = (userId, userName, userAddress, userCity, userEmail) => {
    const deleteValues = {
      id: userId,
      nome: userName,
      endereco: userAddress,
      cidade: userCity,
      email: userEmail
    };
    setUserDeletValues(deleteValues);
    setShowDeleteConfirm(true);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = () => {
    api.get('usuarios').then(({ data }) => {
      setUsers(data);
      setUsersInitialValues(data);
    });
  };

  const handleSearch = ({ target }) => {
    setSearch(target.value);

    if (!target.value) {
      setUsers(usersInitialValues);
      return;
    }

    const filterUser = users.filter(
      (user) =>
        user.nome.toLowerCase().includes(search.toLowerCase()) ||
        user.endereco.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    setUsers(filterUser);
  };

  const saveUser = (data) => {
    if (id) {
      api
        .put('usuario', {
          id: id,
          nome: data.nome,
          endereco: data.endereco,
          cidade: data.cidade,
          email: data.email
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
        data: userDeleteValues
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
        saveUser,
        users,
        handlerEdit,
        handlerDelete,
        titleForm,
        setTitleForm,
        showDeleteConfirm,
        setShowDeleteConfirm,
        deleteUser,
        closeDeleteConfirm,
        userDefautFormValues,
        pages,
        currentItens,
        currentPage,
        setCurrentPage,
        itensPerPage,
        setItensPerPage,
        handleSearch
      }}>
      {children}
      {show && <FormModal />}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;
