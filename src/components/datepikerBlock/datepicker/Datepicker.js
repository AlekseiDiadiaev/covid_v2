
import { useEffect, useState } from 'react';
import { Row, Spinner, Alert, Modal } from 'react-bootstrap';
import { format, } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { useSelector, useDispatch } from 'react-redux'
import { startDateChanged, endDateChanged, errorChanged } from '../../../slices/datePickerSlice'


export default function DatePiсker({ idPicker, minDate, maxDate, closeAccordion }) {
    const [month, setMonth] = useState();

    const selected = useSelector(({ datePickerSlice }) => idPicker === 'min' ? datePickerSlice.selectedStartDate : datePickerSlice.selectedEndDate)
    const { selectedStartDate, selectedEndDate, loading, error } = useSelector(({ datePickerSlice }) => datePickerSlice)

    const setSelected = idPicker === 'min' ? startDateChanged : endDateChanged;
    const dispatch = useDispatch();

    useEffect(() => {
        if (selected) dispatch(setSelected(selected));
    }, [selected, dispatch, setSelected]);

    useEffect(() => {
        setMonth(idPicker === 'min' ? selectedStartDate : selectedEndDate)
    }, [idPicker, selectedStartDate, selectedEndDate])

    const onSelectDate = (e) => {
        const dateUTC = e - (new Date().getTimezoneOffset() * 60 * 1000)
        dispatch(setSelected(dateUTC))
        if (window.innerWidth < 768) { closeAccordion(dateUTC, idPicker) }
    }

    const handelAlertClose = (bool) => {
        dispatch(errorChanged(bool))
    }

    let footer = <p>Пожалуйста выберите дату</p>;
    if (selected) { footer = <p>Выбрана дата {format(selected, 'PP', { locale: ru })}.</p> }

    return (
        <>
            {selected && !loading && !error && <DayPicker
                required={true}
                defaultMonth={selected}
                month={month}
                onMonthChange={setMonth}
                fromDate={idPicker === "max" ? selectedStartDate : minDate}
                toDate={idPicker === "min" ? selectedEndDate : maxDate}
                locale={ru}
                // captionLayout="dropdown" 
                mode="single"
                selected={new Date(selected)}
                onSelect={(e) => e ? onSelectDate(e) : null}
                footer={footer}
                modifiersStyles={{
                    selected: { background: '#0d6efd', }
                }}
            />}

            {loading && <Row className="d-flex align-items-center justify-content-center h-100" style={{ 'width': '312px' }}>
                <Spinner />
            </Row>}

            {error && <Modal
                show
                size="lg"
                centered>
                <Alert variant="danger" onClose={() => handelAlertClose(false)} dismissible className='m-0'>
                    <Alert.Heading>Произошла ошибка</Alert.Heading>
                    <p>
                        К сожалению, не удалось получить данные. Пожалуйста, закройте это окно и перзагрузите страницу.
                        Если проблема сохраняется, пожалуйста, попробуйте позже. Извините за неудобства.
                    </p>
                </Alert>
            </Modal>}
        </>
    );
}



