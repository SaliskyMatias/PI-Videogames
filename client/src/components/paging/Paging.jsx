import PropTypes from 'prop-types';
import style from './Paging.module.css';

const Paging = ({ handlePagination }) => {
    return (
        <div className={style.paging_container}>
            <button name="prev" onClick={(event) => handlePagination(event)}>Prev</button>
            <button name="next" onClick={(event) => handlePagination(event)}>Next</button>
        </div>
    );
}

Paging.propTypes = {
    handlePagination: PropTypes.func
}

export default Paging;

