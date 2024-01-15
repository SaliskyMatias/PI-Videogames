import { Routes, Route } from 'react-router-dom'
import './App.css'

// Views
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import Form from './views/form/Form';
import Detail from './views/detail/Detail';

function App() {

    return(
        <div>
            <Routes>
                <Route path='/' element={<Landing /> }/>
                <Route path='/home' element={<Home /> }/>
                <Route path='/videogames/:idVideogame' element={<Detail /> }/>
                <Route path='/form' element={<Form />}/>
            </Routes>
        </div>
    );
}

export default App;
