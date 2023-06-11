
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Col } from 'react-bootstrap';
import MainPage from '../pages/MainPage'
import Page404 from '../pages/Page404'

function App() {

    return (
        <Router>
            <Container fluid className='bg-body min-vh-100 p-0'>
                <Col className="bg-dark p-2">
                    <Link to='/' className='logo'>
                        <h1 className='text-light text-center display-1'>Covid статистика</h1>
                    </Link>
                </Col>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
