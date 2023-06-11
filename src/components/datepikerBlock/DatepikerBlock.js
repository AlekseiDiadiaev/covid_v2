import imgKorona from '../../assets/image/korona.png'
import './datepickerBlock.scss'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, Button, Collapse, Accordion, Spinner } from 'react-bootstrap';
import Datepicker from './datepicker/Datepicker';
import { format, } from 'date-fns';
import { ru } from 'date-fns/locale';

import { startDateChanged, endDateChanged } from '../../slices/datePickerSlice'
import { minMaxDateFetched } from '../../slices/asyncThunk'

function DatepickerBlock() {
    const { minDate, maxDate, selectedStartDate, selectedEndDate } = useSelector(({ datePickerSlice }) => datePickerSlice)
    const dispatch = useDispatch();
    const [isVisibleFrom, setIsVisibleFrom] = useState(window.innerWidth > 768 ? true : false);
    const [isVisibleTo, setIsVisibleTo] = useState(window.innerWidth > 768 ? true : false);

    const [activeKeyFrom, setActiveKeyFrom] = useState('0')
    const [activeKeyTo, setActiveKeyTo] = useState('0')

    useEffect(() => {
        dispatch(minMaxDateFetched())
    }, [dispatch])

    useEffect(() => {
        const handleResize = () => {
            setIsVisibleFrom(window.innerWidth > 768);
            setIsVisibleTo(window.innerWidth > 768);
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleReset = () => {
        dispatch(startDateChanged(minDate))
        dispatch(endDateChanged(maxDate))
    }

    const closeAccordion = () => {
        setIsVisibleFrom(false);
        setIsVisibleTo(false);
        setActiveKeyFrom('0');
        setActiveKeyTo('0');
    };

    const isDisabledResetButton = minDate === selectedStartDate && maxDate === selectedEndDate ? true : false;

    return (
        <Row>
            <Col xl='8'>
                <h3 className='text-dark text-center mt-3'>Период статистики</h3>
            </Col>
            <Col xl='4'></Col>
            <ViewDayPicker
                pikerTitle='от'
                activeKey={activeKeyFrom}
                setActiveKey={setActiveKeyFrom}
                isVisible={isVisibleFrom}
                setIsVisible={setIsVisibleFrom}
                selectedExtremesDate={selectedStartDate}
                closeAccordion={closeAccordion}
                minDate={minDate}
                maxDate={maxDate}
                pickerType='min' />
            <ViewDayPicker
                pikerTitle='до'
                activeKey={activeKeyTo}
                setActiveKey={setActiveKeyTo}
                isVisible={isVisibleTo}
                setIsVisible={setIsVisibleTo}
                selectedExtremesDate={selectedEndDate}
                closeAccordion={closeAccordion}
                minDate={minDate}
                maxDate={maxDate}
                pickerType='max' />

            <Col xl='4' className="d-none d-xl-block position-relative">
                <Image src={imgKorona} className='h-100 position-absolute' />
            </Col>

            <Col xl='8' className='d-flex justify-content-center p-3'>
                <Button onClick={handleReset} id="start" disabled={isDisabledResetButton}>Отобразить все данные</Button>
            </Col>
        </Row>
    );
}

export default DatepickerBlock;


const ViewDayPicker = ({ pikerTitle, activeKey, setActiveKey, isVisible, setIsVisible, selectedExtremesDate, pickerType, minDate, maxDate, reset, closeAccordion }) => {
    return (
        <Col md='6' xl='4' className="d-flex justify-content-md-center flex-wrap">
            <div className='text-center d-block w-100 fs-2'>{pikerTitle}</div>

            <Accordion className='w-100 date-button' activeKey={activeKey} >
                <Accordion.Item
                    eventKey="1"
                    onClick={() => {
                        if (minDate) {
                            setActiveKey((activeKey) => activeKey === '0' ? '1' : '0')
                            setIsVisible(isVisible => !isVisible)
                        }
                    }}>
                    <Accordion.Header>
                        {!minDate ? <Spinner size="sm" /> : null}
                        {minDate ? <span>Выбрана дата {selectedExtremesDate ? format(selectedExtremesDate, 'PP', { locale: ru }) : null}</span> : null}
                    </Accordion.Header>
                </Accordion.Item>
            </Accordion>

            <Collapse in={isVisible}>
                <div className="mx-auto bg-light rounded" style={{ 'height': '370px' }} >
                    <Datepicker
                        closeAccordion={closeAccordion}
                        reset={reset}
                        minDate={minDate}
                        maxDate={maxDate}
                        idPicker={pickerType} />
                </div>
            </Collapse>
        </Col>
    )
}