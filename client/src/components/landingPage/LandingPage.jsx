import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={style.landingPage_container}>
            <Link to='/home'>
                <button className={style.button}>Get starter</button>
            </Link>
        </div>
    );
}

export default LandingPage;