import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import FormModal from '../Pages/BooksPage/FormModal/FormModal';
import { toast } from 'react-toastify';

export const BooksContext = createContext();

function BooksContextProvider({ children }) {
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState('');
  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [booksInitialValues, setBooksInitialValues] = useState('');
  const [bookDefaultFormValues, setBookDefaultFormValues] = useState({});
  const [bookDeleteValues, setBookDeletValues] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [id, setId] = useState('');
  const [titleForm, setTitleForm] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [loadingTitle, setLoadingTitle] = useState('');
  const [isAscending, setIsAscending] = useState(false);
  const [isActiveId, setIsActiveId] = useState(false);
  const [isActiveName, setIsActiveName] = useState(false);
  const [isActivePublisher, setIsActivePublisher] = useState(false);
  const [isActiveAuthor, setIsActiveAuthor] = useState(false);
  const [isActiveReleaseYear, setIsActiveReleaseYear] = useState(false);
  const [isActiveQuantity, setIsActiveQuantity] = useState(false);

  const pages = Math.ceil(books.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = books.slice(startIndex, endIndex);

  const handleShow = () => {
    setTitleForm('Novo Livro');
    setShow(true);
  };

  const handleClose = () => {
    setBookDefaultFormValues({});
    if (id) {
      setId('');
    }
    setShow(false);
  };

  const closeDeleteConfirm = () => {
    if (id) {
      setId('');
    }
    setShowDeleteConfirm(false);
  };

  const handlerEdit = (bookId, bookName, bookPublisherId, bookAuthor, bookReleaseYear, bookQuantity) => {
    const book = {
      nome: bookName,
      editora: bookPublisherId,
      autor: bookAuthor,
      lancamento: bookReleaseYear,
      quantidade: bookQuantity
    };
    setBookDefaultFormValues(book);
    setId(bookId);
    setTitleForm('Editar Livro');
    setShow(true);
  };

  const handlerDelete = (bookId, bookName, bookPublisherId, bookAuthor, bookReleaseYear, bookQuantity) => {
    const deleteValues = {
      id: bookId,
      nome: bookName,
      editora: {
        id: bookPublisherId
      },
      autor: bookAuthor,
      lancamento: bookReleaseYear,
      quantidade: bookQuantity
    };
    setBookDeletValues(deleteValues);
    setShowDeleteConfirm(true);
  };

  const handleSearch = ({ target }) => {
    if (!target.value) {
      setBooks(booksInitialValues);
      return;
    }

    const search = target.value;
    setTargetValue(target.value);

    const filterBook = booksInitialValues.filter(
      (book) =>
        book.nome.toLowerCase().includes(search.toLowerCase()) ||
        book.editora.nome.toLowerCase().includes(search.toLowerCase()) ||
        book.autor.toLowerCase().includes(search.toLowerCase()) ||
        book.lancamento.toString().includes(search) ||
        book.quantidade.toString().includes(search) ||
        book.id.toString().includes(search)
    );

    setBooks(filterBook);
  };

  const loading = () => {
    if (targetValue && !(books.length > 0)) {
      setLoadingTitle('Nenhum livro encontrado');
    } else {
      setLoadingTitle('Carregando dados');
    }
  };

  useEffect(() => {
    loading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    api.get('livros').then(({ data }) => {
      const ordination = data.sort((a, b) => {
        return a.id - b.id;
      });
      setBooks(ordination);
      setBooksInitialValues(ordination);
    });
  };

  const saveBook = (data) => {
    if (id) {
      api
        .put('livro', {
          id: id,
          nome: data.nome,
          editora: {
            id: data.editora
          },
          autor: data.autor,
          lancamento: data.lancamento,
          quantidade: data.quantidade
        })
        .then((response) => {
          if (response !== null) {
            handleClose();
            getBooks();
            toast.success('Salvo com sucesso!');
          }
        })
        .catch((response) => {
          const error = response.response.data.error;
          toast.error(error);
        });
    } else {
      api
        .post('livro', {
          nome: data.nome,
          editora: {
            id: data.editora
          },
          autor: data.autor,
          lancamento: data.lancamento,
          quantidade: data.quantidade
        })
        .then((response) => {
          if (response !== null) {
            handleClose();
            getBooks();
            toast.success('Salvo com sucesso!');
          }
        })
        .catch((response) => {
          const error = response.response.data.error;
          toast.error(error);
        });
    }
  };

  const deleteBook = () => {
    api
      .delete('livro', {
        data: bookDeleteValues
      })
      .then((response) => {
        if (response !== null) {
          closeDeleteConfirm();
          getBooks();
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
      const sorted = books.sort((a, b) => {
        return a.id - b.id;
      });
      setBooks(sorted);
      setIsAscending(true);
    }
    if (isActiveId && isAscending) {
      const sorted = books.sort((a, b) => {
        return b.id - a.id;
      });
      setBooks(sorted);
      setIsAscending(false);
    }
    if (isActiveId && !isAscending) {
      const sorted = books.sort((a, b) => {
        return a.id - b.id;
      });
      setBooks(sorted);
      setIsActiveId(false);
    }
    setIsActiveName(false);
    setIsActivePublisher(false);
    setIsActiveAuthor(false);
    setIsActiveReleaseYear(false);
    setIsActiveQuantity(false);
  };

  const ordinationName = () => {
    if (!isActiveName) {
      setIsActiveName(true);
      const sorted = books.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
      });
      setBooks(sorted);
      setIsAscending(true);
    }
    if (isActiveName && isAscending) {
      const sorted = books.sort((a, b) => {
        return b.nome.localeCompare(a.nome);
      });
      setBooks(sorted);
      setIsAscending(false);
    }
    if (isActiveName && !isAscending) {
      const sorted = books.sort((a, b) => {
        return a.id - b.id;
      });
      setBooks(sorted);
      setIsActiveName(false);
    }
    setIsActiveId(false);
    setIsActivePublisher(false);
    setIsActiveAuthor(false);
    setIsActiveReleaseYear(false);
    setIsActiveQuantity(false);
  };

  const ordinationPublisher = () => {
    if (!isActivePublisher) {
      setIsActivePublisher(true);
      const sorted = books.sort((a, b) => {
        return a.editora.nome.localeCompare(b.editora.nome);
      });
      setBooks(sorted);
      setIsAscending(true);
    }
    if (isActivePublisher && isAscending) {
      const sorted = books.sort((a, b) => {
        return b.editora.nome.localeCompare(a.editora.nome);
      });
      setBooks(sorted);
      setIsAscending(false);
    }
    if (isActivePublisher && !isAscending) {
      const sorted = books.sort((a, b) => {
        return a.id - b.id;
      });
      setBooks(sorted);
      setIsActivePublisher(false);
    }
    setIsActiveId(false);
    setIsActiveName(false);
    setIsActiveAuthor(false);
    setIsActiveReleaseYear(false);
    setIsActiveQuantity(false);
  };

  const ordinationAuthor = () => {
    if (!isActiveAuthor) {
      setIsActiveAuthor(true);
      const sorted = books.sort((a, b) => {
        return a.autor.localeCompare(b.autor);
      });
      setBooks(sorted);
      setIsAscending(true);
    }
    if (isActiveAuthor && isAscending) {
      const sorted = books.sort((a, b) => {
        return b.autor.localeCompare(a.autor);
      });
      setBooks(sorted);
      setIsAscending(false);
    }
    if (isActiveAuthor && !isAscending) {
      const sorted = books.sort((a, b) => {
        return a.id - b.id;
      });
      setBooks(sorted);
      setIsActiveAuthor(false);
    }
    setIsActiveId(false);
    setIsActiveName(false);
    setIsActivePublisher(false);
    setIsActiveReleaseYear(false);
    setIsActiveQuantity(false);
  };

  const ordinationReleaseYear = () => {
    if (!isActiveReleaseYear) {
      setIsActiveReleaseYear(true);
      const sorted = books.sort((a, b) => {
        return a.lancamento - b.lancamento;
      });
      setBooks(sorted);
      setIsAscending(true);
    }
    if (isActiveReleaseYear && isAscending) {
      const sorted = books.sort((a, b) => {
        return b.lancamento - a.lancamento;
      });
      setBooks(sorted);
      setIsAscending(false);
    }
    if (isActiveReleaseYear && !isAscending) {
      const sorted = books.sort((a, b) => {
        return a.id - b.id;
      });
      setBooks(sorted);
      setIsActiveReleaseYear(false);
    }
    setIsActiveId(false);
    setIsActiveName(false);
    setIsActivePublisher(false);
    setIsActiveAuthor(false);
    setIsActiveQuantity(false);
  };

  const ordinationQuantity = () => {
    if (!isActiveQuantity) {
      setIsActiveQuantity(true);
      const sorted = books.sort((a, b) => {
        return a.quantidade - b.quantidade;
      });
      setBooks(sorted);
      setIsAscending(true);
    }
    if (isActiveQuantity && isAscending) {
      const sorted = books.sort((a, b) => {
        return b.quantidade - a.quantidade;
      });
      setBooks(sorted);
      setIsAscending(false);
    }
    if (isActiveQuantity && !isAscending) {
      const sorted = books.sort((a, b) => {
        return a.id - b.id;
      });
      setBooks(sorted);
      setIsActiveQuantity(false);
    }
    setIsActiveId(false);
    setIsActiveName(false);
    setIsActivePublisher(false);
    setIsActiveAuthor(false);
    setIsActiveReleaseYear(false);
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        show,
        handleClose,
        handleShow,
        saveBook,
        handlerEdit,
        bookDefaultFormValues,
        titleForm,
        handlerDelete,
        closeDeleteConfirm,
        showDeleteConfirm,
        deleteBook,
        pages,
        currentItens,
        itensPerPage,
        setItensPerPage,
        currentPage,
        setCurrentPage,
        handleSearch,
        loadingTitle,
        ordinationId,
        isActiveId,
        isAscending,
        ordinationName,
        isActiveName,
        ordinationPublisher,
        isActivePublisher,
        ordinationAuthor,
        isActiveAuthor,
        ordinationReleaseYear,
        isActiveReleaseYear,
        ordinationQuantity,
        isActiveQuantity
      }}>
      {children}
      {show && <FormModal />}
    </BooksContext.Provider>
  );
}

export default BooksContextProvider;
