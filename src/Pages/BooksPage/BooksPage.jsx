import './BooksPage.css';
import BooksList from './List/BooksList';
import BooksContextProvider from '../../contexts/booksContext';
import React, { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';

function BooksPage() {
  const { isActiveMenu } = useContext(MenuContext);

  return (
    <div className={`${isActiveMenu ? 'books-page' : 'books-page-menuOff'}`}>
      <BooksContextProvider>
        <BooksList />
      </BooksContextProvider>
    </div>
  );
}

export default BooksPage;
