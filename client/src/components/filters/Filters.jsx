import PropTypes from 'prop-types';
import style from './Filters.module.css';

const Filters = ({ genres, handleChangeByGenres, handleChangeByCreation, handleChangeByName, handleChangeByRating }) => {
 
    return (
        <div className={style.filters_container}>

            <h2>Filters</h2>

            <div className={style.filters_created}>
                <label htmlFor="videogames">Videogames</label>
                <select name="filterByCreation" id="videogames" onChange={handleChangeByCreation}>
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="created">Created</option>
                </select>
            </div>

            <div className={style.filters_genres}>
                <label htmlFor="genres">Genres</label>
                <select name="filterByGenre" id="genres" onChange={handleChangeByGenres}>
                    <option key={"all"} value="All">All</option>
                    {
                        genres?.map((genre) => {
                            return(
                                <option key={genre} value={genre}>{genre}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className={style.filters_orderByName}> 
                <label htmlFor="orderByName">Order by Name</label>
                <select name="orderByName" id="orderByName" onChange={handleChangeByName} defaultValue="default" >
                    <option value="default" disabled hidden >Alphabethic</option>
                    <option value="ascending">A-Z</option>
                    <option value="descending">Z-A</option>
                </select>
            </div>

            <div className={style.filters_orderByRating}>
                <label htmlFor="orderByRating">Order by Rating</label>
                <select name="orderByRating" id="orderByRating" onChange={handleChangeByRating} defaultValue="default" >
                    <option value="default" disabled hidden >Rating</option>
                    <option value="ascending">Min</option>
                    <option value="descending">Max</option>
                </select>
            </div>

        </div>
    );
}

Filters.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.string),
    handleChangeByGenres: PropTypes.func,
    handleChangeByCreation: PropTypes.func,
    handleChangeByName: PropTypes.func,
    handleChangeByRating: PropTypes.func,
  };

export default Filters;