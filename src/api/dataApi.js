const _api = 'http://covid.ua/';

const _request = async (url, method = 'GET', body, headers) => {
    try {
        const response = await fetch(url, {method, body, headers})      
        if(!response.ok) {
            throw new Error(`Could not fetch ${url}, status${response.status}`)
        }
        const data = await response.json();
        return data;
    } catch (e) {
        throw e;
    }
}

export const getMinMaxDate = async() => {
    let response = await _request(_api + 'minmax');
    const minDate = Date.parse(response.minDate);
    const maxDate = Date.parse(response.maxDate);
    return {minDate: minDate, maxDate: maxDate};
}

export const getCountriesList = async () => {
    return await _request(_api + 'countries');   
}

export const getDataByCountries = async (startDate, endDate) => {  
    const from = new Date(startDate).toISOString().substring(0, 10);
    const to = new Date(endDate).toISOString().substring(0, 10);
    const data = await _request(_api + `data?from=${from}&to=${to}`);   
    return data;
}

export const getDataByDays = async (startDate, endDate) => {
    const from = new Date(startDate).toISOString().substring(0, 10);
    const to = new Date(endDate).toISOString().substring(0, 10);
    const res = await _request(_api + `databyday?from=${from}&to=${to}`)
    return res;
}

