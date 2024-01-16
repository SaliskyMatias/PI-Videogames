import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_BY_NAME, GET_VIDEOGAME_DETAIL, POST_VIDEOGAME, CLEAR_VIDEOGAME_DETAIL, GET_ALL_GENRES, GET_ALL_PLATFORMS, FILTER_BY_GENRE, FILTER_BY_CREATION, ORDER_BY_NAME, ORDER_BY_RATING, PAGINATE, RESET } from "./actions-type";

const initialState = {
    videogames: [],
    videogamesBackUp: [],
    videogameDetail: {},
    genres: [],
    platforms: [],
    currentPage: 0,
    videogamesFiltered: [],
    filters: false
}


const reducer = (state = initialState, action) => {
    const cardsPerPage = 15;

    switch (action.type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: [...action.payload].splice(0, cardsPerPage),
                videogamesBackUp: action.payload,
                filters: false
            }

        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                videogames: action.payload,
                videogamesFiltered: action.payload,
                filters: true
            }

        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload
            }

        case POST_VIDEOGAME:
            return {
                ...state,
                videogames: [...state.videogames, action.payload].splice(0, cardsPerPage),
                videogamesBackUp: [...state.videogamesBackUp, action.payload],
                currentPage: 0,
                filters: false
            }

        case CLEAR_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: {}
            }

        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }

        case GET_ALL_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }

        case FILTER_BY_GENRE: {
            const allVideogames = state.filters ? [...state.videogamesFiltered] : [...state.videogamesBackUp];

            const filteredByGenre = allVideogames.filter((videogame) => videogame.genres.includes(action.payload));

            if(!filteredByGenre.length) {
                return {
                    ...state
                }
            }

            return {
                ...state,
                videogames: [...filteredByGenre].splice(0, cardsPerPage),
                videogamesFiltered: filteredByGenre,
                currentPage: 0,
                filters: true
            }
        }

        case FILTER_BY_CREATION: {
            // const allVideogames = state.filters ? [...state.videogamesFiltered] : [...state.videogamesBackUp];

            let allVideogames = [...state.videogamesBackUp];

            let filteredByCreation;
        
            if (action.payload === 'created') {
                filteredByCreation = allVideogames.filter((videogame) => typeof videogame.id === 'string');
            }
        
            if (action.payload === 'available') {
                filteredByCreation = allVideogames.filter((videogame) => typeof videogame.id === 'number');
            }

            if(action.payload === 'all') {
                filteredByCreation = allVideogames;
            }
        
            return {
                ...state,
                videogames: [...filteredByCreation].splice(0, cardsPerPage),
                videogamesFiltered: filteredByCreation,
                currentPage: 0,
                filters: true
            }

        }

        case ORDER_BY_NAME: {
            const allVideogames = state.filters ? [...state.videogamesFiltered] : [...state.videogamesBackUp];

            let orderName;

            if (action.payload === 'ascending') {
                orderName = allVideogames.sort((a, b) => (a.name > b.name) ? 1 : -1);
            }
        
            if (action.payload === 'descending') {
                orderName = allVideogames.sort((a, b) => (a.name < b.name) ? 1 : -1);
            }

            return {
                ...state,
                videogames: [...orderName].splice(0, cardsPerPage),
                videogamesFiltered: orderName,
                currentPage: 0,
                filters: true          
            }
        }

        case ORDER_BY_RATING: {
            const allVideogames = state.filters ? [...state.videogamesFiltered] : [...state.videogamesBackUp];

            let orderRating;

            if(action.payload === 'ascending') {
                orderRating = allVideogames.sort((a, b) => a.rating - b.rating);
            }

            if(action.payload === 'descending') {
                orderRating = allVideogames.sort((a, b) => b.rating - a.rating);
            }

            return {
                ...state,
                videogames: [...orderRating].splice(0, cardsPerPage),
                videogamesFiltered: orderRating,
                currentPage: 0,
                filters: true,         
            }
        }

        case PAGINATE: {
            const nextPage = state.currentPage + 1;
            const prevPage = state.currentPage - 1;
            const startIndex = action.payload === 'next' ? nextPage * cardsPerPage : prevPage * cardsPerPage;

            if(state.filters) {

                if(action.payload === 'next' && startIndex >= state.videogamesFiltered.length) {
                    return state;
                } 
                
                if(action.payload === 'prev' && prevPage < 0) {
                    return state;
                }

                return {
                    ...state,
                    videogames: [...state.videogamesFiltered].splice(startIndex, cardsPerPage),
                    currentPage: action.payload === 'next' ? nextPage : prevPage 
                }
            }

            if(action.payload === 'next' && startIndex >= state.videogamesBackUp.length) {
                return state;
            }  
            
            if(action.payload === 'prev' && prevPage < 0) {
                return state;
            }

            return {
                ...state,
                videogames: [...state.videogamesBackUp].splice(startIndex, cardsPerPage),
                currentPage: action.payload === 'next' ? nextPage : prevPage 
            }
        }

        case RESET:
            return {
                ...state,
                videogames: [...state.videogamesBackUp].splice(0, cardsPerPage),
                videogamesFiltered: [],
                currentPage: 0,
                filters: false
            }

        default:
            return {
                ...state            
            }
    }
}

export default reducer;
