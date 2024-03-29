import { PropTypes } from 'prop-types';

const Shelf = ({ titleName, booksData, shelf, handleUpdateShelf }) => {
  const bookShelf = booksData.filter((book) => book.shelf === shelf);

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{titleName}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {bookShelf?.map((book) => (
            <li key={book.id}>
              <div className='book'>
                <div className='book-top'>
                  <div
                    className='book-cover'
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: book.imageLinks?.thumbnail
                        ? `url(${book.imageLinks?.thumbnail})`
                        : "url('')",
                    }}
                  ></div>
                  <div className='book-shelf-changer'>
                    <select
                      value={book.shelf ? book.shelf : 'none'}
                      onChange={(e) => handleUpdateShelf(book, e.target.value)}
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
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  titleName: PropTypes.string.isRequired,
  booksData: PropTypes.arrayOf(PropTypes.object).isRequired,
  shelf: PropTypes.string.isRequired,
  handleUpdateShelf: PropTypes.func.isRequired,
};

export default Shelf;
