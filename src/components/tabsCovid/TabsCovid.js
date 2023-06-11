import { Container, Tab, Tabs } from 'react-bootstrap';
import './tabsCovid.scss'
import TableCovid from '../tableCovid/TableCovid';
import CharBlock from '../charBlock/CharBlock';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const TABLE_TAB = 'table',
    CHAR_TAB = 'char'

function TabsCovid() {
    const [activeTab, setActiveTab] = useState(TABLE_TAB);
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const tabQuery = params.get('tab')
        if(tabQuery && tabQuery !== CHAR_TAB && tabQuery !== TABLE_TAB) {
            navigate('*')
        }
        if (tabQuery) {
            setActiveTab(tabQuery);
        }
    }, [params, navigate])

    const handleTabChange = (e) => {
        setParams(`tab=${e}`)
    }

    return (
        <>
            <Tabs
                defaultActiveKey={TABLE_TAB}
                activeKey={activeTab}
                id="tabs"
                className="rounded fs-3"
                fill
                onSelect={handleTabChange}
            >
                <Tab eventKey={TABLE_TAB} title="Таблица">
                    <Container className='bg-light p-4 border border-top-0 mb-2'>
                        <ErrorBoundary>
                            <TableCovid />
                        </ErrorBoundary>
                    </Container>
                </Tab>

                <Tab eventKey={CHAR_TAB} title="График" >
                    <Container className='bg-light p-4 border border-top-0  mb-2'>
                        {activeTab === CHAR_TAB && <CharBlock />}
                    </Container>
                </Tab>
            </Tabs>
        </>
    );
}

export default TabsCovid;
