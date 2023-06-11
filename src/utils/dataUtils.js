export const getFilteredData = (data, options) => {
    const { searchValue, filterId, filterFromValue, filterToValue } = options;

    let resultData = data;
    if (searchValue !== '') {
        resultData = data.filter(item => {
            return item.country.toLowerCase().includes(searchValue.toLowerCase());
        });

    } if (filterToValue !== '' && filterFromValue !== '') {
        resultData = resultData.filter(item => {
            return item[filterId] < +filterToValue && item[filterId] > +filterFromValue;
        })
    }
    return resultData;
}

export const getSortedData = (id, currentData) => {
    const tempData = JSON.parse(JSON.stringify(currentData));

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
        if (isAscending) {
            return tempData.sort((a, b) => {
                return a[name] - b[name];
            });
        } else {
            return tempData.sort((a, b) => {
                return b[name] - a[name];
            });
        }
    }

    if (id === 'country-') {
        return sortByCountry(false)
    } if (id === 'country+') {
        return sortByCountry(true)
    }

    for (let key in currentData[0]) {
        if (id === key + '-') {
            return sortByNumber(false, id)
        }
        if (id === key + '+') {
            return sortByNumber(true, id)
        }
    }
}


export const getDataByDaysForSelected = async (data, country) => {
    if (!country) return false;
        
    const arrAllDays = data.map(item => {
        return item.date
    })
    
    const arrUniqueDays = Array.from(new Set(arrAllDays)).map(item => {
        return { date: item, parsedDate: Date.parse(item) };
    })
    arrUniqueDays.sort((a, b) => a.parsedDate - b.parsedDate);
   
    if (country === 'all') {
        let result = []
        for (let i = 0; i < arrUniqueDays.length; i++){
            if(i % 100 === 0) {await new Promise(resolve => setTimeout(resolve, 0))}
            
            const resArr = data.filter(elem => elem.date === arrUniqueDays[i].date)
            let resCases = 0, 
                resDeaths = 0;
            resArr.forEach(elem => {
                resCases += +elem.cases
                resDeaths += +elem.deaths
            })
            result.push({ cases: resCases, date: arrUniqueDays[i].date, deaths: resDeaths }) 
        }
        return result;
    } else {
        let daysOfCountry = data.filter(item => item.country === country);
        let result = arrUniqueDays.map(item => {
            let resArr = daysOfCountry.find(elem => elem.date === item.date)
            const resCases = resArr ? resArr.cases : 0;
            const resDeaths = resArr ? resArr.deaths : 0;
            return { cases: resCases, date: item.date, deaths: resDeaths }
        })
        return result;    
    }
}




