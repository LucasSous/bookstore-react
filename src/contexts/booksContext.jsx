import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import FormModal from '../Pages/BooksPage/FormModal/FormModal';

export const BooksContext = createContext();

function BooksContextProvider({ children }) {
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState('');
  const [booksInitialValues, setBooksInitialValues] = useState('');

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    api.get('livros').then(({ data }) => {
      setBooks(data);
      setBooksInitialValues(data);
    });
  };

  return (
    <BooksContext.Provider value={{ books, show, handleClose, handleShow }}>
      {children}
      {show && <FormModal />}
    </BooksContext.Provider>
  );
}

export default BooksContextProvider;
