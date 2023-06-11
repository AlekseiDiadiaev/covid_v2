
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Form, Col } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import ErrorMassage from '../errorBoundary/ErrorMessage'

import { countriesListFetched, dataByDaysFetched } from '../../slices/asyncThunk'
import { getDataByDaysForSelected } from '../../utils/dataUtils'
import { loadingChanged } from '../../slices/covidDataSlice'

import { optoinsBigChar, optionsSmallChar } from './charConfig'

function CharBlock() {
    const [filterId, setFilterId] = useState('all');
    const [isSmallScrean, setIsSmallScrean] = useState(false)
    const [dataForSelected, setDataForSelected] = useState([]);

    const { dataByDays, error, loading, countriesList } = useSelector(({ covidDataSlice }) => covidDataSlice);
    const { selectedStartDate, selectedEndDate } = useSelector(({ datePickerSlice }) => datePickerSlice);
    const dispatch = useDispatch()

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScrean(window.innerWidth < 992);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(countriesListFetched());
    }, [dispatch])

    useEffect(() => {
        dispatch(dataByDaysFetched({
            minDate: selectedStartDate,
            maxDate: selectedEndDate,
        }));
    }, [selectedStartDate, selectedEndDate, dispatch])

    useEffect(() => {
        if (!dataByDays || dataByDays.length < 0) return;
        dispatch(loadingChanged(true))
        getDataByDaysForSelected(dataByDays, filterId)
            .then(res => setDataForSelected(res))
            .finally(() => dispatch(loadingChanged(false)))
    }, [dataByDays, filterId, dispatch])


    const optionOfSelectOfCountries = countriesList && countriesList.map((item, i) => {
        return <option key={i} value={item}>{item}</option>;
    })

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        TimeScale,
    );

    const dataChar = {
        datasets: [
            {
                label: 'Заболевания',
                data: dataForSelected ? dataForSelected.map(item => ({ x: item.date, y: item.cases })) : [],
                borderColor: '#ffc107',
                backgroundColor: '#ffc107',
                pointStyle: false,
                tension: 0.1
            },
            {
                label: 'Смерти',
                data: dataForSelected ? dataForSelected.map(item => ({ x: item.date, y: item.deaths })) : [],
                borderColor: '#dc3545',
                backgroundColor: '#dc3545',
                pointStyle: false,
                tension: 0.1
            }
        ],
    };

    const smallChar = !loading && !error && isSmallScrean && dataForSelected && <Line
        width={800}
        height={400}
        data={dataChar}
        options={optionsSmallChar} />

    const bigChar = !loading && !error && !smallChar && dataForSelected && <Line
        data={dataChar}
        options={optoinsBigChar} />

    const spinner = loading && <Spinner />

    const errormessage = error && <ErrorMassage>Ошибка при получении данных. Обновите страницу.</ErrorMassage>;

    return (
        <>
            <Form.Select
                ria-label="Default select example"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
                disabled={loading}>
                <option value='all'>Все страны</option>;
                {optionOfSelectOfCountries}
            </Form.Select>
            <Col className="overflow-auto" style={{ 'minHeight': "539px" }}>
                {smallChar}
                {bigChar}
                <Col className="p-5">
                    {spinner}
                </Col>
                {errormessage}
            </Col>
        </>
    );
}

export default CharBlock;