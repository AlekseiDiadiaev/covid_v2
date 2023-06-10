import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage'
import Page404 from '../pages/Page404' 

function App() {


    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='*' element={<Page404/>}/>
            </Routes>
        </Router>
    );
}

export default App;
