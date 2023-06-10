import { Col, Spinner as BootsrapSpinner} from 'react-bootstrap';

const Spinner = ({size = "2rem"}) => {
    return (
        <Col className='d-flex justify-content-center align-item-center'>
            <BootsrapSpinner style={{width: size, height: size}}  role="status">
                <span className="visually-hidden">Loading...</span>
            </BootsrapSpinner>
        </Col>
    )
}

export default Spinner;