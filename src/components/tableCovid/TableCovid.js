import { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner'
import './tableCovid.scss'
import tableTitles from './tableTitles';
import ErrorMassage from '../errorBoundary/ErrorMessage'

import ButtonsOfTable from './_ButtonsOfTable'
import TablePucker from './_TablePucker';

import { useSelector, useDispatch } from 'react-redux'
import { shownDataSet  } from '../../slices/covidDataSlice'
import { dataByCountriesFetched } from '../../slices/asyncThunk'
import { getFilteredData, getSortedData } from '../../utils/dataUtils'

function TableCovid() {

    const [activeBtn, setActiveBtn] = useState('country+');
    const [activeCol, setActiveCol] = useState('country-cell');

    const [startRow, setStartRow] = useState(0);
    const [endRow, setEndRow] = useState(20);
    const [numOfRow, setNumOfRow] = useState(20);
    const [numOfRowSelected, setNumOfRowSelected] = useState(20);

    const [filterFromValue, setFilterFromValue] = useState('');
    const [filterToValue, setFilterToValue] = useState('');
    const [filterId, setFilterId] = useState('cases');
    const [searchValue, setSearchValue] = useState('');

    const { selectedData, shownData, error, loading } = useSelector(({ covidDataSlice }) => covidDataSlice);
    const { selectedStartDate, selectedEndDate } = useSelector(({ datePickerSlice }) => datePickerSlice);

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedStartDate && selectedEndDate) {
            dispatch(dataByCountriesFetched({
                minDate: selectedStartDate,
                maxDate: selectedEndDate,
            }));
        }
    }, [selectedStartDate, selectedEndDate, dispatch])

    useEffect(() => {
        if (shownData < 20) return;
        setNumOfRow(() => {
            const result = shownData.length > numOfRowSelected ? numOfRowSelected : shownData.length
            setEndRow(shownData.length > result ? result : shownData.length)
            return result
        })
        setStartRow(0);
    }, [shownData, numOfRowSelected])

    useEffect(() => {
        if(selectedData.length < 0) return;
        const temp = getFilteredData(selectedData, {searchValue, filterId, filterFromValue, filterToValue});
        dispatch(shownDataSet(temp))
    },[searchValue, filterId, filterFromValue, filterToValue, dispatch, selectedData])

    const onSearch = (str) => {
        setSearchValue(str);
    }     

    const onSortData = (e) => {
        const colId = e.target.getAttribute('data-col');
        setActiveCol(colId);
        const res = getSortedData(e.target.id, shownData);
        dispatch(shownDataSet(res))
        setActiveBtn(e.target.id);
    }
    
    const onReset = () => {
        setActiveBtn('country+');
        setFilterFromValue('');
        setFilterToValue('');
        setSearchValue('');
        setFilterId('cases');
        setStartRow(0);
        setEndRow(numOfRow);
    }

    const errorMessage = error && <ErrorMassage>Ошибка при получении данных. Обновите страницу.</ErrorMassage>;

    const massage = !loading && shownData && shownData.length === 0 && <Col className="fs-1 text-center py-5">Данных не найдено.</Col>;

    const spinner = loading && <Spinner/>

    const viewTable = !loading && !massage && <TablePucker
        activeCol={activeCol}
        shownData={shownData}
        startRow={startRow}
        endRow={endRow}
        activeBtn={activeBtn}
        onSortData={onSortData}
        tableTitles={tableTitles} />;

    const navBtns = viewTable && <ButtonsOfTable
        shownData={shownData}
        numOfRow={numOfRow}
        endRow={endRow}
        startRow={startRow}
        setNumOfRow={setNumOfRow}
        setStartRow={setStartRow}
        setNumOfRowSelected={setNumOfRowSelected}
        setEndRow={setEndRow} />;

    const optionOfSelect = tableTitles.map((item, i) => {
        if (i === 0) return false;
        return <option key={i} value={item.id}>{item.text}</option>;
    })


    return (
        <>
            <Form.Label className="fs-3">Поиск по стране</Form.Label>
            <Form.Control
                disabled={!shownData}
                type="getDataAfterSearch"
                placeholder="Введите название страны на английском"
                className="mb-3"
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
            />
            <Row className="mb-3">
                <Form.Label className="fs-3">Фильтрация по полю</Form.Label>
                <Col lg='6' className="mb-3">
                    <Form.Select aria-label="filterSelect" disabled={!shownData} value={filterId} onChange={(e) => setFilterId(e.target.value)}>
                        {optionOfSelect}
                    </Form.Select>
                </Col>
                <Col lg='3' className="pb-2">
                    <Form.Label className="fs-3 d-inline d-inline-block" style={{ 'width': '36px' }}>от</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Введите значение от"
                        className="m-0 ms-1 d-inline w-75 align-top"
                        disabled={!shownData}
                        value={filterFromValue}
                        onChange={(e) => setFilterFromValue(e.target.value)}
                    />
                </Col>
                <Col lg='3' className="pb-2">
                    <Form.Label className="fs-3 d-inline d-inline-block" style={{ 'width': '40px' }}>до</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Введите значение до"
                        className="m-0 d-inline w-75 align-top"
                        disabled={!shownData}
                        value={filterToValue}
                        onChange={(e) => setFilterToValue(e.target.value)}
                    />
                </Col>
                <Col>
                    <Button onClick={onReset} disabled={!shownData} variant="danger" className="float-end">Сбросить фильтры</Button>
                </Col>
            </Row>
            <Row className="overflow-auto position-relative">
                {errorMessage}
                {massage}
                {spinner}
                {viewTable}
            </Row>
            {navBtns}
        </>
    );
}
export default TableCovid;

