import PropTypes from 'prop-types';
import style from './Paging.module.css';
import { useSelector } from 'react-redux';

const Paging = ({ handlePagination }) => {
    const currentPage = useSelector((state) => state.currentPage);
    const allvideogames = useSelector((state) => state.videogamesBackUp);
    const videogamesFiltered = useSelector((state) => state.videogamesFiltered);
    const filters = useSelector((state) => state.filters);

    let totalPages;

    if(filters) {
        totalPages = Math.ceil(videogamesFiltered.length / 15);
    } else {
        totalPages = Math.ceil(allvideogames.length / 15);
    }

    return (
        <div className={style.paging_container}>
            <button name="prev" onClick={(event) => handlePagination(event)}>Prev</button>
            <p>{currentPage + 1} de {totalPages}</p>
            <button name="next" onClick={(event) => handlePagination(event)}>Next</button>
        </div>
    );
}

Paging.propTypes = {
    handlePagination: PropTypes.func
}

export default Paging;

