import React, { createContext, useEffect, useState } from 'react';
import FormModal from '../Pages/PublishersPage/FormModal/FormModal';
import { toast } from 'react-toastify';
import api from '../services/api';

export const PublishersContext = createContext();

function PublishersContextProvider({ children }) {
  const [show, setShow] = useState(false);
  const [titleForm, setTitleForm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [publishers, setPublishers] = useState([]);
  const [publishersInitialValues, setPublishersInitialValues] = useState([]);
  const [targetValue, setTargetValue] = useState('');
  const [loadingTitle, setLoadingTitle] = useState('');
  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAscending, setIsAscending] = useState(false);
  const [isActiveId, setIsActiveId] = useState(false);
  const [isActiveName, setIsActiveName] = useState(false);
  const [isActiveCity, setIsActiveCity] = useState(false);
  const [id, setId] = useState('');
  const [publisherDefaultFormValues, setPublisherDefaultFormValues] = useState({});
  const [publisherDeleteValues, setPublisherDeleteValues] = useState({});

  const pages = Math.ceil(publishers.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = publishers.slice(startIndex, endIndex);

  const handlerShow = () => {
    setTitleForm('Novo usuário');
    setShow(true);
  };

  const handleClose = () => {
    setPublisherDefaultFormValues({});
    if (id) {
      setId('');
    }
    setShow(false);
  };

  const handlerEdit = (publisherId, publisherName, publisherCity) => {
    const publisher = {
      nome: publisherName,
      cidade: publisherCity
    };
    setPublisherDefaultFormValues(publisher);
    setId(publisherId);
    setTitleForm('Editar Usuário');
    setShow(true);
  };

  const handlerDelete = (publisherId, publisherName, publisherCity) => {
    const deleteValues = {
      id: publisherId,
      nome: publisherName,
      cidade: publisherCity
    };
    setPublisherDeleteValues(deleteValues);
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    if (id) {
      setId('');
    }
    setShowDeleteConfirm(false);
  };

  const handleSearch = ({ target }) => {
    if (!target.value) {
      setPublishers(publishersInitialValues);
      return;
    }

    const search = target.value;
    setTargetValue(target.value);

    const filterPublisher = publishersInitialValues.filter(
      (publisher) =>
        publisher.nome.toLowerCase().includes(search.toLowerCase()) ||
        publisher.cidade.toLowerCase().includes(search.toLowerCase()) ||
        publisher.id.toString().includes(search)
    );

    setPublishers(filterPublisher);
  };

  const loading = () => {
    if (targetValue && !(publishers.length > 0)) {
      setLoadingTitle('Nenhum usuário encontrado');
    } else {
      setLoadingTitle('Carregando dados');
    }
  };

  useEffect(() => {
    loading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishers]);

  useEffect(() => {
    getPublishers();
  }, []);

  const getPublishers = () => {
    api.get('editoras').then(({ data }) => {
      const ordination = data.sort((a, b) => {
        return a.id - b.id;
      });
      setPublishers(ordination);
      setPublishersInitialValues(ordination);
    });
  };

  const savePublisher = (data) => {
    if (id) {
      api
        .put('editora', {
          id: id,
          nome: data.nome,
          cidade: data.cidade
        })
        .then((response) => {
          if (response !== null) {
            handleClose();
            getPublishers();
            toast.success('Editado com sucesso!');
          }
        })
        .catch((response) => {
          const error = response.response.data.error;
          toast.error(error);
        });
    } else {
      api
        .post('editora', {
          nome: data.nome,
          cidade: data.cidade
        })
        .then((response) => {
          if (response !== null) {
            handleClose();
            getPublishers();
            toast.success('Salvo com sucesso!');
          }
        })
        .catch((response) => {
          const error = response.response.data.error;
          toast.error(error);
        });
    }
  };

  const deletePublisher = () => {
    api
      .delete('editora', {
        data: publisherDeleteValues
      })
      .then((response) => {
        if (response !== null) {
          closeDeleteConfirm();
          getPublishers();
          toast.success('Deletada com sucesso!');
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
      const sorted = publishers.sort((a, b) => {
        return a.id - b.id;
      });
      setPublishers(sorted);
      setIsAscending(true);
    }
    if (isActiveId && isAscending) {
      const sorted = publishers.sort((a, b) => {
        return b.id - a.id;
      });
      setPublishers(sorted);
      setIsAscending(false);
    }
    if (isActiveId && !isAscending) {
      const sorted = publishers.sort((a, b) => {
        return a.id - b.id;
      });
      setPublishers(sorted);
      setIsActiveId(false);
    }
    setIsActiveName(false);
    setIsActiveCity(false);
  };

  const ordinationName = () => {
    if (!isActiveName) {
      setIsActiveName(true);
      const sorted = publishers.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
      });
      setPublishers(sorted);
      setIsAscending(true);
    }
    if (isActiveName && isAscending) {
      const sorted = publishers.sort((a, b) => {
        return b.nome.localeCompare(a.nome);
      });
      setPublishers(sorted);
      setIsAscending(false);
    }
    if (isActiveName && !isAscending) {
      const sorted = publishers.sort((a, b) => {
        return a.id - b.id;
      });
      setPublishers(sorted);
      setIsActiveName(false);
    }
    setIsActiveId(false);
    setIsActiveCity(false);
  };

  const ordinationCity = () => {
    if (!isActiveCity) {
      setIsActiveCity(true);
      const sorted = publishers.sort((a, b) => {
        return a.cidade.localeCompare(b.cidade);
      });
      setPublishers(sorted);
      setIsAscending(true);
    }
    if (isActiveCity && isAscending) {
      const sorted = publishers.sort((a, b) => {
        return b.cidade.localeCompare(a.cidade);
      });
      setPublishers(sorted);
      setIsAscending(false);
    }
    if (isActiveCity && !isAscending) {
      const sorted = publishers.sort((a, b) => {
        return a.id - b.id;
      });
      setPublishers(sorted);
      setIsActiveCity(false);
    }
    setIsActiveId(false);
    setIsActiveName(false);
  };

  return (
    <PublishersContext.Provider
      value={{
        publishers,
        pages,
        currentItens,
        itensPerPage,
        setItensPerPage,
        currentPage,
        setCurrentPage,
        isAscending,
        ordinationId,
        isActiveId,
        ordinationName,
        isActiveName,
        ordinationCity,
        isActiveCity,
        closeDeleteConfirm,
        showDeleteConfirm,
        handleSearch,
        loadingTitle,
        show,
        titleForm,
        handlerShow,
        handleClose,
        publisherDefaultFormValues,
        savePublisher,
        handlerEdit,
        handlerDelete,
        deletePublisher
      }}>
      {children}
      {show && <FormModal />}
    </PublishersContext.Provider>
  );
}

export default PublishersContextProvider;
