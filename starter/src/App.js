import './App.css';
import { useEffect, useState } from 'react';
import Search from './components/Search';
import * as BooksAPI from './utils/BooksAPI';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Shelves from './components/Shelves';
import SearchButton from './components/SearchButton';

function App() {
  const [booksData, setBooksData] = useState([]);
  const [booksSearchData, setBooksSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllBooksData = async () => {
    await BooksAPI.getAll().then((res) => {
      setBooksData(res);
    });
  };

  const handleUpdateShelf = (book, value) => {
    BooksAPI.update(book, value);
    setTimeout(() => {
      getAllBooksData()
    }, 200);
  };

  const handleSearchQuery = (e) => {
    let inputValue = e.target.value;
    setSearchQuery(inputValue);
  };

  useEffect(() => {
    let isActive = true;
    if (searchQuery) {
      BooksAPI.search(searchQuery).then((data) => {
        if (data.error) {
          setBooksSearchData([]);
        } else {
          if (isActive) {
            setBooksSearchData(data);
          }
        }
      });
    }
    return () => {
      isActive = false;
      setBooksSearchData([]);
    };
  }, [searchQuery]);

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
                <Shelves booksData={booksData} handleUpdateShelf={handleUpdateShelf} />
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
