import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllVideogames, getAllGenres, filterByGenre, filterByCreation, orderByName, orderByRating, Pagination, videogamesReset } from '../../redux/actions';
import style from './Cards.module.css';

// Components
import Card from "../card/Card";
import NavBar from '../navBar/NavBar';
import Filters from '../filters/Filters';
import CardsLoader from '../cardsLoader/CardsLoader';

const Cards = () => {

    const allvideogames = useSelector((state) => state.videogames);

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);

    useEffect(() => {

        if(!allvideogames || !allvideogames.length) {
            dispatch(getAllVideogames());
        }

        dispatch(getAllGenres());

    }, [dispatch, allvideogames]);


    const handleChangeByGenres = (event) => {
        dispatch(filterByGenre(event.target.value));
    }


    const handleChangeByCreation = (event) => {
        dispatch(filterByCreation(event.target.value));
    }


    const handleChangeByName = (event) => {
        dispatch(orderByName(event.target.value));
    }

    const handleChangeByRating = (event) => {
        dispatch(orderByRating(event.target.value));
    }   

    const handleClick = () => {
        dispatch(getAllVideogames());
    }

    const handlePagination = (event) => {
        dispatch(Pagination(event.target.name));
    }

    const handleReset = () => {
        dispatch(videogamesReset());
    }

    // console.log(allvideogames);

    return (
        allvideogames && allvideogames.length ?

        <div className={style.cards_main}>

            <NavBar handleClick={handleClick} handlePagination={handlePagination}/>

            <div className={style.cards}>
                <div className={style.cards_filters} >  
                    <Filters 
                        genres={genres}
                        handleChangeByGenres={handleChangeByGenres} 
                        handleChangeByCreation={handleChangeByCreation}  
                        handleChangeByName={handleChangeByName}
                        handleChangeByRating={handleChangeByRating}
                    />

                    <button onClick={handleReset} className={style.cards_reset}>Reset All</button>
                </div>

                <div className={style.cards_container}>
                    {   
                    allvideogames?.map((videogame) => {
                            return(
                            <Card 
                                key={videogame.id}
                                id={videogame.id}
                                name={videogame.name}
                                background_image={videogame.background_image}
                                genres={videogame?.genres?.join(' | ')}
                                rating={videogame.rating}
                            />
                        )
                    })
                    } 
                </div>

            </div>

        </div> : <CardsLoader />
    );
}

export default Cards; 
