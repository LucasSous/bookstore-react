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
  const [loadingTitle, setLoadingTitle] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [isAscending, setIsAscending] = useState(false);
  const [isActiveId, setIsActiveId] = useState(false);
  const [isActiveName, setIsActiveName] = useState(false);
  const [isActiveAddress, setIsActiveAddress] = useState(false);
  const [isActiveCity, setIsActiveCity] = useState(false);
  const [isActiveEmail, setIsActiveEmail] = useState(false);

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
      const ordination = data.sort((a, b) => {
        return a.id - b.id;
      });
      setUsers(ordination);
      setUsersInitialValues(ordination);
    });
  };

  const handleSearch = ({ target }) => {
    if (!target.value) {
      setUsers(usersInitialValues);
      return;
    }

    const search = target.value;
    setTargetValue(target.value);

    const filterUser = usersInitialValues.filter(
      (user) =>
        user.nome.toLowerCase().includes(search.toLowerCase()) ||
        user.endereco.toLowerCase().includes(search.toLowerCase()) ||
        user.cidade.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toString().includes(search)
    );

    setUsers(filterUser);
  };

  useEffect(() => {
    loading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const loading = () => {
    if (targetValue && !(users.length > 0)) {
      setLoadingTitle('Nenhum usuário encontrado');
    } else {
      setLoadingTitle('Carregando dados');
    }
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
            handleClose();
            getUser();
            toast.success('Editado com sucesso!');
          }
        })
        .catch((response) => {
          const error = response.response.data.error;
          toast.error(error);
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
            handleClose();
            getUser();
            toast.success('Salvo com sucesso!');
          }
        })
        .catch((response) => {
          const error = response.response.data.error;
          toast.error(error);
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
          closeDeleteConfirm();
          getUser();
          toast.success('Deletado com sucesso!');
        }
      })
      .catch((response) => {
        const error = response.response.data.error;
        toast.error(error);
        closeDeleteConfirm();
      });
  };

  const ordinationId = () => {
    if (!isActiveId) {
      setIsActiveId(true);
      const sorted = users.sort((a, b) => {
        return a.id - b.id;
      });
      setUsers(sorted);
      setIsAscending(true);
    }
    if (isActiveId && isAscending) {
      const sorted = users.sort((a, b) => {
        return b.id - a.id;
      });
      setUsers(sorted);
      setIsAscending(false);
    }
    if (isActiveId && !isAscending) {
      const sorted = users.sort((a, b) => {
        return a.id - b.id;
      });
      setUsers(sorted);
      setIsActiveId(false);
    }
    setIsActiveName(false);
    setIsActiveAddress(false);
    setIsActiveCity(false);
    setIsActiveEmail(false);
  };

  const ordinationName = () => {
    if (!isActiveName) {
      setIsActiveName(true);
      const sorted = users.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
      });
      setUsers(sorted);
      setIsAscending(true);
    }
    if (isActiveName && isAscending) {
      const sorted = users.sort((a, b) => {
        return b.nome.localeCompare(a.nome);
      });
      setUsers(sorted);
      setIsAscending(false);
    }
    if (isActiveName && !isAscending) {
      const sorted = users.sort((a, b) => {
        return a.id - b.id;
      });
      setUsers(sorted);
      setIsActiveName(false);
    }
    setIsActiveId(false);
    setIsActiveAddress(false);
    setIsActiveCity(false);
    setIsActiveEmail(false);
  };

  const ordinationAddress = () => {
    if (!isActiveAddress) {
      setIsActiveAddress(true);
      const sorted = users.sort((a, b) => {
        return a.endereco.localeCompare(b.endereco);
      });
      setUsers(sorted);
      setIsAscending(true);
    }
    if (isActiveAddress && isAscending) {
      const sorted = users.sort((a, b) => {
        return b.endereco.localeCompare(a.endereco);
      });
      setUsers(sorted);
      setIsAscending(false);
    }
    if (isActiveAddress && !isAscending) {
      const sorted = users.sort((a, b) => {
        return a.id - b.id;
      });
      setUsers(sorted);
      setIsActiveAddress(false);
    }
    setIsActiveId(false);
    setIsActiveName(false);
    setIsActiveCity(false);
    setIsActiveEmail(false);
  };

  const ordinationCity = () => {
    if (!isActiveCity) {
      setIsActiveCity(true);
      const sorted = users.sort((a, b) => {
        return a.cidade.localeCompare(b.cidade);
      });
      setUsers(sorted);
      setIsAscending(true);
    }
    if (isActiveCity && isAscending) {
      const sorted = users.sort((a, b) => {
        return b.cidade.localeCompare(a.cidade);
      });
      setUsers(sorted);
      setIsAscending(false);
    }
    if (isActiveCity && !isAscending) {
      const sorted = users.sort((a, b) => {
        return a.id - b.id;
      });
      setUsers(sorted);
      setIsActiveCity(false);
    }
    setIsActiveId(false);
    setIsActiveName(false);
    setIsActiveAddress(false);
    setIsActiveEmail(false);
  };

  const ordinationEmail = () => {
    if (!isActiveEmail) {
      setIsActiveEmail(true);
      const sorted = users.sort((a, b) => {
        return a.email.localeCompare(b.email);
      });
      setUsers(sorted);
      setIsAscending(true);
    }
    if (isActiveEmail && isAscending) {
      const sorted = users.sort((a, b) => {
        return b.email.localeCompare(a.email);
      });
      setUsers(sorted);
      setIsAscending(false);
    }
    if (isActiveEmail && !isAscending) {
      const sorted = users.sort((a, b) => {
        return a.id - b.id;
      });
      setUsers(sorted);
      setIsActiveEmail(false);
    }
    setIsActiveId(false);
    setIsActiveName(false);
    setIsActiveAddress(false);
    setIsActiveCity(false);
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
        handleSearch,
        loadingTitle,
        loading,
        isAscending,
        ordinationId,
        isActiveId,
        ordinationName,
        isActiveName,
        ordinationAddress,
        isActiveAddress,
        ordinationCity,
        isActiveCity,
        ordinationEmail,
        isActiveEmail
      }}>
      {children}
      {show && <FormModal />}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;
