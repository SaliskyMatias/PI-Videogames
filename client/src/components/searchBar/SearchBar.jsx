import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from '../../redux/actions';
import style from './SearchBar.module.css';

export const SearchBar = () => {
    const [inputSearch, setInputSearch] = useState('');

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setInputSearch(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputSearch !== '') {
            dispatch(getVideogameByName(inputSearch));
            setInputSearch('');
        }
    }

    const handleKyeDown = (event) => {
        if(event.keyCode === 13 && inputSearch !== '') {
            dispatch(getVideogameByName(inputSearch));
            setInputSearch('');
        }
    }

    return (
        <div className={style.searchBar_container}>
            <input 
                type="search" 
                id="searchGame"
                name="searchGame" 
                value={inputSearch} 
                onChange={handleChange}  
                placeholder="look for your game..."
                onKeyDown={handleKyeDown}
            />
            <button type="submit" onClick={handleSubmit}>Search</button>
        </div>
    );
}

export default SearchBar;
