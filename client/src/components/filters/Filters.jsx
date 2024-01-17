import PropTypes from 'prop-types';
import style from './Filters.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { filterByCreation, filterByGenre, orderByName, orderByRating, videogamesReset } from '../../redux/actions';

const Filters = ({ genres }) => {

    const [selectedCreation, setSelectedCreation] = useState('all');
    const [selectedGenre, setSelectedGenre] = useState('default');
    const [selectedNameOrder, setSelectedNameOrder] = useState('default');
    const [selectedRatingOrder, setSelectedRatingOrder] = useState('default');

    const dispatch = useDispatch();

    const handleChangeByGenres = (event) => {
        setSelectedGenre(event.target.value);
        dispatch(filterByGenre(event.target.value));
    }

    const handleChangeByCreation = (event) => {
        setSelectedCreation(event.target.value);
        dispatch(filterByCreation(event.target.value));
    }

    const handleChangeByName = (event) => {
        setSelectedNameOrder(event.target.value);
        dispatch(orderByName(event.target.value));
    }

    const handleChangeByRating = (event) => {
        setSelectedRatingOrder(event.target.value);
        dispatch(orderByRating(event.target.value));
    } 

    const handleReset = () => {
        setSelectedCreation('all');
        setSelectedGenre('default');
        setSelectedNameOrder('default');
        setSelectedRatingOrder('default');
        dispatch(videogamesReset());
    }

    return (
        <div className={style.filters_container}>

            <h2>Filters</h2>

            <div className={style.filters_created}>
                <label htmlFor="videogames">Videogames</label>
                <select name="filterByCreation" id="videogames" onChange={handleChangeByCreation} value={selectedCreation}>
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="created">Created</option>
                </select>
            </div>

            <div className={style.filters_genres}>
                <label htmlFor="genres">Genres</label>
                <select name="filterByGenre" id="genres" onChange={handleChangeByGenres} value={selectedGenre}>
                    <option value="default" disabled hidden >Genre</option>
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
                <select name="orderByName" id="orderByName" onChange={handleChangeByName} value={selectedNameOrder}>
                    <option value="default" disabled hidden >Alphabethic</option>
                    <option value="ascending">A-Z</option>
                    <option value="descending">Z-A</option>
                </select>
            </div>

            <div className={style.filters_orderByRating}>
                <label htmlFor="orderByRating">Order by Rating</label>
                <select name="orderByRating" id="orderByRating" onChange={handleChangeByRating} value={selectedRatingOrder}>
                    <option value="default" disabled hidden >Rating</option>
                    <option value="ascending">Min</option>
                    <option value="descending">Max</option>
                </select>
            </div>

            <button onClick={handleReset} className={style.reset_all}>Reset All</button>
        </div>
    );
}

Filters.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.string)
};

export default Filters;