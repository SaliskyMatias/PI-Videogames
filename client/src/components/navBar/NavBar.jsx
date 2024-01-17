import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import style from './NavBar.module.css';
import { useLocation } from "react-router-dom";

// Components
import Paging from "../paging/Paging";
import SearchBar from "../searchBar/SearchBar";

export const NavBar = ({ handleClick, handlePagination }) => {

    const location = useLocation();

    return (
        <div className={style.navBar_container}>
            
            <div className={style.navBar_buttons}>
                <Link to='/home'>
                    <button onClick={handleClick} className={style.navBar_buttons_home}>Home</button>
                </Link>

                <Link to='/form'>
                    <button className={style.navBar_buttons_add}>+Add Videogame</button>
                </Link> 
            </div>

            <div>
                { location.pathname === '/home' && <Paging handlePagination={handlePagination} /> }
            </div>

            <div className={style.navBar_searchBar}>
                { location.pathname !== '/form' && <SearchBar /> }
            </div>

        </div>
    );
}

NavBar.propTypes = {
    handleClick: PropTypes.func,
    handlePagination: PropTypes.func
};

export default NavBar;


