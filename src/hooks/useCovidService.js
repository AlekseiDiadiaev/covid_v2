
import useHttp from './useHttp';
import { useState } from 'react';

const useCovidService = () => {
    const {loading, request, error, clearError} = useHttp();
    const [dateTo, setDateTo] = useState();
    const [dateFrom, setDateFrom] = useState();
    const [baseData, setBaseData] = useState(false);
    const [data, setData] = useState();
    const [baseInitialData, setBaseInitialData] = useState(false);
   
    const _api = 'http://covid.ua/';


    const getMinMaxDate = async() => {
        let response = await request(_api + 'minmax');
        const minDate = Date.parse(response.minDate);
        const maxDate = Date.parse(response.maxDate);
        return {minDate: minDate, maxDate: maxDate};
    }
    
    const getCountriesList = async () => {
        return await request(_api + 'countries');   
    }

    const getDataByCountries = async () => {  
        const from = new Date(dateFrom).toISOString().substring(0, 10);
        const to = new Date(dateTo).toISOString().substring(0, 10);
        const data = await request(_api + `data?from=${from}&to=${to}`);   
        setBaseData(data);
        setData(data);
        return data;
    }
    
    const getSortedData = (id) => {
        const tempData = JSON.parse(JSON.stringify(data));

        function sortByCountry(isAscending) {
            if (isAscending) {
                return tempData.sort((a, b) => {
                    return a.country > b.country ? 1 : a.country < b.country ? -1 : 0;
                });
            } else {
                return tempData.sort((b, a) => {
                    return a.country > b.country ? 1 : a.country < b.country ? -1 : 0;
                });
            }
            
        }

        function sortByNumber(isAscending, name) {
            name = name.slice(0, -1)
            if(isAscending) {
                return tempData.sort((a, b) => {
                    return a[name] - b[name];
                });
            } else {
                return tempData.sort((a, b) => {
                    return b[name] - a[name];
                });
            }
        }

        if(id === 'country-'){
            return sortByCountry(false)
        } if(id === 'country+') {
            return sortByCountry(true)
        } 

        for(let key in baseData[0]) {
            
            if(id === key + '-'){
                return sortByNumber(false, id)
            }
            if(id === key + '+'){
                return sortByNumber(true, id)
            }
        }
    }

    const getDataAfterSearch = (str) => {
        const res = baseData.filter(item => {
            return item.country.toLowerCase().includes(str.toLowerCase());
        });        
        setData(res);
        return res;
        
    }

    const getFilteredData = (id, from, to) => {
        if(from === '' || to === '') {
            setData(baseData);
            return baseData;           
        } else {
            const res = baseData.filter(item => {
                return item[id] < +to &&  item[id] > +from;
            })
            setData(res);
            return res;
        }
    }

    const getDataByDays = async (country) => {
        
        if(!dateFrom || !dateTo || !country){
            return false;
        }
    
        const from = new Date(dateFrom).toISOString().substring(0, 10);
        const to = new Date(dateTo).toISOString().substring(0, 10);

        const filteredDataPerDate = await request(_api + `databyday?from=${from}&to=${to}`)
        
        const arrAllDays = filteredDataPerDate.map(item  => {
            return item.date
        })

        const arrUniqueDays = Array.from(new Set(arrAllDays)).map(item => {
            return {date: item, parsedDate: Date.parse(item)};
        })
        
        arrUniqueDays.sort((a, b) => a.parsedDate - b.parsedDate);

        if(country === 'all') {
            let result= arrUniqueDays.map(item => {
                const resArr = filteredDataPerDate.filter(elem => elem.date === item.date)
                const resCases = resArr.reduce((acc, curr) => +acc + +curr.cases, 0)
                const resDeaths = resArr.reduce((acc, curr) => +acc + +curr.deaths, 0)
                return {cases: resCases, date: item.date, deaths: resDeaths}              
            })

            return result;    
        } else {
            let daysOfCountry = filteredDataPerDate.filter(item => item.country === country); 
            let result = arrUniqueDays.map(item => {
                let resArr = daysOfCountry.find(elem => elem.date === item.date)
                const resCases = resArr ? resArr.cases : 0;
                const resDeaths = resArr ? resArr.deaths : 0;
                return {cases: resCases, date: item.date, deaths: resDeaths}
            })
            console.log(result)   
            return result;
        }
    }

    const tableTitles = [{text: 'Страна', id: 'country'}, 
                            {text: 'Заболеваний за выбранный период', id: 'cases'}, 
                            {text: 'Смертей за выбранный период', id: 'deaths'},
                            {text: 'Заболеваний за весь период', id: 'allCases'},
                            {text: 'Смертей за весь период', id: 'allDeaths'},
                            {text: 'Заболеваний на 1000 жителей', id: 'casesPer1000'},
                            {text: 'Смертей на 1000 жителей', id: 'deathsPer1000'},
                            {text: 'Средннее количество заболеаний в день за выбранный период', id: 'averageCasesPerDay'},
                            {text: 'Средннее количество смертей в день за выбранный период', id: 'averageDeathsPerDay'},
                            {text: 'Максимум заболеваний в день за выбранный период', id: 'maxCasesPerDay'},
                            {text: 'Максимум смертей в день за выбранный период', id: 'maxDeathsPerDay'},
                        ]
    return {loading, 
            error, 
            clearError, 
            getDataByCountries, 
            getDataByDays, 
            getSortedData, 
            getDataAfterSearch,
            getFilteredData, 
            getMinMaxDate,
            setDateTo, 
            setDateFrom, 
            dateTo, 
            dateFrom,
            baseData,
            tableTitles,
            getCountriesList
            };
}


export default useCovidService;