import { Container } from 'react-bootstrap';
import DatepickerBlock from '../datepikerBlock/DatepikerBlock';
import TabsCovid from '../tabsCovid/TabsCovid';
import ScrollToTop from '../scrollToTop/ScroollToTop';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

function MainPage() {
    return (
        <>
            <Container>
                <ErrorBoundary>
                    <DatepickerBlock />
                </ErrorBoundary>
                <ErrorBoundary>
                    <TabsCovid />
                </ErrorBoundary>
            </Container>
            <ScrollToTop />
        </>
    );
}

export default MainPage;
