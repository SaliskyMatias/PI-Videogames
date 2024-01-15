import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getVideogameDetail, clearVideogameDetail } from '../../redux/actions';
import style from './VideogameDetail.module.css';

// Components
import NavBar from '../navBar/NavBar';
import DetailLoader from '../detailLoader/DetailLoader';

const VideogameDetail = () => {
    const videogame = useSelector((state) => state.videogameDetail);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getVideogameDetail(params.idVideogame));

        return () => {
            dispatch(clearVideogameDetail());
        }

    }, [dispatch, params.idVideogame]);

    return (
        videogame.name ?
        <div className={style.card_main}>
            <NavBar />
            {   
                <div className={style.card_detail_container}>

                    <div className={style.card_detail_image}>
                        <img src={videogame.background_image} />
                    </div>

                    <div className={style.card_detail_text}>
                        <h2 className={style.card_detail_name}>{videogame.name}</h2>
                        <p dangerouslySetInnerHTML={{ __html: videogame.description }} className={style.card_detail_description}/>
                        <h2 className={style.card_detail_platforms}>Available at: {videogame?.platforms?.join(' | ')}</h2>
                        <h2 className={style.card_detail_genres}>Genres: {videogame?.genres?.join(' | ')}</h2>
                        <h2 className={style.card_detail_rating}>Avarage rating: {videogame.rating}</h2>
                        <p className={style.card_detail_relased}>Released at: {videogame.released}</p>
                        <p className={style.card_id}>Videogame Id: {videogame.id} </p>
                    </div >

                    <Link to='/home'>
                        <button className={style.card_button}>Go back</button>
                    </Link>
                </div> 
            } 

        </div> : <DetailLoader />
    );
}

export default VideogameDetail;