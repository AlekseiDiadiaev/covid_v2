import ruLocale from 'date-fns/locale/ru';

export const optoinsBigChar = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: true,
            labels: {
                font: {
                    size: 20
                }
            }
        },
        title: {
            display: true,
            text: 'График заболеваемости и смертности',
            font: {
                size: 24
            }
        }
    },
    scales: {
        x: {
            adapters: {
                date: {
                    locale: ruLocale,
                },
            },
            type: 'time',
        },
        y: {
            title: {
                display: true,
                text: 'Количество случаев',
            },
        }
    }
}

export const optionsSmallChar = {
    responsive: false,
    plugins: {
        legend: {
            align: 'start',
            position: 'top',
            display: true,
            labels: {
                font: {
                    size: 14
                }
            }
        },
        title: {
            align: 'start',
            display: true,
            text: 'График заболеваемости и смертности',
            font: {
                size: 16
            }
        },
        zoom: {
            zoom: {
                enabled: true,
                mode: 'x',
            },
            pan: {
                enabled: true,
                mode: 'x',
            },
        },
    },
    scales: {
        x: {
            adapters: {
                date: {
                    locale: ruLocale,
                },
            },
            type: 'time',
        },
        y: {
            title: {
                display: true,
            },
        }
    }
};