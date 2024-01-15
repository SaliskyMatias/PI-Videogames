import style from './Card.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Card = ({ id, name, background_image, genres, rating }) => {

    return (
        <Link to={`/videogames/${id}`} className={style.card_link} >
            <div className={style.card_container}> 
                <img src={background_image} className={style.card_img} />
                <h2>{name}</h2>
                <h3 className={style.genres}>{genres}</h3>
                <h3 className={style.rating}>Rating: {rating}</h3>
            </div>
        </Link>
    );
}

Card.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    background_image: PropTypes.string,
    genres: PropTypes.string,
    rating: PropTypes.number,
};

export default Card; 

