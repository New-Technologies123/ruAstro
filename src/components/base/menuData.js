/* ===== ДАННЫЕ МЕНЮ ===== */
export const menuData = [
    {
        title: 'Продукция',
        url: '/products/',
        pageType: 'products',
        children: [
            {
                title: 'Автоматизированная замерная установка (АГЗУ)',
                url: '/products/accounting-system/',
                children: [
                    {
                        title: 'АГЗУ «Спутник — массомер НТ.1» (стационарный)',
                        url: '/products/accounting-system/stationary/',
                    },
                    {
                        title: 'АГЗУ «Спутник — массомер НТ.1» (мобильный)',
                        url: '/products/accounting-system/mobile/',
                    },
                ],
            },
            {
                title: 'Комплектующие для автоматизированной групповой замерной установки',
                url: '/products/accessories/',
                children: [
                    { title: 'Вихревой расходомер ЭРВИП', url: '/products/accessories/ervip/'},
                    { title: 'Устройство регулирования перепада давления (УРПД)', url: '/products/accessories/urpd/'},
                    { title: 'Переключатель скважин многоходовой (ПСМ)', url: '/products/accessories/psm/'},
                    { title: 'Магниторегулируемый клапан (КМР)', url: '/products/accessories/kmr/'},
                    { title: 'Гидропривод (ГП)', url: '/products/accessories/gidroprivod/'},
                    { title: 'Сепарационная ёмкость', url: '/products/accessories/separation/'},
                ],
            },
            {
                title: 'Система учёта углеводородов и пластовой жидкости',
                url: '/products/measuring-system/',
                children: [
                    {
                        title: 'Система измерения количества и показателей качества нефти (СИКН)',
                        url: '/products/measuring-system/oil/',
                    },
                    {
                        title: 'Система измерения количества газа (СИКГ)',
                        url: '/products/measuring-system/gas/',
                    },
                    {
                        title: 'Система измерения количества воды (СИКВ)',
                        url: '/products/measuring-system/water/',
                    },
                ],
            },
            {
                title: 'Системы подготовки нефти, газа и воды',
                url: '/products/preparation-systems/',
                children: [
                    {
                        title: 'Устройство запуска и приема внутритрубных средств очистки и диагностики УЗПЗ, УЗПП',
                        url: '/products/preparation-systems/launch/',
                    },
                    {
                        title: 'Блок гребенки (БГ)',
                        url: '/products/preparation-systems/block/',
                    },
                    {
                        title: 'Устройство очистки колонны УОК-НКТ',
                        url: '/products/preparation-systems/cleaning/',
                    },
                    {
                        title: 'Установка дозирования химического реагента (БДР)',
                        url: '/products/preparation-systems/dosing/',
                    },
                ],
            },
            {
                title: 'Насосные станции перекачки нефти, нефтепродуктов и воды',
                url: '/products/pumping-stations/',
                children: [
                    {
                        title: 'Блочная насосная станция внутренней и внешней перекачки нефти',
                        url: '/products/pumping-stations/internal/',
                    },
                    {
                        title: 'Блочная мультифазная насосная станция',
                        url: '/products/pumping-stations/multiphase/',
                    },
                ],
            },
        ],
    },
    {
        title: 'Сервисные услуги',
        url: '/services/',
        pageType: 'services',
        children: [
            { title: 'Обслуживание, капитальный ремонт и модернизация АГЗУ', url: '/services/repair', },
            { title: 'Замер дебита нефтяных скважин с помощью мобильной замерной установки', url: '/services/metering' },
            { title: 'Обслуживание устройства очистки колонны УОК-НКТ', url: '/services/service' },
            { title: 'Услуги депарафинизации нефтяных скважин', url: '/services/dewaxing' },
        ],
    },
];
