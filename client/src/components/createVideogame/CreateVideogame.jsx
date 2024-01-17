import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validation from '../../utils/validation';
import { getAllGenres, postVideogame, getAllPlatforms } from '../../redux/actions';
import style from './CreateVideogame.module.css';

// Components
import NavBar from "../navBar/NavBar";

const CreateVideogame = () => {

    const [ form, setForm ] = useState({
        name: '',
        background_image: '',
        description: '',
        platforms: [],
        released: '',
        rating: 0,
        genres: []
    });

    const [errors, setErrors] = useState({});

    const [isDisabled, setIsDisabled] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector((state) => state.genres);
    const allPlatforms = useSelector((state) => state.platforms);

    useEffect(() => {
        if(!genres || !genres.length) {
            dispatch(getAllGenres());
        }

        if(!allPlatforms || !allPlatforms.length) {
            dispatch(getAllPlatforms());
        }

    }, [dispatch, genres, allPlatforms]);


    useEffect(() => {
        setIsDisabled(Object.values(errors).some(error => error));
    }, [errors]);


    const handleChange = (event) => {

        if(event.target.name === 'platforms') {

            if(event.target.checked) {
                setForm({
                    ...form,
                    platforms: [...form.platforms, event.target.value]
                });
            } else {
                setForm({
                    ...form,
                    platforms: form.platforms.filter((platform) => platform !== event.target.value)
                })
            }
        }

        if(event.target.name === 'genres') {

            if(event.target.checked) {
                setForm({
                    ...form,
                    genres: [...form.genres, event.target.value]
                });
            } else {
                setForm({
                    ...form,
                    genres: form.genres.filter((genre) => genre !== event.target.value)
                });
            }
        }

        if(event.target.type !== 'checkbox') {
            setForm({
                ...form,
                [event.target.name]: event.target.value
            });
        }
    }

    useEffect(() => {
        
        setErrors(validation(form));
    
    }, [form]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (Object.keys(errors).length > 0) {
            // Si hay errores, permanecer en el formulario
            return;
        }

        dispatch(postVideogame(form));
        alert('Videogame created successfully');
        navigate('/home');
    }

    const handleReset = (event) => {
        event.preventDefault();
        setForm({
            name: '',
            background_image: '',
            description:'',
            platforms: [],
            released: '',
            rating: 0,
            genres: []
        });

        setErrors({});

        // Restablecer la propiedad checked de los checkbox a falso
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    return (
        <div className={style.form_container}>
            <NavBar />
            
            <form onSubmit={handleSubmit} className={style.form}>
                <fieldset className={style.fieldset}>
                    <legend>Create a new Videogame</legend>

                    <div className={style.form_left}>

                        <div className={style.form_name}>
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" name="name" value={form.name} placeholder="Enter videogame name..." onChange={handleChange} />
                            {errors.name && <p style={{color:'red'}}>{errors.name}</p>}
                        </div>
           
                        <div className={style.form_image}>
                            <label htmlFor="image">Image: </label>
                            <input type="text" id="image" name="background_image" value={form.background_image} onChange={handleChange} />
                            {errors.background_image && <p style={{color:'red'}}>{errors.background_image}</p>}
                        </div>
           
                        <div className={style.form_description}> 
                            <label htmlFor="description">Description: </label>
                            <textarea name="description" id="description" cols="30" rows="10" value={form.description} placeholder="Enter the description of the videogame..." onChange={handleChange} />
                            {errors.description && <p style={{color:'red'}}>{errors.description}</p>}
                        </div>

                        <div className={style.form_released}>
                            <label htmlFor="released">Released: </label>
                            <input type="date" id="released" name="released" value={form.released} onChange={handleChange} />
                            {errors.released && <p style={{color:'red'}}>{errors.released}</p>}
                        </div>

                        <div className={style.form_rating}>
                            <label htmlFor="rating">Rating: </label>
                            <input type="number" id="rating" name="rating" value={form.rating} onChange={handleChange} />
                            {errors.rating && <p style={{color:'red'}}>{errors.rating}</p>}
                        </div>

                    </div>

                    <div className={style.form_right}>
                        
                        <h3>Pick your game platforms: </h3>
                        <div className={style.form_platforms}>
                            {
                                allPlatforms?.map((platform, i) => {
                                    return(
                                        <div key={i}> 
                                            <label htmlFor={platform}>{platform}</label>
                                            <input type="checkbox" value={platform} name="platforms" id={platform} onChange={handleChange}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        {errors.platforms && <p style={{color:'red'}}>{errors.platforms}</p>}


                        <h3>Pick your game genres: </h3>
                        <div className={style.form_genres}>
                            {
                                genres?.map((genre) => {
                                    return(
                                        <div key={genre}>
                                            <label htmlFor={genre}>{genre}</label>
                                            <input type="checkbox" id={genre} value={genre} onChange={handleChange} name="genres" />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        {errors.genres && <p style={{color:'red'}}>{errors.genres}</p>}
                   
                    </div>

                    <div className={style.form_buttons}>
                        <button type="submit" className={isDisabled ? style.disabled : ''}>Create</button>
                        <button type="reset" onClick={handleReset} >Reset</button>
                    </div>

                </fieldset> 

            </form>

        </div>
        
    );
}

export default CreateVideogame;
