import { Container, Col} from 'react-bootstrap';
import DatepickerBlock from '../datepikerBlock/DatepikerBlock';
import TabsCovid from '../tabsCovid/TabsCovid';
import ScrollToTop from '../scrollToTop/ScroollToTop';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function MainPage() {
    return (
        <Container fluid className='bg-body min-vh-100 p-0'>
            <Col className="bg-dark py-2">
                <h1 className='text-light text-center display-1'>Covid статистика</h1>
            </Col>
            <Container>
                <ErrorBoundary>
                    <DatepickerBlock/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <TabsCovid/>
                </ErrorBoundary>
            </Container>
            <ScrollToTop />
        </Container>
    ); 
}

export default MainPage;
