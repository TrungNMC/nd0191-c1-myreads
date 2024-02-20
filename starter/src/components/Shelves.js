import Shelf from './Shelf';
import { PropTypes } from "prop-types";
const Shelves = ({ booksData, handleUpdateShelf }) => {
  return (
    <div className='list-books-content'>
      <div>
        <Shelf
          handleUpdateShelf={handleUpdateShelf}
          booksData={booksData}
          titleName='Currently Reading'
          shelf='currentlyReading'
        />
        <Shelf
          handleUpdateShelf={handleUpdateShelf}
          booksData={booksData}
          titleName='Want To Read'
          shelf='wantToRead'
        />
        <Shelf
          handleUpdateShelf={handleUpdateShelf}
          booksData={booksData}
          titleName='Read'
          shelf='read'
        />
      </div>
    </div>
  );
};

Shelves.propTypes = {
  booksData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleUpdateShelf: PropTypes.func.isRequired
};

export default Shelves;
