import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_BY_NAME, GET_VIDEOGAME_DETAIL, POST_VIDEOGAME, CLEAR_VIDEOGAME_DETAIL, GET_ALL_GENRES, GET_ALL_PLATFORMS,  FILTER_BY_GENRE, FILTER_BY_CREATION, ORDER_BY_NAME, ORDER_BY_RATING, PAGINATE, RESET } from './actions-type';


// ------------------- Videogames -------------------

export const getAllVideogames = () => {
    const endpoint = `http://localhost:3001/videogames`;
    return async (dispatch) => {
        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            return dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: data
            });

        } catch (error) {
          alert(error.message);
        }
    }
}

export const getVideogameByName = (name) => {
    const endpoint = `http://localhost:3001/videogames?name=${name}`;
    return async (dispatch) => {
        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`NOT FOUND: please try with other name`);
            }

            const data = await response.json();

            return dispatch({
                type: GET_VIDEOGAME_BY_NAME,
                payload: data
            });

        } catch (error) {
            alert(error.message);
        }
    }
}

export const getVideogameDetail = (idVideogame) => {
    const endpoint = `http://localhost:3001/videogames/${idVideogame}`;
    return async (dispatch) => {
        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            return dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: data
            });

        } catch (error) {
            alert(error.message);
        }
    }
}

export const postVideogame = (videogame) => {
    const endpoint = `http://localhost:3001/videogames`;
    return async (dispatch) => {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(videogame)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            return dispatch({
                type: POST_VIDEOGAME,
                payload: data
            });
            
        } catch (error) {
            alert(error.message);
        }
    }
}


export const clearVideogameDetail = () => {
    return {
        type: CLEAR_VIDEOGAME_DETAIL
    }
}


// ------------------- Genres -------------------

export const getAllGenres = () => {
    const endpoint = `http://localhost:3001/genres`;
    return async (dispatch) => {
        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            return dispatch({
                type: GET_ALL_GENRES,
                payload: data
            });

        } catch (error) {
            alert(error.message);
        }
    }
}


// ------------------- Platforms -------------------

export const getAllPlatforms = () => {
    const endpoint = `http://localhost:3001/platforms`;
    return async (dispatch) => {
        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            return dispatch({
                type: GET_ALL_PLATFORMS,
                payload: data
            });

        } catch (error) {
            alert(error.message);
        }
    }
}


// ------------------- Filters and Ordering -------------------

export const filterByGenre = (genre) => {
    return {
        type: FILTER_BY_GENRE,
        payload: genre
    }
}

export const filterByCreation = (created) => {
    return {
        type: FILTER_BY_CREATION,
        payload: created
    }
}

export const orderByName = (order) => {
    return {
        type: ORDER_BY_NAME,
        payload: order
    }
}

export const orderByRating = (order) => {
    return {
        type: ORDER_BY_RATING,
        payload: order
    }
}


// ------------------- Pagination -------------------

export const Pagination = (direction) => {
    return {
        type: PAGINATE,
        payload: direction
    }
}


// ------------------- Reset -------------------

export const videogamesReset = () => {
    return {
        type: RESET
    }
}

