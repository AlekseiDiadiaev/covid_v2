import checkIndexTable from '../../utils/checkIndexTable';
import { useState, useEffect } from 'react';
import { Col, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';

const START = 'start',
    END = 'end',
    NEXT = 'next',
    PREV = 'prev',
    SELECT_ALL = 'all',
    SELECT_20 = '20',
    SELECT_50 = '50',
    SELECT_100 = '100'

function ButtonsOfTable({ numOfRow,
    endRow,
    startRow,
    setNumOfRow,
    setStartRow,
    setEndRow,
    shownData,
    setNumOfRowSelected }) {

    const [dropdownTitle, setDropdownTitle] = useState(20)
    const [isScrollOnBtn, setIsScrollOnBtn] = useState(false);

    useEffect(() => {
        if (isScrollOnBtn) {
            window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "instant" })
            setIsScrollOnBtn(false)
        }
    }, [isScrollOnBtn])

    const onNavTable = (target) => {

        setIsScrollOnBtn(true)
        if (target.id === START) {
            setStartRow(checkIndexTable(0, shownData));
            setEndRow(shownData.length > numOfRow ? numOfRow : shownData.length)

        } if (target.id === END && endRow < shownData.length) {
            let x = shownData.length - shownData.length % numOfRow;
            setStartRow(checkIndexTable(x === shownData.length ? shownData.length - numOfRow : x, shownData));
            setEndRow(checkIndexTable(shownData.length, shownData))

        } if (target.id === NEXT && endRow < shownData.length) {
            setStartRow((startRow) => {
                setEndRow(checkIndexTable((startRow + numOfRow) + numOfRow, shownData))
                return checkIndexTable(startRow + numOfRow, shownData);
            });

        } if (target.id === PREV && startRow > 0) {
            setStartRow((startRow) => {
                setEndRow(checkIndexTable((startRow - numOfRow) + numOfRow, shownData))
                return checkIndexTable(startRow - numOfRow, shownData)
            });
        }
    }

    const onNumOfRow = (id) => {
        setDropdownTitle(id)
        if (id === SELECT_ALL) {
            setNumOfRow(shownData.length)
            setStartRow(0)
            setEndRow(shownData.length)
            setNumOfRowSelected(Infinity)
        } else {
            setNumOfRow(+id)
            setNumOfRowSelected(+id)
            setStartRow(0)
            setEndRow(+id)
        }

    }
    return (
        <Col className="d-flex justify-content-end mt-1">
            <ButtonGroup className="nav-table-btns">
                <DropdownButton onSelect={onNumOfRow} as={ButtonGroup} title={dropdownTitle} id="bg-nested-dropdown">
                    <Dropdown.Item eventKey={SELECT_20} >20</Dropdown.Item>
                    <Dropdown.Item eventKey={SELECT_50} >50</Dropdown.Item>
                    <Dropdown.Item eventKey={SELECT_100} >100</Dropdown.Item>
                    <Dropdown.Item eventKey={SELECT_ALL} >all</Dropdown.Item>
                </DropdownButton>
                <Button onClick={(e) => onNavTable(e.target)} id="start" className='navBtn'>start</Button>
                <Button onClick={(e) => onNavTable(e.target)} id="prev" className='navBtn'>&larr;</Button>
                <Button onClick={(e) => onNavTable(e.target)} id="next" className='navBtn'>&rarr;</Button>
                <Button onClick={(e) => onNavTable(e.target)} id="end" className='navBtn'>end</Button>
            </ButtonGroup>
        </Col>)
}

export default ButtonsOfTable;