import './BooksPage.css';
import BooksList from './List/BooksList';
import BooksContextProvider from '../../contexts/booksContext';

function BooksPage() {
  return (
    <div className="books-page">
      <BooksContextProvider>
        <BooksList />
      </BooksContextProvider>
    </div>
  );
}

export default BooksPage;
