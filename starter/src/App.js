import './App.css';
import { useEffect, useState } from 'react';
import Search from './components/Search';
import * as BooksAPI from './utils/BooksAPI';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Shelves from './components/Shelves';
import SearchButton from './components/SearchButton';
import { useDebounce } from 'use-debounce';

function App() {
  const [booksData, setBooksData] = useState([]);
  const [booksSearchData, setBooksSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [valueSearch] = useDebounce(searchQuery, 1000);

  const getAllBooksData = async () => {
    await BooksAPI.getAll().then((res) => {
      setBooksData(res);
    });
  };

  const handleUpdateShelf = (book, value) => {
    book.shelf = value;
    BooksAPI.update(book, value).then(() => {
      setBooksData([...booksData.filter((b) => b.id !== book.id), book]);
    });
  };

  const handleSearchQuery = (e) => {
    let inputValue = e.target.value;
    setSearchQuery(inputValue);
  };

  useEffect(() => {
    let isActive = true;
    if (valueSearch) {
      BooksAPI.search(valueSearch).then((data) => {
        if (data.error) {
          setBooksSearchData([]);
        } else if (isActive) {
          setBooksSearchData(data);
        }
      });
    }

    return () => {
      isActive = false;
      setBooksSearchData([]);
    };
  }, [valueSearch]);

  const addShelfToBookSearchData = (bookSearchData, bookData) => {
    bookSearchData.forEach((book) => {
      const shelf = bookData.find((shelf) => shelf.id === book.id);
      if (shelf) {
        book.shelf = shelf.shelf;
      } else {
        book.shelf = 'none'
      }
    });
  }

  addShelfToBookSearchData(booksSearchData, booksData)

  useEffect(() => {
    getAllBooksData();
  }, []);
  
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path='/search'
            element={
              <Search
                booksSearchData={booksSearchData}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchQuery={handleSearchQuery}
                handleUpdateShelf={handleUpdateShelf}
              />
            }
          />
          <Route
            path='/'
            element={
              <div className='list-books'>
                <Header />
                <Shelves
                  booksData={booksData}
                  handleUpdateShelf={handleUpdateShelf}
                />
                <SearchButton />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
