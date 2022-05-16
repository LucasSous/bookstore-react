import React, { createContext, useEffect, useState } from 'react';
import FormModal from '../Pages/RentsPage/FormModal/FormModal';
import api from '../services/api';

export const RentsContext = createContext();

function RentsContextProvider({ children }) {
  const [show, setShow] = useState(false);
  const [rents, setRents] = useState([]);
  const [rentsInitialValues, setRentsInitialValues] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [targetValue, setTargetValue] = useState(false);
  const [titleForm, setTitleForm] = useState('');
  const [isAscending, setIsAscending] = useState(false);
  const [isActiveId, setIsActiveId] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [isActiveBook, setIsActiveBook] = useState(false);
  const [isActiveRentalDate, setIsActiveRentalDate] = useState(false);
  const [isActiveForecastDate, setIsActiveForecastDate] = useState(false);
  const [isActiveDevolutionDate, setIsActiveDevolutionDate] = useState(false);
  const [rentDefaultFormValues, setRentDefaultFormValues] = useState({});
  const [id, setId] = useState('');

  const pages = Math.ceil(rents.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = rents.slice(startIndex, endIndex);

  const handlerClose = () => {
    setRentDefaultFormValues({});
    if (id) {
      setId('');
    }
    setShow(false);
  };

  const handlerShow = () => {
    setTitleForm('Novo usuário');
    setShow(true);
  };

  const handlerSearch = ({ target }) => {
    if (!target.value) {
      setRents(rentsInitialValues);
      return;
    }

    const search = target.value;
    setTargetValue(target.value);

    const filterRent = rentsInitialValues.filter(
      (rent) =>
        rent.usuario_id.nome.toLowerCase().includes(search.toLowerCase()) ||
        rent.livro_id.nome.toLowerCase().includes(search.toLowerCase()) ||
        rent.data_aluguel.includes(search) ||
        rent.data_previsao.includes(search) ||
        rent.data_Devolucao.includes(search) ||
        rent.id.toString().includes(search)
    );

    setRents(filterRent);
  };

  useEffect(() => {
    getRents();
  }, []);

  const getRents = () => {
    api.get('alugueis').then(({ data }) => {
      const sorted = data.sort((a, b) => {
        return a.id - b.id;
      });
      setRents(sorted);
      setRentsInitialValues(sorted);
    });
  };

  const ordinationId = () => {
    if (!isActiveId) {
      setIsActiveId(true);
      const sorted = rents.sort((a, b) => {
        return a.id - b.id;
      });
      setRents(sorted);
      setIsAscending(true);
    }
    if (isActiveId && isAscending) {
      const sorted = rents.sort((a, b) => {
        return b.id - a.id;
      });
      setRents(sorted);
      setIsAscending(false);
    }
    if (isActiveId && !isAscending) {
      const sorted = rents.sort((a, b) => {
        return a.id - b.id;
      });
      setRents(sorted);
      setIsActiveId(false);
    }
    setIsActiveUser(false);
    setIsActiveBook(false);
    setIsActiveRentalDate(false);
    setIsActiveForecastDate(false);
    setIsActiveDevolutionDate(false);
  };

  const ordinationUser = () => {
    if (!isActiveUser) {
      setIsActiveUser(true);
      const sorted = rents.sort((a, b) => {
        return a.usuario_id.nome.localeCompare(b.usuario_id.nome);
      });
      setRents(sorted);
      setIsAscending(true);
    }
    if (isActiveUser && isAscending) {
      const sorted = rents.sort((a, b) => {
        return b.usuario_id.nome.localeCompare(a.usuario_id.nome);
      });
      setRents(sorted);
      setIsAscending(false);
    }
    if (isActiveUser && !isAscending) {
      const sorted = rents.sort((a, b) => {
        return a.id - b.id;
      });
      setRents(sorted);
      setIsActiveUser(false);
    }
    setIsActiveId(false);
    setIsActiveBook(false);
    setIsActiveRentalDate(false);
    setIsActiveForecastDate(false);
    setIsActiveDevolutionDate(false);
  };

  const ordinationBook = () => {
    if (!isActiveBook) {
      setIsActiveBook(true);
      const sorted = rents.sort((a, b) => {
        return a.livro_id.nome.localeCompare(b.livro_id.nome);
      });
      setRents(sorted);
      setIsAscending(true);
    }
    if (isActiveBook && isAscending) {
      const sorted = rents.sort((a, b) => {
        return b.livro_id.nome.localeCompare(a.livro_id.nome);
      });
      setRents(sorted);
      setIsAscending(false);
    }
    if (isActiveBook && !isAscending) {
      const sorted = rents.sort((a, b) => {
        return a.id - b.id;
      });
      setRents(sorted);
      setIsActiveBook(false);
    }
    setIsActiveId(false);
    setIsActiveUser(false);
    setIsActiveRentalDate(false);
    setIsActiveForecastDate(false);
    setIsActiveDevolutionDate(false);
  };

  const ordinationRentalDate = () => {
    if (!isActiveRentalDate) {
      setIsActiveRentalDate(true);
      const sorted = rents.sort((a, b) => {
        return a.data_aluguel.localeCompare(b.data_aluguel);
      });
      setRents(sorted);
      setIsAscending(true);
    }
    if (isActiveRentalDate && isAscending) {
      const sorted = rents.sort((a, b) => {
        return b.data_aluguel.localeCompare(a.data_aluguel);
      });
      setRents(sorted);
      setIsAscending(false);
    }
    if (isActiveRentalDate && !isAscending) {
      const sorted = rents.sort((a, b) => {
        return a.id - b.id;
      });
      setRents(sorted);
      setIsActiveRentalDate(false);
    }
    setIsActiveId(false);
    setIsActiveUser(false);
    setIsActiveBook(false);
    setIsActiveForecastDate(false);
    setIsActiveDevolutionDate(false);
  };

  const ordinationForecastDate = () => {
    if (!isActiveForecastDate) {
      setIsActiveForecastDate(true);
      const sorted = rents.sort((a, b) => {
        return a.data_previsao.localeCompare(b.data_previsao);
      });
      setRents(sorted);
      setIsAscending(true);
    }
    if (isActiveForecastDate && isAscending) {
      const sorted = rents.sort((a, b) => {
        return b.data_previsao.localeCompare(a.data_previsao);
      });
      setRents(sorted);
      setIsAscending(false);
    }
    if (isActiveForecastDate && !isAscending) {
      const sorted = rents.sort((a, b) => {
        return a.id - b.id;
      });
      setRents(sorted);
      setIsActiveForecastDate(false);
    }
    setIsActiveId(false);
    setIsActiveUser(false);
    setIsActiveBook(false);
    setIsActiveRentalDate(false);
    setIsActiveDevolutionDate(false);
  };

  const ordinationDevolutionDate = () => {
    if (!isActiveDevolutionDate) {
      setIsActiveDevolutionDate(true);
      const sorted = rents.sort((a, b) => {
        return a.data_devolucao.localeCompare(b.data_devolucao);
      });
      setRents(sorted);
      setIsAscending(true);
    }
    if (isActiveDevolutionDate && isAscending) {
      const sorted = rents.sort((a, b) => {
        return b.data_devolucao.localeCompare(a.data_devolucao);
      });
      setRents(sorted);
      setIsAscending(false);
    }
    if (isActiveDevolutionDate && !isAscending) {
      const sorted = rents.sort((a, b) => {
        return a.id - b.id;
      });
      setRents(sorted);
      setIsActiveDevolutionDate(false);
    }
    setIsActiveId(false);
    setIsActiveUser(false);
    setIsActiveBook(false);
    setIsActiveRentalDate(false);
    setIsActiveForecastDate(false);
  };

  return (
    <RentsContext.Provider
      value={{
        rents,
        pages,
        currentItens,
        currentPage,
        setCurrentPage,
        itensPerPage,
        setItensPerPage,
        ordinationId,
        isActiveId,
        isAscending,
        ordinationUser,
        isActiveUser,
        ordinationBook,
        isActiveBook,
        ordinationRentalDate,
        isActiveRentalDate,
        ordinationForecastDate,
        isActiveForecastDate,
        ordinationDevolutionDate,
        isActiveDevolutionDate,
        handlerSearch,
        show,
        handlerClose,
        handlerShow,
        titleForm
      }}>
      {children}
      {show && <FormModal />}
    </RentsContext.Provider>
  );
}

export default RentsContextProvider;
