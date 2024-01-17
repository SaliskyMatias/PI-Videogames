import PropTypes from 'prop-types';
import style from './Paging.module.css';
import { useSelector } from 'react-redux';

const Paging = ({ handlePagination }) => {
    const currentPage = useSelector((state) => state.currentPage);

    return (
        <div className={style.paging_container}>
            <button name="prev" onClick={(event) => handlePagination(event)}>Prev</button>
            <p>{currentPage + 1}</p>
            <button name="next" onClick={(event) => handlePagination(event)}>Next</button>
        </div>
    );
}

Paging.propTypes = {
    handlePagination: PropTypes.func
}

export default Paging;

