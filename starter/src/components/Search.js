import { useNavigate } from 'react-router-dom';
import { PropTypes } from "prop-types";
const Search = ({
  handleSearchQuery,
  searchQuery,
  handleUpdateShelf,
  booksSearchData,
  setSearchQuery
}) => {
  const noData = <div className='no_data'>there's no data to show </div>;
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Go back one step in history
    setSearchQuery("")
  };

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <button style={{border: 'unset'}} className='close-search' onClick={() => handleBackClick()}>
          Close
        </button>
        <div className='search-books-input-wrapper'>
          <input
            type='text'
            placeholder='Search by title, author, or ISBN'
            value={searchQuery}
            onChange={handleSearchQuery}
          />
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {searchQuery ? (
            booksSearchData.length > 0 ? (
              <>
                {booksSearchData?.map((book) => (
                  <li key={book.id}>
                    <div className='book'>
                      <div className='book-top'>
                        <div
                          className='book-cover'
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`,
                          }}
                        ></div>
                        <div className='book-shelf-changer'>
                          <select
                            value={book.shelf ? book.shelf : 'none'}
                            onChange={(e) =>
                              handleUpdateShelf(book, e.target.value)
                            }
                          >
                            <option value='none' disabled>
                              Move to...
                            </option>
                            <option value='currentlyReading'>
                              Currently Reading
                            </option>
                            <option value='wantToRead'>Want to Read</option>
                            <option value='read'>Read</option>
                            <option value='none'>None</option>
                          </select>
                        </div>
                      </div>
                      <div className='book-title'>{book.title}</div>
                      <div className='book-authors'>{book.authors}</div>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              noData
            )
          ) : (
            ''
          )}
        </ol>
      </div>
    </div>
  );
};

Search.propTypes = {
  handleSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleUpdateShelf: PropTypes.func.isRequired,
  booksSearchData: PropTypes.arrayOf(PropTypes.object),
};

export default Search;
