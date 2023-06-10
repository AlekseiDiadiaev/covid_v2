import { Container, Tab, Tabs, Nav } from 'react-bootstrap';
import './tabsCovid.scss'
// import TableCovid from '../tableCovid/TableCovid';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function TabsCovid() {
    const [activeTab, setActiveTab] = useState('table');
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        const tabQuery = params.get('tab')
        if(tabQuery) {
            setActiveTab(tabQuery);
        }    
    }, [params])
    
    const handleTabChange = (e) => {
        setParams(`tab=${e}`)
    }

    return (
        <>
            <Tabs
                defaultActiveKey="table"
                activeKey={activeTab}
                id="tabs"
                className="rounded fs-3"
                fill
                onSelect={handleTabChange}
            >
                <Tab eventKey="table" title="Таблица">
                    <Container className='bg-light p-4 border border-top-0 mb-2'>
                        table
                        <ErrorBoundary>
                            {/* <TableCovid /> */}
                        </ErrorBoundary>
                    </Container>
                </Tab>

                <Tab eventKey="char" title="График" >
                    <Container className='bg-light p-4 border border-top-0  mb-2'>
                        char
                            {/* <CharBlock /> */}
                    </Container>
                </Tab>
            </Tabs>
        </>
    );
}

export default TabsCovid;
