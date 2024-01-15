import style from './DetailLoader.module.css';

const DetailLoader = () => {
     return (
        <div className={style.spinner_container}>
            <div className={style.spinner_center}>
                <div className={style.spinner_ring}></div>
                <span>loading...</span>
            </div>
        </div>    
    );
}

export default DetailLoader;